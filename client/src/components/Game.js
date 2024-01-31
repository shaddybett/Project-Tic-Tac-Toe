
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

  const computerMove = () => {
    console.log("computerMove called");
    if (!gameOver) {
      const emptyBoxes = board.reduce((acc, value, index) => {
        if (!value) {
          acc.push(index);
        }
        return acc;
      }, []);
  
      const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
      const computerMoveIndex = emptyBoxes[randomIndex];
  
      const updatedBoard = [...board];
      updatedBoard[computerMoveIndex] = xPlaying ? "X" : "O";
  
      setBoard(updatedBoard);
  
      // Check for winner after the computer's move
      const winnerAfterComputerMove = checkWinner(updatedBoard);
      if (winnerAfterComputerMove) {
        updateScores(winnerAfterComputerMove);
        setRounds(rounds + 1);
        if (rounds === 4) {
          // Check if it's the fourth round (0-based index)
          setGameOver(true);
          saveScoresToDatabase();
          return;
        }
        resetBoard();
        return;
      } else {
        // Change active player
        setXPlaying(!xPlaying);
      }
    }
  };

  useEffect(() => {
    if (!xPlaying && !gameOver) {
      setTimeout(computerMove, 100);
    }
  }, [xPlaying]);

  const handleBoxClick = (boxIdx) => {
    console.log("handleBoxClick called with boxIdx:", boxIdx)
    if (!gameOver && (!xPlaying || !board[boxIdx])) {
      // Update the board for human player
      const updatedBoard = board.map((value, idx) => {
        if (idx === boxIdx && !value) {
          return xPlaying ? "X" : "O";
        } else {
          return value;
        }
      });
      clickAudio.currentTime = 0;
      clickAudio.play();
      setBoard(updatedBoard);

      // Check for winner
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
      } else {
        // Change active player
        setXPlaying(!xPlaying);
      }
    }
    
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
    <div className="Game-page">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetGame : handleBoxClick} />
      {/* {gameOver && ()} */}
        <div>
          <ResetButton resetBoard={resetGame} />
          <button onClick={() => history.push("/select")} className="quit">Quit</button>{/* Use history.push to navigate */}
        </div>
      
    </div>
  );
};

export default Game;
