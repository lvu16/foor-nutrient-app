# Food Information App - Frontend

React web application for searching foods and viewing nutritional information.

## Tech Stack

- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.5
- **HTTP Client**: Native Fetch API
- **Styling**: Inline styles (CSS-in-JS)

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm
- Backend API running on http://localhost:8000

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Run development server:**

```bash
npm run dev
```

Application will start on: **http://localhost:5173**

3. **Build for production:**

```bash
npm run build
```

## Features

### Search Page

- Text input for food search
- Real-time search with loading indicators
- Displays search results in scrollable list
- Pagination controls (20 results per page)
- Shows total results count
- Error handling with retry option
- Quick search suggestions (Banana, Chicken, Apple, Milk)

### Food Detail Page

- Detailed nutritional information display
- Key nutrients table (calories, protein, carbs, fat, fiber)
- Clean, readable layout
- Back navigation to search
- Loading and error states
- Data source attribution (USDA FDC ID)

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── SearchBar.jsx    # Search input form
│   │   ├── FoodList.jsx     # List of search results
│   │   ├── FoodCard.jsx     # Individual food item card
│   │   ├── Pagination.jsx   # Pagination controls
│   │   ├── Loading.jsx      # Loading spinner
│   │   └── ErrorMessage.jsx # Error display
│   ├── pages/              # Page components
│   │   ├── SearchPage.jsx   # Main search page
│   │   └── FoodDetailPage.jsx # Food details page
│   ├── services/           # API integration
│   │   └── api.js          # Fetch-based API calls
│   ├── utils/              # Utility functions
│   │   └── formatters.js   # Data formatting helpers
│   ├── App.jsx             # Root component with routing
│   ├── App.css             # Global styles
│   ├── main.jsx            # Application entry point
│   └── index.css           # Base styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md              # This file
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Key Design Decisions

### Why Vite?

- Faster development server than Create React App
- Faster builds
- Modern tooling with ES modules
- Better developer experience

### Why Fetch over Axios?

- Native to browsers (no extra dependency)
- Simpler for basic REST API calls
- Smaller bundle size
- Modern Promise-based API

### Why Inline Styles?

- No CSS module setup needed for 8-hour constraint
- Component-scoped styling
- Easy to maintain in small project
- No build configuration required

### State Management

- React useState for local component state
- No Redux/Context needed for simple app
- Props drilling is minimal with shallow component tree

## User Flow

1. User lands on search page
2. Enters food name in search bar
3. Views paginated results (20 per page)
4. Clicks on food item to see details
5. Views nutritional information table
6. Can navigate back to search or search again

## Error Handling

- Network errors (backend not running)
- API errors (invalid food ID, search failures)
- Empty search results
- Loading states for async operations
- Retry functionality for failed requests

## Responsive Design

- Flexible layouts with flexbox
- Readable font sizes
- Touch-friendly buttons and cards

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript
- Fetch API support required
