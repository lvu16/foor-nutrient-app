import React from "react";

const Loading = ({message = 'Loading...'}) => {
    return(
        <div style={styles.container}>
            <div style={styles.spinner}></div>
            <p style={styles.message}>{message}</p>
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
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
  message: {
    marginTop: '16px',
    color: '#666',
    fontSize: '16px',
  },
};

export default Loading;