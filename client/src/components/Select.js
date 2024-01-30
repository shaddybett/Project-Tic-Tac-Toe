import React from 'react';
import { Link } from 'react-router-dom';

const Select = () => {
  return (
    <div className='select-div'>
      <h1 className='select-heading'>Select Page</h1>
      
      <Link to="/game" className='game'>New Game</Link>
      <Link to="/scores" className='game'>Scores</Link>
      <Link to="/profile" className='game'>Profile</Link>
    </div>
  );
};

export default Select;
