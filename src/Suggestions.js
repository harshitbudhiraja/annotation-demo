import React from 'react';

const Suggestions = ({ suggestions }) => {
  return (
    <div>
      <h3>Suggestions:</h3>
      {suggestions.length > 0 ? (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      ) : (
        <p>No suggestions available.</p>
      )}
    </div>
  );
};

export default Suggestions;
