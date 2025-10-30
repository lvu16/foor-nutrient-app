import React from 'react';

const Pagination = ({ currentPage, totalResults, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / pageSize);
  
  // Don't show pagination if there's only one page or no results
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const startResult = (currentPage - 1) * pageSize + 1;
  const endResult = Math.min(currentPage * pageSize, totalResults);

  return (
    <div style={styles.container}>
      <div style={styles.info}>
        Showing {startResult}-{endResult} of {totalResults} results
      </div>
      
      <div style={styles.controls}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{
            ...styles.button,
            ...(currentPage === 1 ? styles.buttonDisabled : {}),
          }}
        >
          ← Previous
        </button>
        
        <span style={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          style={{
            ...styles.button,
            ...(currentPage >= totalPages ? styles.buttonDisabled : {}),
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    marginTop: '24px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  info: {
    color: '#666',
    fontSize: '14px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  button: {
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  pageInfo: {
    fontSize: '14px',
    color: '#333',
    fontWeight: '500',
    minWidth: '100px',
    textAlign: 'center',
  },
};

export default Pagination;