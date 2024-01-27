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
