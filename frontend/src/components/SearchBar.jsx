import React, { useState } from "react";

const SearchBar = ({onSearch, isLoading}) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return(
        <form onSubmit={handleSubmit} style={styles.form}>
            <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for foods (e.g., banana, chicken, apple)..."
                style={styles.input}
                disabled={isLoading}
            />

            <button
                type="submit"
                style={styles.button}
                disabled={isLoading || !query.trim()}
            >
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
};

const styles = {
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '24px',
    width: '100%',
    maxWidth: '600px',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default SearchBar;