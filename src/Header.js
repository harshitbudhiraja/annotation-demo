import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };

  return (
    <h2
      onClick={handleBack}
      style={{
        alignSelf: 'center',
        cursor: 'pointer',
        fontSize: '24px', 
        fontWeight: '700', 
        color: '#fff',
        width: '100%',
        // marginLeft:'10px',
        backgroundColor: '#707070', 
        padding: '10px 20px', 
        // borderRadius: '5px', 
        margin: '20px 0', 
        textAlign: 'center', 
        textTransform: 'uppercase', 
        letterSpacing: '0px', 
        transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        fontFamily: 'Arial, sans-serif', 
        display: 'inline-block'
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = '#0056b3'; 
        e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = '#707070';
        e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; 
      }}
    >
      Span Reconstruction Demo
    </h2>
  );
};

export default Header;
