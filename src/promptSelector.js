import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";

const prompts = [
  { id: 1, title: "Translate Text", text: "Prompt 1: Translate the given text into another language." },
  { id: 2, title: "Summarize Text", text: "Prompt 2: Summarize the provided document concisely." },
  { id: 3, title: "Classify Text", text: "Prompt 3: Classify the text into predefined categories." },
  { id: 4, title: "Generate Text", text: "Prompt 4: Generate a creative text based on the input." },
  { id: 5, title: "Analyze Sentiment", text: "Prompt 5: Analyze the sentiment of the given text." }
];

const PromptSelector = () => {
  const navigate = useNavigate();

  const handlePromptClick = (id) => {
    console.log(`Prompt ${id} clicked`);
    navigate('/modify');
  };

  return (
    <div style={{display: 'flex', flexDirection:'column'}}>
      <Header/>
      <div className="prompt-selector">
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            className="tile"
            onClick={() => handlePromptClick(prompt.id)}
          >
            <div className="tile-content">
              <h3 className="tile-title">{prompt.text}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default PromptSelector;
