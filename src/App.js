
import React, {  useState } from "react";
import './App.css';
import Quotes from "./Quotes";
// import { Route, Switch, useLocation,Link } from "wouter"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Instruments from "./Instruments";



function App() {

const [quote, setQuote] = useState()

  return(
    <>
    <h1>Stock App</h1>
    <Routes>
          <Route path="Quotes" element={<Quotes quote={quote}  />} />
          <Route path="/" element={<Instruments setQuote={setQuote} />} />
          
      </Routes>
    </>
  );
}

export default App;
