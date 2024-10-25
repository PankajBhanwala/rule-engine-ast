const { RuleManager } = require("./ruleManager");

describe("RuleManager", () => {
  const ruleManager = new RuleManager();

  test("createRule should create a valid AST", () => {
    const ruleString = "age > 30 AND department = 'Sales'";
    const ast = ruleManager.createRule(ruleString);
    expect(ast).toHaveProperty("type", "operator");
    expect(ast.left).toHaveProperty("type", "operand");
    expect(ast.right).toHaveProperty("type", "operand");
  });

  test("combineRules should combine multiple rules", () => {
    const rule1 = ruleManager.createRule("age > 30 AND department = 'Sales'");
    const rule2 = ruleManager.createRule("salary > 50000");
    const combined = ruleManager.combineRules([rule1, rule2]);
    expect(combined.type).toBe("operator");
  });

  test("evaluateRule should return true for valid data", () => {
    const ruleString = "age > 30 AND department = 'Sales'";
    const ast = ruleManager.createRule(ruleString);
    const data = { age: 35, department: "Sales" };
    const result = ruleManager.evaluateRule(ast, data);
    expect(result).toBe(true);
  });
});
