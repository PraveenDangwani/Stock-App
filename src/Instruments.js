import React, {useState,useEffect} from 'react'
import axios from "axios"
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";


function Instruments(props) {
    const {setQuote} = props
    const [value, setValue] = useState("");
    
    const [items1, setItems1] = useState([])

    const handleChange = (e) => {
        setValue(e.target.value);
      };

  useEffect(()=>{
    const fetchItems = async() =>{
      const result = await axios('https://prototype.sbulltech.com/api/v2/instruments')
      let res = result.data
      let temp = res.split('\n')
      var i = 0;
      var updatedArray = [];

      temp.forEach(function callbackFn(value, index) {

        if (typeof updatedArray[i] == 'undefined') {
            updatedArray[i] = [];
        }
        updatedArray[i].push(value);      
      });
      


      
      setItems1(updatedArray[0])
    }
    fetchItems()
  },[])
  return (
    <>
    <div className="search-box">
        <h1> Search </h1>
        <input className='input-box' type="text" value={value} onChange={handleChange} />
    </div>
    <div className="container">
        <table>
        <tbody>
        
      {
        items1.filter((item,index)=>{
            
            let newVal = item.split(",")
            
            let name = newVal[0].toLowerCase()
            
            let searchterm = value.toLowerCase();
        
            return (name.startsWith(searchterm) && item !== "")
            
        }).map((i,index)=>{
            
            
          let newVal = i.split(",")
          if(index === 0 ){
            return <tr  key = {index} className="parent">{newVal.map((i,index)=>{
                return <td key = {index} className="col">{i}</td>
            })}</tr>
          }
          return <tr  key = {index} className="parent">{newVal.map((i,index)=>{
            if(index === 0){
              return <td><Link key = {index} to={{pathname:"/Quotes"}} onClick={()=>(setQuote(i))}>{i}</Link></td>
            }
            return <td key = {index} className="col">{i}</td>
        })}
        </tr>
        
        })
      }
      </tbody>
      </table>
      </div>
      </>
  )
}

export default Instruments