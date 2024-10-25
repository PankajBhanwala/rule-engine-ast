import React from "react";
import CreateRule from "./CreateRule";
import EvaluateRule from "./EvaluateRule";
import GetAllRules from "./GetAllRules";
import CombineRules from "./CombineRules";
import CombineRule from "./CombineRules";

function App() {
  const [showAllRules, setShowAllRules] = React.useState(false);
  const ATTRIBUTE_CATALOG = ["age", "department", "salary", "experience"];
  return (
    <div className="main-Container">
      <button
        className="button"
        onClick={() => {
          setShowAllRules(!showAllRules);
        }}
      >
        {showAllRules ? "Hide All Rules" : "Show All Rules"}
      </button>
      {!showAllRules && (
        <>
          <div className="catalog-title">Available Catalogs :</div>
          <div className="catalog">
            {ATTRIBUTE_CATALOG.map((e) => (
              <span>{e}</span>
            ))}
          </div>
        </>
      )}

      {showAllRules ? (
        <GetAllRules />
      ) : (
        <div>
          <div className="container">
            {" "}
            <CreateRule />
            <EvaluateRule />
          </div>
          <CombineRules/>
        </div>
      )}
    </div>
  );
}

export default App;
