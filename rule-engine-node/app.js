const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { RuleManager } = require("./ruleManager");

const app = express();
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rsfx7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Connect to MongoDB using Mongoose
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // Set higher connection timeout
    socketTimeoutMS: 30000, // Set higher socket timeout
  })
  .then(() => {
    console.log("Database Connection Established")

    // Start the server only after connection is established
  const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log("Server Started")
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// RuleManager and Rules Schema
const ruleManager = new RuleManager();
const Rule = mongoose.model(
  "Rule",
  new mongoose.Schema({
    type: String,
    value: String,
    left: Object,
    right: Object,
  })
);

// Create Rule Endpoint
app.post("/api/create_rule", async (req, res) => {
  // 

  const ruleString = req.body.rule;
  if (!ruleString) {
    
    return res.status(400).json({ error: "Rule string is required" });
  }

  try {
    
    const ruleAst = ruleManager.createRule(ruleString);
    

    const rule = new Rule(ruleAst);
    

    const savedRule = await rule.save();
    

    return res
      .status(201)
      .json({ message: "Rule created successfully", rule_id: savedRule._id });
  } catch (err) {
    console.error("Error in create_rule:", err);
    return res.status(500).json({ error: err.message });
  }
});
app.get("/api/get_rules", async (req, res) => {
    try {
      const rules = await Rule.find();
      return res.status(200).json({ rules });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
  
// Evaluate Rule Endpoint
app.post("/api/evaluate_rule", async (req, res) => {
  const { rule_id, data } = req.body;
  if (!rule_id || !data) {
    return res.status(400).json({ error: "rule_id and data are required" });
  }
  try {
    const ruleAst = await Rule.findById(rule_id);
    if (!ruleAst) {
      return res.status(404).json({ error: "Rule not found" });
    }
    const result = ruleManager.evaluateRule(ruleAst, data);
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Combine Rules Endpoint
app.post("/api/combine_rules", async (req, res) => {
  const { rule_ids } = req.body;
  if (!rule_ids || !Array.isArray(rule_ids)) {
    return res.status(400).json({ error: "rule_ids must be an array" });
  }
  try {
    const ruleAsts = await Rule.find({ _id: { $in: rule_ids } });
    if (ruleAsts.length !== rule_ids.length) {
      return res.status(404).json({ error: "One or more rules not found" });
    }

    const combinedAst = ruleManager.combineRules(ruleAsts);
    return res.status(200).json({ combined_rule: combinedAst });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
