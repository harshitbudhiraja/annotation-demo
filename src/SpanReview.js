import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import ModelSelector from './components/ModelSelector';
import ClipLoader from "react-spinners/ClipLoader";
import Header from './Header';
import promptData from './prompts.json';

const SpanReview = (props) => {
    const PROMPT_EXAMPLE= "In the quaint village of Suryapur, the bustling haat is alive with the chatter of local farmers selling fresh produce. Elderly villagers discuss the latest bhajan while children play with traditional kites during the Makar Sankranti festival. The aroma of freshly made rotis and pickles fills the air as people gather around to share tales of folk heroes. The local panchayat deliberates on community issues, reflecting the essence of rural life that contrasts sharply with the urban hustle of cities like Mumbai or Delhi, where towering skyscrapers and the fast-paced life of corporate offices dominate daily routines"
    const [configValue, setConfigValue] = useState("");
    const [loadingInference, setLoadingInference] = useState(false);
    const [activeTab, setActiveTab] = useState('review');
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [familiarityDrawer, setFamiliarityDrawer] = useState(false);
    const [startIndex,setStartIndex] = useState(null);
    const [endIndex,setEndIndex] = useState(null);
    const [familiarityLevel,setFamiliarityLevel] = useState([false,false,false,false]);
    

    const initial_pairs = [[1,4,1]]
    const bg_color = ['#8cd48c','#8cc9d4','#d4c88c','#f26d1b']

    const [spanPairs, setSpanPairs] = useState(initial_pairs);

    useEffect(() => {
      if(spanPairs.length > 0) {
        sort_spans()

      }
        // for (let i = 0; i < spanPairs.length; i++) {
        //   console.log(spanPairs[i][0], spanPairs[i][1],":::",PROMPT_EXAMPLE.slice(spanPairs[i][0], spanPairs[i][1]))
        // }

    }, [spanPairs]); 

    const valid_selection = (start,end) => {

      for(let i = 0; i < spanPairs.length; i++) {

        const current_start = spanPairs[i][0];
        const current_end = spanPairs[i][1];


        if(start < current_start && end > current_start) {
          return false;
        }
        else if(start > current_start && start < current_end) {
          // console.log("returning false 2")
          return false;
        }
        else if (start <= current_start && end >= current_end){
          // console.log("returning false 3")
          return false;
        }       
    }

    return true;
  }

    const addSpanPairs = (si,ei,familiarity) => {
      // console.log(si,ei,familiarity)

      if(valid_selection(si,ei)){

          setSpanPairs(prevState => [...prevState, [si,ei, familiarity]]);
      }else{
        // #TODO: display message for invalid selection
        console.log("Invalid selection")
      }
    }
    const handleClose = () => {
      setFamiliarityDrawer(false);
    }
    
    const sort_spans = () => {
      const sortedSpanPairs = [...spanPairs].sort((a, b) => a[0] - b[0]);
  
      if (JSON.stringify(spanPairs) !== JSON.stringify(sortedSpanPairs)) {
        setSpanPairs(sortedSpanPairs);
      }
    }

    const buttonStyle = {
      padding: "8px 12px",
      border: "1px solid #ccc",
      borderRadius: "5px","marginLeft":'10px',"marginRight":'10px',"cursor":'pointer',
      fontSize:'12px',
      backgroundColor: "#f9f9f9",
      textAlign: "left",
    };

    const handleSelectedTextButton = (familiarity) => {
      // setFamiliarityLevel(familiarity)

      if (startIndex != null && endIndex != null && familiarity != 0){
        // console.log("adding span:  ",startIndex, endIndex)
        addSpanPairs(startIndex,endIndex,familiarity)
        setStartIndex(null);
        setEndIndex(null);
        setFamiliarityLevel(0);
  
      }

      setFamiliarityDrawer(false)

      
    }
    
    const handleTextSelection = () => {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      if (selection.toString()) {
        setPopupPosition({
          top: rect.top + window.scrollY + 25,
          left: rect.left + window.scrollX + 50,
      });
      setStartIndex(range.startOffset);
      setEndIndex(range.endOffset);

      // setFamiliarityDrawer(true)
      }

    };

    const handleAnnotate = () => {
      console.log("level")

    }
    
    const RepopulateSpan = () => {
      setSpanPairs(initial_pairs)

    };

    const handleSave = () =>{
      setActiveTab('review')
    }

    const RenderHighlightedText = () => {
      const highlightedText = process_prompt();
      return (
          <div id="panel"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
      );
  };

    const process_prompt = useCallback(() => {
        let highlightedText = "";
        const text = PROMPT_EXAMPLE
        let lastIndex = 0;
    
        spanPairs?.forEach(([start, end,familiarity], index) => {
          
        if (lastIndex < start) {
          const x = `<span>${text.slice(lastIndex, start)}</span>`
          highlightedText += x
        }
          
        const y = `<span style="backgroundColor:${bg_color[familiarity-1]};">${text.slice(start, end)}</span>`
        highlightedText += y

        
        lastIndex = end;
          
        });     
         
        if (lastIndex < text.length) {
          const z = `<span>${text.slice(lastIndex)}</span>`
          highlightedText += z

        }
      
        return highlightedText;
      },[spanPairs]);
      
  
    return (
    <div style={{display: 'flex', flexDirection:'column'}}>

    <Header/>
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
            disabled={true}
            style={{cursor:'not-allowed'}}
        >
            Configuration
        </button>
        <div style={{marginLeft:'20px'}}>
          <button className='annotate-btn' style={{backgroundColor:bg_color[1]}}>Familiar</button>
          <button className='annotate-btn' style={{backgroundColor:bg_color[0]}} disabled={familiarityLevel[1]}>Partially F</button>
          <button className='annotate-btn' style={{backgroundColor:bg_color[2]}} disabled={familiarityLevel[2]}>Ambigous</button>
          <button className='annotate-btn' style={{backgroundColor:bg_color[3]}} disabled={familiarityLevel[3]}>Unfamiliar</button>
        </div>
        </div>

        {activeTab === 'review' &&
        (

        <div className="content">
        <div style={{display:'flex', flexDirection:'row'}}>
        <div className="text-box">
        <text onMouseUp={handleTextSelection} style={{fontSize:'24px', lineHeight:'40px', wordSpacing:'13px'}}>

      <div id = "panel">
      {<RenderHighlightedText/>} 
      </div>
            </text>
            <button className="beautiful-button" onClick={RepopulateSpan} >Repopulate Spans</button>
            </div>

            <div className="side-panel">
            {/* {spans.map(span => (
                <div key={span.id} className="span-details">
                <p>{span.details}</p>
                <button onClick={() => removeSpan(span.id)} >Remove</button>
                </div>
            ))} */}
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
