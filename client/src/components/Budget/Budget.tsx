import React, { useEffect, useState, seContext } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget } from "../../utils/budget-utils";

// const Budget = () => {
//   const { budget } = useContext(AppContext);




//   return (
//     <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
//       <div>Budget: ${budget}</div>
//     </div>
//   );
// };

// export default Budget;


const Budget: React.FC = () => {
  const [budget, setBudget] = useState<number | null>(null); // State to store the budget
  const [error, setError] = useState<string | null>(null);   // State to store any error messages

  useEffect(() => {
      // Function to fetch the budget on component mount
      const loadBudget = async () => {
          try {
              const budgetValue = await fetchBudget(); // Call the fetchBudget function
              setBudget(budgetValue);                 // Update the state with the fetched budget
          } catch (err) {
              setError("Failed to load budget");       // Set error message if fetching fails
              console.error(err);                      // Log error for debugging
          }
      };

      loadBudget(); // Execute the loadBudget function when component mounts
  }, []); // Empty dependency array to run only on mount

  return (
      <div>
          <h1>Budget</h1>
          {error ? (
              <p style={{ color: "red" }}>{error}</p>    // Display error if any
          ) : (
              <p>{budget !== null ? `$${budget}` : "Loading..."}</p> // Display budget or loading text
          )}
      </div>
  );
};

export default Budget;