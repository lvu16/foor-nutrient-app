import React from "react";

const ErrorMessage = ({message, onRetry}) => {
    return (
        <div style={styles.container}>
            <div style={styles.icon}>⚠️</div>
            <h3 style={styles.title}>Opps! Something went wrong</h3>
            <p style={styles.message}>{message}</p>
            {onRetry && (
                <button onClick={onRetry} style={styles.button}>
                    Try Again
                </button>
            )}
        </div>
    );
};


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#fff3cd',
    border: '1px solid #ffc107',
    borderRadius: '8px',
    margin: '20px',
  },
  icon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  title: {
    color: '#856404',
    marginBottom: '8px',
  },
  message: {
    color: '#856404',
    marginBottom: '16px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default ErrorMessage;