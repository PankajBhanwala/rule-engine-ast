import React, { useState } from 'react';
import axios from 'axios';

function CombineRules() {
  const [ruleIds, setRuleIds] = useState('');
  const [result, setResult] = useState('');

  const handleCombineRules = async () => {
    try {
      // Split the input string by commas and trim whitespace
      const idsArray = ruleIds.split(',').map(id => id.trim());

      // Make the API request to combine rules
      const response = await axios.post('http://localhost:5000/api/combine_rules', {
        rule_ids: idsArray,
      });

      // Set the result of the combined rules
      setResult(`Combined Rule: ${JSON.stringify(response.data.combined_rule, null, 2)}`);
    } catch (error) {
      setResult(`Error: ${error.response?.data?.error || 'Failed to combine rules'}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Combine Rules</h2>
      <input
        type="text"
        value={ruleIds}
        onChange={(e) => setRuleIds(e.target.value)}
        placeholder="Enter rule IDs separated by commas (e.g., 6144f0e1f3b60f2f5b6a254e, 6144f0e2f3b60f2f5b6a254f)"
        style={styles.input}
      />
      <button onClick={handleCombineRules} style={styles.button}>
        Combine Rules
      </button>
      <pre style={styles.result}>{result}</pre>
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
    backgroundColor: '#FF5722',
    color: '#fff',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  result: {
    fontSize: '16px',
    color: 'darkred',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    width: '300px',
    maxHeight: '400px',
    overflowY: 'scroll',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
};

export default CombineRules;
