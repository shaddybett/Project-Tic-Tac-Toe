import React from "react";

import "../index.css";

export const ResetButton = ({ resetBoard }) => {
  return (
    <button className="reset-btn" onClick={resetBoard}>
      Play Again
    </button>
  );
};
