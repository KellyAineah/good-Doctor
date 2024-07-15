import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';


const DoctorAppointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/appointments/doctor/${user.id}`, {
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => setAppointments(data))
        .catch((error) => console.error('Error fetching appointments:', error));
    }
  }, [user]);

  return (
    <div className="doctor-appointments">
      <h1>Appointments</h1>
      <div className="appointment-list">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <h3>Appointment with {appointment.user.name}</h3>
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>Status:</strong> {appointment.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
