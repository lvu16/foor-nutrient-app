import React from "react";
import { useNavigate } from 'react-router-dom';

const FoodCard = ({food}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/food/${food.fdcId}`);
    };

    return (
        <div style={styles.card} onClick={handleClick}>
            <h3 style={styles.title}>{food.description}</h3>
            <div style={styles.meta}>
                {food.brandOwner && (
                    <span style={styles.brand}> 🏷️ {food.brandOwner}</span>
                )}
                <span style={styles.dataType}>{food.dataType}</span>
            </div>

        </div>
    );
};

const styles = {
  card: {
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    margin: '0 0 8px 0',
    color: '#007bff',
    fontSize: '18px',
  },
  meta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    fontSize: '14px',
    color: '#666',
  },
  brand: {
    fontWeight: '500',
  },
  dataType: {
    backgroundColor: '#f0f0f0',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
  },
};

export default FoodCard;