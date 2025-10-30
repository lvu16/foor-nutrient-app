# Technical Assessment - Assumptions & Decisions

**Project**: Food Information Application  
**Date**: October 30, 2025  
**Developer**: Linh Fowler

## Problem Understanding

Build a full-stack food information application that:

- Searches USDA FoodData Central API for foods by name
- Displays paginated search results (20 per page)
- Shows detailed nutritional information for selected foods
- Provides clean, user-friendly interface

## Technical Stack Decisions

### Backend: Flask (Instead of Suggested FastAPI)

**Decision Rationale:**

- **Hands-on experience**: Used Flask in Business Supply Express project at Georgia Tech
- **Time constraint optimization**: 8-hour window better served by using familiar technology
- **Core functionality identical**: Both Flask and FastAPI provide REST API capabilities, JSON handling, CORS support, and environment configuration
- **Demonstrates pragmatic thinking**: Choosing the right tool for constraints and timeline

**FastAPI Understanding:**
I understand FastAPI's advantages (automatic OpenAPI docs, Pydantic validation, async/await), but for this assessment's scope, Flask provided everything needed while allowing me to focus on architecture and problem-solving rather than learning new framework syntax.

**Production Consideration:**
For a new Primefocus Health project, I would evaluate FastAPI vs Flask based on:

- Team expertise
- Performance requirements (async needs)
- Documentation needs (OpenAPI/Swagger)
- Project timeline

### Frontend: React + Vite (Instead of Suggested Flutter)

**Decision Rationale:**

- **Requirements explicitly stated**: "choose tools you are comfortable with and focus on problem solving approach rather than syntax"
- **Strong experience**: Built WasteNot (multi-platform) and Qualpat (capstone) with React
- **Faster development**: Vite provides instant HMR and faster builds than alternatives
- **Core concepts transferable**: Component architecture, state management, navigation, and API integration patterns are identical across frameworks

**Flutter Understanding:**
I recognize Flutter's advantages for mobile:

- Single codebase for iOS/Android
- Native performance
- Rich widget library
- Excellent for mobile-first healthcare apps like Primefocus Health's platform

**Why React for This Assessment:**

- Web-first approach suited assessment scope
- Delivered higher quality code within time constraint
- Demonstrated actual skills vs learning syntax under pressure
- Mission: show problem-solving and engineering ability

## Scope Decisions

### In Scope (MVP - 8 Hours)

✅ **Core Features:**

- Food search by name with real-time feedback
- Pagination (20 results per page with Previous/Next controls)
- Food details page with key nutrients table
- Responsive design for desktop and mobile web
- Error handling with user-friendly messages
- Loading states for async operations

✅ **Technical Requirements:**

- RESTful API design
- CORS configuration for frontend
- Environment variable management
- Input validation
- Proper HTTP status codes
- Clean code with comments

### Out of Scope

❌ **Deferred for Production:**

- User authentication/authorization
- Favorites/bookmarking functionality
- Search history persistence (localStorage)
- Advanced filtering (by nutrient ranges, categories)
- Unit/integration tests
- Comprehensive error handling for all edge cases
- Caching layer (Redis)
- Rate limiting
- Docker deployment
- CI/CD pipeline
- Mobile app deployment

## Data & API Assumptions

### USDA API Integration

- **Data reliability**: Using "Survey (FNDDS)" and "Branded" data types for most reliable results
- **Nutrient availability**: Some foods may have incomplete nutrient data → display "N/A" for missing values
- **API rate limits**: Assuming reasonable usage within free tier limits
- **Data freshness**: Real-time data from USDA (no caching for this MVP)
- **Pagination**: 20 results per page as specified

### Nutrient Extraction Challenge

**Problem**: USDA API has multiple data formats (Foundation, Survey, Branded) with different JSON structures.

**Solution**:

- Implemented robust nutrient extraction using both nutrient IDs and keyword matching
- Handles nested `nutrient` objects with `amount` field
- Falls back gracefully when data is missing
- Filters out duplicate entries (e.g., Energy in kJ vs kcal)

**Key Nutrients Selected:**

- Calories (kcal) - most commonly sought
- Protein (g) - macronutrient
- Carbohydrates (g) - macronutrient
- Fat (g) - macronutrient
- Fiber (g) - important for health metrics

## User Experience Assumptions

### Primary Use Case

- Users searching for basic nutritional information
- Simple, fast lookups (not detailed meal planning)
- Web-first access via browser
- Desktop and mobile web users

### UI/UX Priorities

1. **Clarity over aesthetics**: Clean, readable design prioritized over visual flair
2. **Speed over features**: Fast load times and responsive interactions
3. **Simplicity over complexity**: Focused feature set with excellent execution
4. **Error resilience**: Clear error messages with actionable retry options

## Security & Privacy

### Current Implementation

- Environment variables for API keys (not committed to git)
- CORS configured for specific origins
- Input validation on search queries
- HTTPS assumed for production (currently HTTP in dev)

### Production Requirements (Not Implemented)

- Rate limiting per IP/user
- API key rotation
- Request logging and monitoring
- HTTPS enforcement
- Security headers (CSP, HSTS)
- Input sanitization against injection attacks

## Testing Approach

### Manual Testing Performed

✅ Search functionality with various terms
✅ Pagination (Previous/Next buttons)
✅ Food detail navigation
✅ Error states (backend down, invalid food ID)
✅ Loading states
✅ Empty search results
✅ Edge cases (very long food names, special characters)
✅ Cross-browser testing (Chrome, Firefox)

### Not Implemented (Time Constraint)

❌ Unit tests for components
❌ Integration tests for API
❌ End-to-end tests with Cypress/Playwright
❌ Performance testing
❌ Accessibility testing (WCAG compliance)

**Production Consideration**: Would add comprehensive test suite with Jest, React Testing Library, and Pytest.

## Performance Considerations

### Current Optimizations

- Pagination to limit data transfer (20 items)
- Minimal dependencies (used Fetch over Axios)
- Component-based architecture for React re-render optimization
- Vite for fast development and optimized production builds

### Future Optimizations

- Caching frequent searches (Redis on backend)
- Debounced search input
- Virtual scrolling for large result sets
- Code splitting and lazy loading
- Image optimization (if adding food images)
- CDN for static assets

## Accessibility

### Current State

- Semantic HTML structure
- Readable font sizes and contrast
- Keyboard navigation for form inputs
- Alt text for error/loading icons

### Not Implemented

- ARIA labels for screen readers
- Keyboard navigation for all interactive elements
- Focus management
- Skip navigation links
- Color contrast WCAG AA compliance verification

## Browser Compatibility

**Tested On:**

- Chrome 120+ ✅

**Requirements:**

- Modern browser with ES6+ support
- Fetch API support
- CSS Flexbox support

## Deployment Assumptions

### Development

- Backend: localhost:8000
- Frontend: localhost:5173 (Vite dev server)

### Production (Not Implemented)

- Backend: Would deploy to AWS/Heroku/Fly.io
- Frontend: Would deploy to Vercel/Netlify
- Environment-specific configurations
- HTTPS enforcement
- Domain configuration
- Database for caching (if needed)

## Trade-offs & Limitations

### Chosen Trade-offs

1. **Flask vs FastAPI**: Familiarity over modern features → faster development
2. **React vs Flutter**: Web-first over mobile-native → better quality in time limit
3. **Inline styles vs CSS files**: Speed over scalability → appropriate for small project
4. **Fetch vs Axios**: Native vs feature-rich → smaller bundle size
5. **No tests**: Functionality over test coverage → manual testing instead
6. **Basic styling**: Functional over beautiful → clean but minimal design

### Known Limitations

**Technical:**

- No request caching → repeated API calls for same queries
- No database → all data from USDA in real-time
- No user sessions → no personalization

**UX:**

- Basic styling → functional but not visually impressive
- No loading progress bars → just spinners
- No search suggestions/autocomplete
- No "no results" suggestions

**Scalability:**

- No horizontal scaling considerations
- No load balancing
- No monitoring/logging infrastructure

## Key Learnings

### During Development

1. **USDA API complexity**: Multiple data formats required robust parsing logic
2. **Nutrient extraction**: Using nutrient IDs more reliable than names
3. **CORS configuration**: Important for local development (different ports)
4. **Error handling**: Clear error messages significantly improve UX
5. **Pagination UX**: Auto-scroll to top on page change improves experience

### If I Had More Time

- Add comprehensive test suite (Jest, Pytest)
- Implement caching layer (Redis)
- Add search history with localStorage
- Improve styling with CSS framework (Tailwind)
- Add more nutrients (vitamins, minerals)
- Implement barcode scanning for mobile
- Add nutritional comparisons (side-by-side foods)
- Create user accounts and saved foods

## Conclusion

This project demonstrates:
✅ Full-stack development capability
✅ RESTful API design and implementation
✅ React component architecture and state management
✅ External API integration and error handling
✅ Pragmatic technical decision-making
✅ Clear documentation and communication
✅ Ability to deliver working software under time constraints

The chosen technology stack (React + Flask) allowed me to focus on problem-solving, clean architecture, and delivering a polished, working application rather than learning new framework syntax. This pragmatic approach reflects real-world engineering where choosing the right tool for the constraints is as important as technical skill.
