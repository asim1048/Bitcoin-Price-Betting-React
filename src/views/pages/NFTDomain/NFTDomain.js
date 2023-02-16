import React, { useState } from 'react';
import Auction from './Auction';

const data = ['apple', 'banana', 'cherry', 'date', 'elderberry','Auction',"Bidding"];
const fruits = [
    { name: 'Apple', url: 'https://via.placeholder.com/100x100' },
    { name: 'Banana', url: 'https://via.placeholder.com/100x100' },
    { name: 'Cherry', url: 'https://via.placeholder.com/100x100' },
    { name: 'Date', url: 'https://via.placeholder.com/100x100' },
    { name: 'Elderberry', url: 'https://via.placeholder.com/100x100' }
  ];

const NFTDomain = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkboxColor, setCheckboxColor] = useState('red');
  
  const [exist, setExist] = useState(false);
  
  const [len, setLen] = useState(false);
  
  const [url, setUrl] = useState('https://images.app.goo.gl/RwQ4YFT2CCENspHp8');
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (data.includes(e.target.value)) {
      setCheckboxColor('green');
      setExist(true);
      setLen(e.target.value.length);
    } else {
      setCheckboxColor('red');
      setExist(false);
    }
  };

  return (
    <div>    
        <div style={{display:"flex",}}>
      <input
        type="text"
        placeholder="Enter a Domain"
        value={searchTerm}
        onChange={handleSearch}
        style={{display:"flex",width:'400px', background:'black', color:'wheat',height:40, fontSize:18,borderColor:'white',borderWidth:1,borderRadius:10,paddingInline:10,}}
      />
      <div style={{ backgroundColor: checkboxColor, width: 30, height: 30,marginLeft:'20px', borderRadius:15,marginTop:5, }} />
      
    </div>
    {exist  && (

        <div style={{marginTop:10,}}>
            
            <p style={{fontSize:15,color:'white'}}>Domain......Name</p>
            <div style={{marginTop:20,display:"flex"}}>
                <img 
                src="https://www.shutterstock.com/image-illustration/domain-names-internet-web-telecommunication-260nw-1708219261.jpg"
                style={{height:200,width:200}}
                alt="img"
                />
                <img 
                src="https://www.shutterstock.com/image-illustration/domain-names-internet-web-telecommunication-260nw-1708219261.jpg"
                style={{height:200,width:200, marginLeft:30}}
                alt="img"
                />
                <img 
                src="https://www.shutterstock.com/image-illustration/domain-names-internet-web-telecommunication-260nw-1708219261.jpg"
                style={{height:200,width:200,marginLeft:30,}}
                alt="img"
                />
            </div>
        </div>
    )}
    {(!exist && len>3)  && (
        <div style={{marginTop:10,}}>
            <p style={{fontSize:15,color:'red'}}>Domain Name Found Found</p>
        </div>
    )}
    </div>

  );
};

export default NFTDomain;