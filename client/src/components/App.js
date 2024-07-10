import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";
import DoctorProfile from "./DoctorProfile"; 
import UserProfile from "./UserProfile";     
import Login from "./Login";                 
import './App.css';



function App() {
  
  return (
    <Router>
      <div className="app-container">
      <Navbar />
      <div className="content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/doctor-profile" component={DoctorProfile} />
        <Route path="/user-profile" component={UserProfile} />
        <Route path="/login" component={Login} />
      </Switch>

      </div>
 
      <Footer />
      </div>
    </Router>
  );
}

export default App;
