import React, { useState } from 'react';
import axios from 'axios';

function CreateRule() {
  const [rule, setRule] = useState('');
  const [message, setMessage] = useState('');

  const createRule = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/create_rule', { rule });
      setMessage(`Rule created successfully. Rule ID: ${response.data.rule_id}`);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || 'Failed to create rule'}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Create Rule</h2>
      <input
        type="text"
        value={rule}
        onChange={(e) => setRule(e.target.value)}
        placeholder="e.g., age > 30 AND department = 'Sales'"
        style={styles.input}
      />
      <button onClick={createRule} style={styles.button}>
        Create Rule
      </button>
      <p style={styles.message}>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#f4f4f9',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  input: {
    width: '300px',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  message: {
    fontSize: '16px',
    color: 'darkred',
  },
};

export default CreateRule;
