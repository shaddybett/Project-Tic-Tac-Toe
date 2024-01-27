// import React, { useState, useEffect, useMemo } from "react";
// import clickSound from "./sounds/button-124476.mp3";

// import { Board } from "./Board";
// import { ResetButton } from "./ResetButton";
// // import { ScoreBoard } from "./ScoreBoard";
// import "../index.css";
// import { ScoreBoard } from './ScoreBoard'
// const Game = () => {
//   const clickAudio = useMemo(() => new Audio(clickSound), []); // Memoize the Audio object

//   useEffect(() => {
//     // This effect will be called whenever the component re-renders
//     // Play the sound when the component mounts
//     clickAudio.volume = 0.5; // Adjust the volume as needed
//     clickAudio.play();

//     // Cleanup function to stop the sound when the component unmounts
//     return () => {
//       clickAudio.pause();
//       clickAudio.currentTime = 0;
//     };
//   }, [clickAudio]); // Add clickAudio to the dependency array

//   const WIN_CONDITIONS = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   const [xPlaying, setXPlaying] = useState(true);
//   const [board, setBoard] = useState(Array(9).fill(null));
//   const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
//   const [gameOver, setGameOver] = useState(false);

//   const handleBoxClick = (boxIdx) => {
//     // Step 1: Update the board
//     const updatedBoard = board.map((value, idx) => {
//       if (idx === boxIdx) {
//         return xPlaying ? "X" : "O";
//       } else {
//         return value;
//       }
//     });

//     clickAudio.currentTime = 0; // Reset the sound to the beginning
//     clickAudio.play();

//     setBoard(updatedBoard);

//     // Step 2: Check if either player has won the game
//     const winner = checkWinner(updatedBoard);

//     if (winner) {
//       if (winner === "O") {
//         let { oScore } = scores;
//         oScore += 1;
//         setScores({ ...scores, oScore });
//       } else {
//         let { xScore } = scores;
//         xScore += 1;
//         setScores({ ...scores, xScore });
//       }
//       setGameOver(true);
//       return;
//     }

//     // Step 3: Change active player
//     setXPlaying(!xPlaying);
//   };

//   const checkWinner = (board) => {
//     for (let i = 0; i < WIN_CONDITIONS.length; i++) {
//       const [x, y, z] = WIN_CONDITIONS[i];

//       // Iterate through win conditions and check if either player satisfies them
//       if (board[x] && board[x] === board[y] && board[y] === board[z]) {
//         return board[x];
//       }
//     }
//     return null;
//   };

//   const resetBoard = () => {
//     setGameOver(false);
//     setBoard(Array(9).fill(null));
//   };

//   return (
//     <div className="Game">
//       <ScoreBoard scores={scores} xPlaying={xPlaying} />
//       <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
//       {gameOver && <ResetButton resetBoard={resetBoard} />}
//     </div>
//   );
// };

// export default Game;

import React, { useState, useEffect, useMemo } from "react";
import clickSound from "./sounds/button-124476.mp3";
import { useHistory } from "react-router-dom";

import { Board } from "./Board";
import { ResetButton } from "./ResetButton";
import { ScoreBoard } from "./ScoreBoard";
import "../index.css";

const Game = () => {
  const clickAudio = useMemo(() => new Audio(clickSound), []);
  const history=useHistory();

  useEffect(() => {
    clickAudio.volume = 0.5;
    clickAudio.play();

    return () => {
      clickAudio.pause();
      clickAudio.currentTime = 0;
    };
  }, [clickAudio]);

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [rounds, setRounds] = useState(0);

  const handleBoxClick = (boxIdx) => {
    if (gameOver) return;

    const updatedBoard = board.map((value, idx) =>
      idx === boxIdx ? (xPlaying ? "X" : "O") : value
    );
    clickAudio.currentTime = 0;
    clickAudio.play();

    setBoard(updatedBoard);

    const winner = checkWinner(updatedBoard);

    if (winner) {
      updateScores(winner);
      setRounds(rounds + 1);
      if (rounds === 4) {
        // Check if it's the fourth round (0-based index)
        setGameOver(true);
        saveScoresToDatabase();
        return;
      }
      resetBoard();
      return;
    }

    setXPlaying(!xPlaying);
  };

  const updateScores = (winner) => {
    const updatedScores = { ...scores };
    updatedScores[winner.toLowerCase() + "Score"] += 1;
    setScores(updatedScores);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
    return null;
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
  };

  const saveScoresToDatabase = () => {
    const backendEndpoint = "http://127.0.0.1:5555/save_scores"; // Update the endpoint
    fetch(backendEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scores),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Scores saved to database:", data);
        if (data.end_game) {
          setGameOver(true);
          setRounds(0); // Reset rounds
          // Optionally: Add logic to display a message or redirect to a different page
        }
      })
      .catch((error) => console.error("Error saving scores:", error));
  };

  const resetGame = () => {
    setScores({ xScore: 0, oScore: 0 }); // Reset scores
    setRounds(0); // Reset rounds
    setGameOver(false);
    resetBoard();
  };

  return (
    <div className="Game">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetGame : handleBoxClick} />
      {gameOver && (
        <div>
          <ResetButton resetBoard={resetGame} />
          <button onClick={() => history.push("/select")}>Quit</button>{/* Use history.push to navigate */}
        </div>
      )}
    </div>
  );
};

export default Game;
