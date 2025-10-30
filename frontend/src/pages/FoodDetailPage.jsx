import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import {getFoodDetail} from '../services/api';
import  {formatNutrient} from '../utils/formatters';

const FoodDetailPage = () => {
  const { fdcId } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodDetail = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getFoodDetail(fdcId);
        setFood(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetail();
  }, [fdcId]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    getFoodDetail(fdcId)
      .then(data => setFood(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Loading message="Loading food details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <button onClick={() => navigate('/')} style={styles.backButton}>
          ← Back to Search
        </button>
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (!food) {
    return null;
  }

  const nutrients = [
    { name: 'Calories', value: food.nutrients.calories, unit: 'kcal' },
    { name: 'Protein', value: food.nutrients.protein, unit: 'g' },
    { name: 'Carbohydrates', value: food.nutrients.carbs, unit: 'g' },
    { name: 'Fat', value: food.nutrients.fat, unit: 'g' },
    { name: 'Fiber', value: food.nutrients.fiber, unit: 'g' },
  ];

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backButton}>
        ← Back to Search
      </button>

      <div style={styles.card}>
        <header style={styles.header}>
          <h1 style={styles.title}>{food.description}</h1>
          <div style={styles.meta}>
            {food.brandOwner && (
              <span style={styles.brand}>🏷️ {food.brandOwner}</span>
            )}
            <span style={styles.dataType}>{food.dataType}</span>
          </div>
        </header>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Key Nutrients (per 100g)</h2>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Nutrient</th>
                <th style={styles.tableHeader}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {nutrients.map((nutrient, index) => (
                <tr 
                  key={nutrient.name} 
                  style={{
                    ...styles.tableRow,
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'
                  }}
                >
                  <td style={styles.tableCell}>{nutrient.name}</td>
                  <td style={styles.tableCellValue}>
                    {formatNutrient(nutrient.value, nutrient.unit)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer style={styles.footer}>
          <p style={styles.footerText}>
            Data Source: USDA FoodData Central (ID: {food.fdcId})
          </p>
        </footer>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '20px',
  },
  backButton: {
    backgroundColor: 'transparent',
    border: '2px solid #007bff',
    color: '#007bff',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '20px',
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '32px',
  },
  header: {
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '20px',
    marginBottom: '24px',
  },
  title: {
    fontSize: '28px',
    color: '#2c3e50',
    margin: '0 0 12px 0',
  },
  meta: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  brand: {
    color: '#7f8c8d',
    fontSize: '16px',
  },
  dataType: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500',
  },
  section: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '20px',
    color: '#34495e',
    marginBottom: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  tableHeaderRow: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  tableHeader: {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '16px',
  },
  tableRow: {
    borderBottom: '1px solid #e0e0e0',
  },
  tableCell: {
    padding: '12px 16px',
    fontSize: '16px',
    color: '#2c3e50',
    fontWeight: '500',
  },
  tableCellValue: {
    padding: '12px 16px',
    fontSize: '16px',
    color: '#7f8c8d',
    textAlign: 'right',
  },
  footer: {
    marginTop: '24px',
    paddingTop: '16px',
    borderTop: '1px solid #e0e0e0',
  },
  footerText: {
    fontSize: '14px',
    color: '#95a5a6',
    textAlign: 'center',
    margin: 0,
  },
};

export default FoodDetailPage;