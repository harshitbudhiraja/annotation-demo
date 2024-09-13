import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ModelSelector = ({setLoadingInference})=>{
    
    const [selectedModel, setSelectedModel] = useState("");
    const [modelResponse, setModelResponse] = useState('');
    const navigate = useNavigate();

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    };

    const moveToComparison = () => {
        navigate('/comparison');
      };
    
    const handleSubmit = async () => {
        try {

        //   const response = await fetch('https://api.example.com/infer', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ model: selectedModel, prompt }),
        //   });
        //   const data = await response.json();
        //   setModelResponse(data.result);
        setLoadingInference(true);
        
        setTimeout(() => {
            setLoadingInference(false);
            moveToComparison()
          }, 1000);
          
      
        } catch (error) {
          console.error('Error submitting prompt:', error);
        }


      };

    return(
        <div className="model-input" style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9', width: '600px', margin: 'auto', marginTop:'50px'}}>
            <h3 style={{fontSize: '22px',color: '#333'}}>
                Model Selection
            </h3>
            
            <select 
                value={selectedModel} 
                onChange={handleModelChange} 
                style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    marginBottom: '20px'
                }}
            >
                <option value="LLaMA 3.1 ">LLaMA 3.1</option>
                <option value="Mixtral ">Mixtral</option>
                <option value="GPT4o">GPT4o</option>
                {/* Add more models as needed */}
            </select>

            
            <button onClick={handleSubmit} style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s'}}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
                Submit Prompt
            </button>

        </div>
    )}

export default ModelSelector;