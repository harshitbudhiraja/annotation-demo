import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Header from './Header';
const SpanComparison = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };


  return (
    <div className="container">
    <Header/>
<div style={{display:'flex', flexDirection:'row'}}>

<div className="comparison-box" style={{}}>
  <h1>Initial Span</h1>
        <div className="column initial-prompt">
          <h2>Prompt</h2>
          <p style={{fontSize:'18px'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et{' '}
            <span className="highlight-initial">dolore magna aliqua</span>.
            Lorem ipsum dolor sit amet,{' '}
            <span className="highlight-initial">consectetur adipisicing elit</span>.
            Lorem ipsum dolor sit amet,{' '}
            <span className="highlight-initial">eiusmod tempor incididunt</span>.
          </p>
        </div>
        <div className="column initial-response"  style={{backgroundColor:'#cccccc90'}}>
          <h2>Response</h2>
          <p style={{fontSize:'18px'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et{' '} dolore magna aliqua Lorem ipsum dolor sit amet,{' '} consectetur adipisicing elit Lorem ipsum dolor sit amet,{' '} eiusmod tempor incididunt
          </p>
        </div>


      </div>
      <div className="comparison-box" style={{}}>
        <h1>Reconstructed Span</h1>

      <div className="column updated-prompt">
          <h2>Reconstructed Prompt</h2>
          <p style={{fontSize:'18px'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et{' '}
            <span className="highlight-updated">ipsum dolor sit amet</span>.
            Lorem ipsum dolor sit amet,{' '}
            <span className="highlight-updated">sed do eiusmod tempor</span>.
          </p>
        </div>

        <div className="column updated-response" style={{backgroundColor:'#cccccc90'}}>
          <h2>Response from Reconstructed Prompt</h2>
          <p style={{fontSize:'18px'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et{' '} ipsum dolor sit amet Lorem ipsum dolor sit amet,{' '} sed do eiusmod tempor
          </p>
        </div>

      </div>

      
    </div>
  </div>

  );
};

export default SpanComparison;
