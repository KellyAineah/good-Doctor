import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";

function App() {
  return <div>
  <Navbar />
  <Home />
 </div>
}

export default App;
