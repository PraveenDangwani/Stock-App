import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './App.css';


function Quotes(props) {
    const {quote} = props
    const [quoteValue, setQuoteValue] = useState([])
    const [refreshTime, setRefreshTime] = useState(0)
    useEffect(()=>{
        if(quote){
        let symbol = quote
        const fetchQuotes = async()=>{
            const response = await axios(`https://prototype.sbulltech.com/api/v2/quotes/${quote}`)
            let res = response.data
            if(symbol){
                let symVal = res.payload
                setQuoteValue(symVal[symbol])
            }
            
        }
        fetchQuotes()
    }
    },[])

useEffect(()=>{
    let sortedVal = quoteValue.sort((a, b) => new Date(a.time) - new Date(b.time))
    let lastVal = sortedVal.filter((f,index)=>{
        if(index === sortedVal.length-1){
            return f
        }  
    })
    if(lastVal[0]){
        const date1 = new Date(lastVal[0].time);
        const date2 = new Date(lastVal[0].valid_till);
        var diffTime = Math.abs(date2 - date1);
        setRefreshTime(diffTime)
    }
    
},[quoteValue])

useEffect(()=>{
    if(refreshTime){
        setTimeout(()=>{
            let symbol = quote
            const fetchQuotes = async()=>{
            const response = await axios(`https://prototype.sbulltech.com/api/v2/quotes/${quote}`)
            let res = response.data
            if(symbol){
                let symVal = res.payload
                setQuoteValue(symVal[symbol])
            }
            
        }
        fetchQuotes()
        },[refreshTime])
    }

},[refreshTime])
  return (
    <>
    <h1>{quote} </h1>
    <table>
        <tbody>
            <tr>
                <th> Price</th>
                <th> Time</th>
                <th> Valid till</th>
            </tr>
            {quoteValue.sort((a, b) => new Date(a.time) - new Date(b.time)).map((i,index)=>{
            var result = Object.keys(i).map((key) => [key, i[key]])
            return <tr key={index}>{result.map((i,index,)=>{
                return <td key={index}> {i[1]} </td>
            })
            }</tr>
        
            })}
        </tbody>
    </table>
    </>
  )
}

export default Quotes