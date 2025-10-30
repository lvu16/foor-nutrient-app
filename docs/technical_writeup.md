# Food Information Application

A full-stack web application for searching foods and viewing detailed nutritional information from the USDA FoodData Central API.

**Author**: Linh Fowler  
**Date**: October 30, 2025  
**Assessment**: Technical Assessment - Software Engineer Position

## Overview

This application demonstrates full-stack development skills by building a food search and nutrition information system. Users can search for foods by name, view paginated results, and see detailed nutritional breakdowns including calories, protein, carbohydrates, fat, and fiber.

## Tech Stack

**Backend:**

- Flask (Python 3.8+)
- USDA FoodData Central API integration
- RESTful API design

**Frontend:**

- React 18.3.1
- Vite (build tool)
- React Router DOM
- Native Fetch API

## Project Structure

```
food_app_assignment/
├── backend/              # Flask API server
│   ├── main.py
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
├── frontend/             # React application
│   ├── src/
│   ├── package.json
│   └── README.md
├── docs/
│   └── technical_writeup.md
├── ASSUMPTIONS.md
└── technical_writeup.md            # This file
```

## Quick Start

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Add your USDA API key to .env
python main.py
```

Backend runs on: **http://localhost:8000**

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

## Features

✅ **Food Search** - Search USDA database by food name  
✅ **Pagination** - Navigate through results (20 per page)  
✅ **Detailed Nutrition** - View calories, protein, carbs, fat, fiber  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **Error Handling** - Graceful error messages with retry  
✅ **Loading States** - Visual feedback during API calls  
✅ **Clean UI** - Intuitive, user-friendly interface

## API Documentation

See `backend/README.md` for detailed API endpoint documentation.

**Key Endpoints:**

- `GET /api/search?query=<term>&page=<num>` - Search foods
- `GET /api/food/<fdc_id>` - Get food details
- `GET /health` - Health check

## Documentation

- **Backend README**: `backend/README.md` - API documentation and setup
- **Frontend README**: `frontend/README.md` - React app structure and features
- **Assumptions**: `ASSUMPTIONS.md` - Technical decisions and scope
- **Technical Writeup**: `docs/technical_writeup.md` - Implementation summary

## Testing

### Backend

```bash
curl http://localhost:8000/health
curl "http://localhost:8000/api/search?query=banana"
curl "http://localhost:8000/api/food/1105073"
```

### Frontend

1. Open http://localhost:5173
2. Search for "banana"
3. Navigate through pages
4. Click on a food item
5. View nutritional details

## Environment Variables

**Backend** (`.env`):

```
USDA_API_KEY=your_api_key_here
USDA_API_BASE_URL=https://api.nal.usda.gov/fdc/v1
```

**Note**: Never commit `.env` files to git. Use `.env.example` as template.

## Known Limitations

- Basic styling (prioritized functionality over design)
- No user authentication
- No favorites/bookmarking
- No search history persistence
- No offline capabilities
- Limited to USDA FoodData Central data

## Future Enhancements

- User accounts and saved foods
- Meal planning features
- Barcode scanning
- Custom food entries
- Nutritional goal tracking
- Export data to PDF/CSV
- Mobile app version

## Time Allocation

- Backend development: ~2 hours
- Frontend development: ~3 hours
- Integration & testing: ~1.5 hours
- Documentation: ~1.5 hours
- **Total**: ~8 hours

## Contact

**Linh Fowler**  
Email: htlinhvu@gmail.com  
LinkedIn: linkedin.com/in/htlinhvu  
GitHub: github.com/lvu16
