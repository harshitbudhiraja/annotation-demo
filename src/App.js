import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SpanReview from './SpanReview';
import SpanComparison from './SpanComparison';
import PromptSelector from './promptSelector';
import Testing from './testing'
import Poc from './poc';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<PromptSelector />} />
      <Route path="/poc" element={<Poc />} />        
        <Route path="/modify" element={<SpanReview />} />
        <Route path="/comparison" element={<SpanComparison />} />
      </Routes>
    </Router>
  );
};

export default App;
