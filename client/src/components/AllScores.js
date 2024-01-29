
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
      <h1>Scores</h1>
      <Link to="/select" className="back">Go Back</Link>
      <table>
        <thead>
            <tr>
                <th>Player</th>
                <th>Score</th>
                <th>Round</th>
            </tr>
        </thead>
        <tbody>
          {scores.map((score, index)=>(
            <tr key={index}>
            <td>{score.username}</td>
            <td>{score.score_value}</td>
            <td>{score.round_number}</td>
        </tr>

          ))}
        </tbody>
    </table>
    </div>
  );
};

export default AllScores;
