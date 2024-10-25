import React, { useEffect, useState } from "react";
import axios from "axios";

function GetAllRules() {
  const [rules, setRules] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    // Define an async function inside useEffect
    const fetchRules = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get_rules");
        setRules(response.data.rules);
        setMessage("");
      } catch (error) {
        setMessage(
          `Error: ${error.response?.data?.error || "Failed to fetch rules"}`
        );
      }
    };

    fetchRules();
  }, []);
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Get All Rules</h2>

      {message && <p style={styles.result}>{message}</p>}
      <div style={styles.rulesContainer}>
        {rules.length > 0 ? (
          rules.map((rule, index) => (
            <div key={index} style={styles.ruleCard}>
              <p>
                <strong>Rule ID:</strong> {rule._id}
              </p>
              <p>
                <strong>Type:</strong> {rule.type}
              </p>
              <p>
                <strong>Value:</strong> {rule.value}
              </p>
              <p>
                <strong>Left:</strong> {JSON.stringify(rule.left)}
              </p>
              <p>
                <strong>Right:</strong> {JSON.stringify(rule.right)}
              </p>
            </div>
          ))
        ) : (
          <p>No rules found.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3f2fd",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
    marginBottom: "20px",
  },
  result: {
    fontSize: "16px",
    color: "darkred",
  },
  rulesContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxHeight: "400px",
    overflowY: "scroll",
    width: "100%",
  },
  ruleCard: {
    backgroundColor: "#fff",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    width: "300px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default GetAllRules;
