import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import ModelSelector from './components/ModelSelector';
import ClipLoader from "react-spinners/ClipLoader";
import Header from './Header';
import promptData from './prompts.json';


const SpanReview = (props) => {
    const [configValue, setConfigValue] = useState("");
    const [loadingInference, setLoadingInference] = useState(false);
    const [selectedModel, setSelectedModel] = useState(''); // Default model
    const [activeTab, setActiveTab] = useState('review');
    const [selectedText, setSelectedText] = useState("");
    
    const [showspan,setshowspan] = useState([true, true , true])

    const spans_list =[
        { id: 1, text: 'dolore magna aliqua', details: 'Span1 details' },
        { id: 2, text: 'consectetur adipisicing elit', details: 'Span2 details' },
        { id: 3, text: 'eiusmod tempor incididunt', details: 'Span3 details' }
    ]

    const [spans, setSpans] = useState(spans_list);



    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
      };
    
    const RepopulateSpan = () => {
        setshowspan(prevShowspan => 
            prevShowspan.map(() => true )
        );
        setSpans(spans_list)

    };
      function MouseOver(event) {
        // event.target.style.background = 'red';
      }
      function MouseOut(event){
        // event.target.style.background="";
      }

      const handleSave = () =>{
        setActiveTab('review')
        // setConfigValue("")
      }


    const removeSpan = (id) => {
        setshowspan(prevShowspan => 
            prevShowspan.map((item, i) => (i === (id-1) ? false : item))
        );
        setSpans(spans.filter(span => span.id !== id));
    };


    const handleTextSelection = () => {
      const selection = window.getSelection().toString();
      if (selection) {
        setSelectedText(selection);
        console.log("Selected Text:", selection);
      }

      setshowspan([...showspan,true])

    };
  
    return (
    <div style={{display: 'flex', flexDirection:'column'}}>

    <Header/>
    {console.log(promptData['original_prompt'])}
    {loadingInference ? 

        <div style={{ textAlign: "center", marginTop: "50px" }}>
        <ClipLoader size={50} color={"#123abc"} loading={loadingInference} />
        <p>Running inference, please wait...</p>
        </div>

:
    
    <div className="container">
        <div className="tabs">
        <button
            className={activeTab === 'review' ? 'active' : ''}
            onClick={() => setActiveTab('review')}
        >
            Review Text
        </button>
        <button
            className={activeTab === 'config' ? 'active' : ''}
            onClick={() => setActiveTab('config')}
        >
            Configuration
        </button>
        </div>

        {activeTab === 'review' && (
        <div className="content">
        <div style={{display:'flex', flexDirection:'row'}}>
            <div className="text-box">
            <p onMouseUp={handleTextSelection}>

                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et{' '}
                <span className="highlight" style={{color: showspan[0] ? 'red':""}}>
                dolore magna aliqua
                {showspan[0] && <button className="remove-btn" onClick={() => removeSpan(1)} onMouseOver={MouseOver} onMouseOut={MouseOut}>❌</button>}
                </span>.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et{' '}
                <span className="highlight" style={{color: showspan[1] ? 'red':""}}>
                consectetur adipisicing elit
                {showspan[1] && <button className="remove-btn" onClick={() => removeSpan(2)}>❌</button>}
                </span>.
                Lorem ipsum dolor sit amet,{' '}
                <span className="highlight" style={{color: showspan[2] ? 'red':""}}>
                eiusmod tempor incididunt
                {showspan[2] && <button className="remove-btn" onClick={() => removeSpan(3)}>❌</button>}
                </span>.
            </p>
            <button className="beautiful-button" onClick={RepopulateSpan}>Repopulate Spans</button>
            </div>

            <div className="side-panel">
            {spans.map(span => (
                <div key={span.id} className="span-details">
                <p>{span.details}</p>
                <button onClick={() => removeSpan(span.id)}>Remove</button>
                </div>
            ))}
            </div>
        </div>
            <ModelSelector 
                setLoadingInference={setLoadingInference}
            />
        </div>
        )}

    {activeTab === 'config' && (
        <div className="content" style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30vh',
    padding: '20px',
    boxSizing: 'border-box'
}}>
    <p style={{
        fontSize: '18px',
        marginBottom: '10px',
        fontWeight: 'bold',
        color: '#333'
    }}>
        Configuration options...
    </p>
    <input
        type="text"
        value={configValue}
        onChange={(e) => setConfigValue(e.target.value)}
        placeholder="Enter configuration value"
        style={{
            width: '100%',
            maxWidth: '400px',
            padding: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            outline: 'none'
        }}
    />
    <button className='beautiful-button' onClick={handleSave}>Save</button>
    </div>
    )}
    </div>

  

}
</div>

)};

export default SpanReview;
