import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import FoodDetailPage from './pages/FoodDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/food/:fdcId" element={<FoodDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;