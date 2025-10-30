# Food Information API - Backend

Flask REST API that serves as middleware between the React frontend and USDA FoodData Central API.

## Tech Stack

- **Framework**: Flask 3.0.0
- **Language**: Python 3.12.3
- **External API**: USDA FoodData Central API
- **Key Libraries**:
  - Flask-CORS (cross-origin requests)
  - requests (HTTP client)
  - python-dotenv (environment variables)

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- USDA FoodData Central API key

### Installation

1. **Create virtual environment:**

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies:**

```bash
pip install -r requirements.txt
```

3. **Configure environment variables:**

```bash
cp .env.example .env
```

4. **Get USDA API Key:**

- Visit: https://fdc.nal.usda.gov/api-guide.html
- Register for a free API key
- Add your API key to `.env` file:

```
USDA_API_KEY=your_actual_api_key_here
USDA_API_BASE_URL=https://api.nal.usda.gov/fdc/v1
```

5. **Run the server:**

```bash
python main.py
```

Server will start on: **http://localhost:8000**

## API Endpoints

### GET /

Root endpoint with API information

**Response:**

```json
{
  "message": "Food Information API",
  "version": "1.0.0",
  "endpoints": {
    "search": "/api/search?query=&page=",
    "food_details": "/api/food/",
    "health": "/health"
  }
}
```

### GET /health

Health check endpoint

**Response:**

```json
{
  "status": "healthy",
  "api_key_configured": true
}
```

### GET /api/search

Search for foods by name with pagination

**Query Parameters:**

- `query` (string, required): Food name to search for
- `page` (int, optional, default=1): Page number (20 results per page)

**Example Request:**

```bash
curl "http://localhost:8000/api/search?query=banana&page=1"
```

**Example Response:**

```json
{
  "foods": [
    {
      "fdcId": 173944,
      "description": "Bananas, raw",
      "dataType": "Survey (FNDDS)",
      "brandOwner": null
    }
  ],
  "total": 150,
  "page": 1,
  "pageSize": 20
}
```

### GET /api/food/{fdc_id}

Get detailed nutritional information for a specific food

**Parameters:**

- `fdc_id` (int): USDA FoodData Central ID

**Example Request:**

```bash
curl "http://localhost:8000/api/food/173944"
```

**Example Response:**

```json
{
  "fdcId": 173944,
  "description": "Bananas, raw",
  "nutrients": {
    "calories": 89.0,
    "protein": 1.09,
    "carbs": 22.84,
    "fat": 0.33,
    "fiber": 2.6
  },
  "dataType": "Survey (FNDDS)",
  "brandOwner": null
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- **200**: Success
- **400**: Bad request (missing/invalid parameters)
- **404**: Resource not found
- **503**: USDA API unavailable
- **504**: Request timeout
- **500**: Internal server error

**Error Response Format:**

```json
{
  "error": "Error message description"
}
```

## Testing

**Manual Testing:**

```bash
# Test health endpoint
curl http://localhost:8000/health

# Test search
curl "http://localhost:8000/api/search?query=apple"

# Test food detail
curl http://localhost:8000/api/food/1105073

# Test pagination
curl "http://localhost:8000/api/search?query=chicken&page=2"
```

## Project Structure

```
backend/
├── main.py              # Flask application with all routes
├── requirements.txt     # Python dependencies
├── .env.example        # Environment variable template
├── .env                # Actual environment variables (not in git)
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Key Features

- ✅ RESTful API design
- ✅ Proper error handling with descriptive messages
- ✅ CORS enabled for frontend communication
- ✅ Environment variable configuration
- ✅ Input validation
- ✅ Pagination support (20 items per page)
- ✅ Nutrient extraction from complex USDA data structures
- ✅ Handles multiple USDA food data types (Foundation, Survey, Branded)

## Notes

- The API acts as a middleware to simplify USDA's complex data structure
- Extracts only key nutrients: calories, protein, carbs, fat, fiber
- Handles missing nutrient data gracefully (returns `null`)
- Rate limiting depends on USDA API limits (check their documentation)
