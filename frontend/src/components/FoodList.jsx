import React from "react";
import FoodCard from "./FoodCard";

const FoodList = ({foods, total}) => {
    if (foods.length === 0) {
        return (
            <div style={styles.empty}>
                <p>No foods found. Try a different search term!</p>
            </div>
        );
    }

    return (
      <div style={styles.container}>
        <div style={styles.header}>
            <h2 style={styles.title}>Search Results</h2>
            <span style={styles.count}>
                {total} {total === 1 ? 'result': 'results'} found
            </span>
        </div>

        <div style={styles.list}>
            {foods.map((food) => (
                <FoodCard key={food.fdcId} food={food}/>
            ))}
        </div>

      </div>
    );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '800px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  title: {
    margin: 0,
    color: '#333',
  },
  count: {
    color: '#666',
    fontSize: '14px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  empty: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
  },
};

export default FoodList;