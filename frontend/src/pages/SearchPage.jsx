import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import FoodList from '../components/FoodList';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { searchFoods } from '../services/api';

const SearchPage = () => {
  const [foods, setFoods] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  const performSearch = async (query, page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await searchFoods(query, page);
      setFoods(data.foods);
      setTotal(data.total);
      setCurrentPage(page);
      setPageSize(data.pageSize);
      
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message);
      setFoods([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setHasSearched(true);
    setCurrentQuery(query);
    setCurrentPage(1);
    performSearch(query, 1);
  };

  const handlePageChange = (newPage) => {
    if (currentQuery) {
      performSearch(currentQuery, newPage);
    }
  };

  const handleRetry = () => {
    if (currentQuery) {
      performSearch(currentQuery, currentPage);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Food Information Search</h1>
        <p style={styles.subtitle}>
          Search for foods to view detailed nutritional information
        </p>
      </header>

      <div style={styles.searchSection}>
        <SearchBar onSearch={handleSearch} isLoading={loading} />
      </div>

      <main style={styles.main}>
        {loading && <Loading message="Searching for foods..." />}
        
        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}
        
        {!loading && !error && hasSearched && (
          <>
            <FoodList foods={foods} total={total} />
            <Pagination
              currentPage={currentPage}
              totalResults={total}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </>
        )}
        
        {!loading && !error && !hasSearched && (
          <div style={styles.instructions}>
            <div style={styles.instructionIcon}>🔍</div>
            <h2 style={styles.title}>Start Your Search</h2>
            <p style={styles.subtitle}>Enter a food name in the search bar above to get started!</p>
            <div style={styles.examples}>
              <p style={styles.examplesTitle}>Try searching for:</p>
              <div style={styles.exampleTags}>
                <span style={styles.tag} onClick={() => handleSearch('banana')}>
                  Banana
                </span>
                <span style={styles.tag} onClick={() => handleSearch('chicken')}>
                  Chicken
                </span>
                <span style={styles.tag} onClick={() => handleSearch('apple')}>
                  Apple
                </span>
                <span style={styles.tag} onClick={() => handleSearch('milk')}>
                  Milk
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '36px',
    color: '#2c3e50',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '18px',
    color: '#7f8c8d',
    margin: 0,
  },
  searchSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '32px',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 20px',
  },
  instructions: {
    textAlign: 'center',
    padding: '60px 20px',
    maxWidth: '600px',
  },
  instructionIcon: {
    fontSize: '64px',
    marginBottom: '16px',
  },
  examples: {
    marginTop: '32px',
  },
  examplesTitle: {
    color: '#7f8c8d',
    marginBottom: '16px',
  },
  exampleTags: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default SearchPage;