import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/check_session', {
      credentials: 'include',  // Include cookies in requests
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return null;
      }
    })
    .then(user => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
