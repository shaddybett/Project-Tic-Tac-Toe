

import React from 'react';
import '../index.css';

export const ScoreBoard = ({ scores, xPlaying }) => {
  const { xScore, oScore } = scores || { xScore: 0, oScore: 0 };

  return (
    <div className="scoreboard">
      <span className={`score x-score ${!xPlaying && 'inactive'}`}>X - {xScore}</span>
      <span className={`score o-score ${xPlaying && 'inactive'}`}>O - {oScore}</span>
    </div>
  );
};
