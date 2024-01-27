// import React from "react";
// import { useHistory } from "react-router";

// export default function Select() {
//   const history = useHistory();

//   const handleNewGameClick = () => {
//     // Redirect to the /game page when "New game" is clicked
//     history.push(`/game`);
//   };
//   const handleScores = () => {
//     // Redirect to the /game page when "New game" is clicked
//     history.push(`/scores`);
//   };


//   return (
//     <div>
//       <h1></h1>
//       {/* Add a button for "New game" with an onClick handler */}
//       <button onClick={handleNewGameClick}>New game</button>
//       <button onClick={handleScores}>Scores</button>

//     </div>
//   );
// }



import React from 'react';
import { Link } from 'react-router-dom';

const Select = () => {
  return (
    <div>
      <h2>Select Page</h2>
      <Link to="/game">New Game</Link>
      <Link to="/scores">Scores</Link>
    </div>
  );
};

export default Select;

// import React from 'react';
// import { Link } from 'react-router-dom';


// export default Select;
// const Select = () => {
//   return (
//     <div>
//       <h2>Select Page</h2>
//       <Link to="/game">New Game</Link>
//       <Link to="/scores">Scores</Link>
//     </div>
//   );
// };
