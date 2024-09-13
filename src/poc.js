import React, { useState } from 'react';

const HighlightableText = () => {
  const [text, setText] = useState("This is an example paragraph for highlighting purposes.");
  const [highlights, setHighlights] = useState([]);

  // Function to handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    
    if (selectedText) {
      const start = Math.min(selection.anchorOffset, selection.focusOffset);
      const end = Math.max(selection.anchorOffset, selection.focusOffset);

      // Avoid duplicate highlights or empty selection
      if (start !== end && !highlights.some(h => h.start === start && h.end === end)) {
        setHighlights(prev => [...prev, { start, end, text: selectedText }]);
      }

      // Clear selection
      selection.removeAllRanges();
    }
  };

  // Function to remove a highlight
  const removeHighlight = (index) => {
    setHighlights(prev => prev.filter((_, i) => i !== index));
  };

  // Function to render text with highlights and cross buttons
  const renderText = () => {
    const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);
    let currentIndex = 0;
    const parts = [];

    sortedHighlights.forEach((highlight, index) => {
      // Add text before the highlight
      if (currentIndex < highlight.start) {
        parts.push(
          <span key={`${currentIndex}-normal`}>
            {text.substring(currentIndex, highlight.start)}
          </span>
        );
      }

      // Add the highlighted text with a cross button
      parts.push(
        <span key={`${index}-highlight`} style={{ backgroundColor: 'yellow', position: 'relative' }}>
          {text.substring(highlight.start, highlight.end)}
          <button
            onClick={() => removeHighlight(index)}
            style={{
              marginLeft: '5px',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              border: 'none',
              position: 'absolute',
              top: '0px',
              right: '-15px',
            }}
          >
            ❌
          </button>
        </span>
      );

      currentIndex = highlight.end;
    });

    // Add any remaining text after the last highlight
    if (currentIndex < text.length) {
      parts.push(<span key={`${currentIndex}-normal-end`}>{text.substring(currentIndex)}</span>);
    }

    return parts;
  };

  return (
    <div>
      <p onMouseUp={handleTextSelection}>
        {renderText()}
      </p>
    </div>
  );
};

export default HighlightableText;
