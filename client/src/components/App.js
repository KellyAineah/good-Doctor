import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import CardContainer from './CardContainer';
import SmallCardContainer from "./SmallCardContainer";
import Footer from "./Footer";

function App() {
  return <div>
  <Navbar />

  <Home />
  
  <CardContainer />
  <SmallCardContainer />
  <Footer />
 </div>
}

export default App;
