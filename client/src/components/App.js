import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";
import DoctorProfile from "./DoctorProfile"; 
import UserProfile from "./UserProfile";     
import Login from "./Login"; 
import Signup from "./SignUp";
import './App.css';
import { AuthProvider } from './AuthContext';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/check_session', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          setIsAuth(true);
        }
      })
      .catch(() => {
        setIsAuth(false);
      });
    }
  }, []);

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (response.status === 204) {
        localStorage.removeItem('token');
        setIsAuth(false);
      }
    });
  };

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuth ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar isAuth={isAuth} onLogout={handleLogout} />
          <div className="content">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" render={(props) => <Login {...props} setAuth={setIsAuth} />} />
              <Route path="/signup" component={Signup} />
              <ProtectedRoute path="/doctor-profile" component={DoctorProfile} />
              <ProtectedRoute path="/user-profile" component={UserProfile} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
