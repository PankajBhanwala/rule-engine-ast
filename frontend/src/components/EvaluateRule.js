import React, { useState } from 'react';
import axios from 'axios';

function EvaluateRule() {
  const [ruleId, setRuleId] = useState('');
  const [data, setData] = useState('');
  const [result, setResult] = useState('');

  const evaluateRule = async () => {
    try {
      const jsonData = JSON.parse(data); // Parse the input data to JSON
      const response = await axios.post('http://localhost:5000/api/evaluate_rule', {
        rule_id: ruleId,
        data: jsonData,
      });
      setResult(`Evaluation Result: ${response.data.result}`);
    } catch (error) {
      setResult(`Error: ${error.response?.data?.error || 'Failed to evaluate rule'}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Evaluate Rule</h2>
      <input
        type="text"
        value={ruleId}
        onChange={(e) => setRuleId(e.target.value)}
        placeholder="Enter Rule ID (e.g., 645abc12345def67890abc12)"
        style={styles.input}
      />
      <textarea
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder='Enter data as JSON (e.g., {"age": 35, "department": "Sales", "salary": 60000})'
        style={styles.textarea}
      />
      <button onClick={evaluateRule} style={styles.button}>
        Evaluate Rule
      </button>
      <p style={styles.result}>{result}</p>
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
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  header: {
    fontSize: '24px',
  },
  input: {
    width: '300px',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    width: '300px',
    height: '100px',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    resize: 'vertical',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#2196F3',
    color: '#fff',
    cursor: 'pointer',
    
  },
  result: {
    fontSize: '16px',
    color: 'darkred',
  },
};

export default EvaluateRule;
