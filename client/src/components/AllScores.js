// // AllScores.js

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const AllScores = () => {
//   const [scores, setScores] = useState([]);

//   useEffect(() => {
//     fetchScores();
//   }, []);

//   const fetchScores = async () => {
//     try {
//       const response = await fetch("http://localhost:5555/get_scores");
//       if (!response.ok) {
//         throw new Error("Failed to fetch scores");
//       }
//       const data = await response.json();
//       setScores(data);
//     } catch (error) {
//       console.error("Error fetching scores:", error.message);
//     }
//   };

//   return (
//     <div className="ScoresPage">
//       <h2>Scores</h2>
//       <ul>
//         {scores.map((score, index) => (
//           <li key={index}>
//             Player: {score.username}, Score: {score.score_value}, Round:{" "}
//             {score.round_number}
//           </li>
//         ))}
//       </ul>
//       <Link to="/select">Go Back</Link>
//     </div>
//   );
// };

// export default AllScores;

// AllScores.js

// ... (existing imports)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllScores = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await fetch("/get_scores");
      if (!response.ok) {
        throw new Error("Failed to fetch scores");
      }
      const data = await response.json();
      console.log("Fetched Scores:", data);
      setScores(data);
    } catch (error) {
      console.error("Error fetching scores:", error.message);
    }
  };

  return (
    <div className="ScoresPage">
      <h2>Scores</h2>
      <Link to="/select">Go Back</Link>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            Player: {score.username}, Score: {score.score_value}, Round:{" "}
            {score.round_number}
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default AllScores;
