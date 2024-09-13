import React, { useState } from 'react';

const TextInput = ({ analyzeText }) => {
  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleAnalyzeClick = () => {
    analyzeText(text);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={handleInputChange}
        placeholder="Type or paste your text here..."
      />
      <button onClick={handleAnalyzeClick}>Analyze Text</button>
    </div>
  );
};

export default TextInput;
