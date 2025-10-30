from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Lnitalize the app
app = Flask(__name__)

# Enable CORS for React frontend
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://localhost:5173"],
        "methods": ["GET", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Configuration
USDA_API_KEY = os.getenv("USDA_API_KEY")
USDA_API_BASE_URL = os.getenv("USDA_API_BASE_URL", "https://api.nal.usda.gov/fdc/v1")

if not USDA_API_KEY:
    raise ValueError("USDA_API_KEY environment variable is required")

# Helper Functions
def extract_nutrients(food_nutrients):
    """
    Extract key nutrients from USDA food nutrients array.
    Handles Foundation food format with nested nutrient objects.
    Returns dict with calories, protein, carbs, fat, fiber.
    """
    nutrients = {
        'calories': None,
        'protein': None,
        'carbs': None,
        'fat': None,
        'fiber': None
    }
    
    # USDA Nutrient IDs 
    nutrient_ids = {
        'calories': [1008],  # Energy (kcal)
        'protein': [1003],   # Protein
        'carbs': [1005],     # Carbohydrate, by difference
        'fat': [1004],       # Total lipid (fat)
        'fiber': [1079],     # Fiber, total dietary
    }
    
    # Backup: keyword matching
    nutrient_keywords = {
        'calories': ['energy', 'kcal'],
        'protein': ['protein'],
        'carbs': ['carbohydrate', 'carbs'],
        'fat': ['total lipid', 'fat'],
        'fiber': ['fiber', 'dietary fiber']
    }
    
    for nutrient_data in food_nutrients:
        # Extract nutrient info from nested structure
        nutrient_obj = nutrient_data.get('nutrient', {})
        nutrient_id = nutrient_obj.get('id')
        nutrient_name = nutrient_obj.get('name', '').lower()
        
        # Get amount (Foundation foods use 'amount', others might use 'value')
        amount = nutrient_data.get('amount') or nutrient_data.get('value')
        
        if amount is None:
            continue
        
        # Try matching by ID first 
        matched = False
        if nutrient_id:
            for our_field, ids in nutrient_ids.items():
                if nutrient_id in ids and nutrients[our_field] is None:
                    # Skip Energy in kJ (we want kcal only)
                    unit_name = nutrient_obj.get('unitName', '')
                    if our_field == 'calories' and unit_name == 'kJ':
                        continue
                    
                    nutrients[our_field] = round(float(amount), 2)
                    matched = True
                    break
        
        # Fallback: keyword matching if ID didn't match
        if not matched and nutrient_name:
            for our_field, keywords in nutrient_keywords.items():
                if nutrients[our_field] is None:
                    if any(keyword in nutrient_name for keyword in keywords):
                        # Skip Energy in kJ
                        unit_name = nutrient_obj.get('unitName', '')
                        if our_field == 'calories' and unit_name == 'kJ':
                            continue
                        
                        nutrients[our_field] = round(float(amount), 2)
                        break
    
    return nutrients


# Error Handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Inernal server error'}), 500

# API Routes
@app.route('/')
def root():
    """Root endpoint - API information"""
    return jsonify({
        'message': 'Food Information API',
        'version': '1.0.0',
        'endpoints': {
            'search': '/api/search?query=<term>&page=<number>',
            'food_details': '/api/food/<fdc_id>',
            'health': '/health'
        }
    })

@app.route('/health')
def health_check():
    """Health check enpoint"""
    return jsonify({
        'status': 'healthy',
        'api_key_configured': bool(USDA_API_KEY)
    })

@app.route('/api/search')
def search_foods():
    """
    Search for foods by name with pagination.

    Query Parameters:
        query (str): Search term (required)
        page (int): Page number, defalt 1 (optional)
    
    Returns:
        JSON with foods list, total count, page info
    
    """

    # Validate query parameter
    query = request.args.get('query', '').strip()
    if not query:
        return jsonify({'error': 'query parameter is required'}), 400
    
    # get page number
    try: 
        page = int(request.args.get('page', 1))
        if page < 1:
            return jsonify({'error': 'page must be >= 1'}), 400
    except ValueError:
        return jsonify({'error': 'page must be a valid integer'}), 400
    
    page_size = 20

    try:
        # call USDA API
        response = requests.get(
            f"{USDA_API_BASE_URL}/foods/search",
            params={
                'api_key': USDA_API_KEY,
                'query': query,
                'pageSize': page_size,
                'pageNumber': page,
                'dataType': ['Survey (FNDDS)', 'Branded']
            }, 
            timeout = 10
        )
        response.raise_for_status()
        data = response.json()

        # transform response to simpler format
        foods = []
        for food in data.get('foods', []):
            foods.append({
                'fdcId': food.get('fdcId'),
                'description': food.get('description', 'Unknown Food'),
                'dataType': food.get('dataType'),
                'brandOwner': food.get('brandOwner')
            })
        
        return jsonify( {
            'foods': foods,
            'total': data.get('totalHits', 0),
            'page': page,
            'pageSize': page_size
        })
    except requests.exceptions.Timeout:
        return jsonify({'error': 'USDA API request timed out'}), 504
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Error connecting to USDA API: {str(e)}'}), 503
    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@app.route('/api/food/<int:fdc_id>')
def get_food_detail(fdc_id):
    """
    Get detailed nutrition information for a specific food

    Parameters:
        fdc_id (int): USDA FoodData Central ID

    Returns:
        JSON with food details and key nutrients
    """
    try:
        # call USDA API
        response = requests.get(
            f"{USDA_API_BASE_URL}/food/{fdc_id}",
            params={'api_key': USDA_API_KEY},
            timeout=10
        )

        # handle 404 from USDA
        if response.status_code == 404:
            return jsonify({'error': f'Food with ID {fdc_id} not found'}), 404
        
        response.raise_for_status()
        data = response.json()

        # DEBUG: Print raw nutrient data to see structure
        food_nutrients = data.get('foodNutrients', [])
        print(f"\n=== DEBUG: Food ID {fdc_id} ===")
        print(f"Total nutrients found: {len(food_nutrients)}")
        print(f"First few nutrients:")
        for i, nutrient in enumerate(food_nutrients[:5]):
            print(f"{i}. {nutrient}")
        print("=== END DEBUG ===\n")

        # extract key nutrients
        food_nutrients = data.get('foodNutrients', [])
        nutrients = extract_nutrients(food_nutrients)

        return jsonify({
            'fdcId': data.get('fdcId'),
            'description': data.get('description', 'Unknown Food'),
            'nutrients': nutrients,
            'dataType': data.get('dataType'),
            'brandOwner': data.get('brandOwner')
        })
    except requests.exceptions.Timeout:
        return jsonify({'error': 'USDA API request timed out'}), 504
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Error connecting to USDA API: {str(e)}'}), 503
    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500
    

# run the application
if __name__ == '__main__':
    print(f'Starting Flask server on http://localhost:8000')
    print(f'API Key configured: {bool(USDA_API_KEY)}')
    app.run(debug=True, host='0.0.0.0', port=8000)