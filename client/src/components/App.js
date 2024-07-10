import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import CardContainer from './CardContainer';
import SmallCardContainer from "./SmallCardContainer";

function App() {
  return <div>
  <Navbar />

  <Home />
  
  <CardContainer />
  <SmallCardContainer />
 </div>
}

export default App;
