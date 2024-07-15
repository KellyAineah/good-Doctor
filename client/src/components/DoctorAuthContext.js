import React, { createContext, useState, useEffect } from 'react';

export const DoctorAuthContext = createContext();

export const DoctorAuthProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetch('/check_doctor_session', {
      credentials: 'include',
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return null;
      }
    })
    .then(doctor => {
      if (doctor) {
        setDoctor(doctor);
      }
    });
  }, []);

  const login = (doctorData) => {
    setDoctor(doctorData);
  };

  const logout = () => {
    setDoctor(null);
  };

  return (
    <DoctorAuthContext.Provider value={{ doctor, login, logout }}>
      {children}
    </DoctorAuthContext.Provider>
  );
};
