import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";


function Appointment() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/appointments/user/${user.id}`, {
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => setAppointments(data))
      .catch(error => console.error("Error fetching appointments:", error));
    }
  }, [user]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="appointments">
      <h1>Your Appointments</h1>
      <div className="appointment-list">
        {appointments.map(appointment => (
          <div key={appointment.id} className="appointment-card">
            <h3>Appointment with Dr. {appointment.doctor.name}</h3>
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>Status:</strong> {appointment.status}</p>
            <div className="prescriptions">
              <h4>Prescriptions:</h4>
              {appointment.prescriptions.map(prescription => (
                <div key={prescription.id} className="prescription">
                  <p><strong>Medicine:</strong> {prescription.medicine}</p>
                  <p><strong>Dosage:</strong> {prescription.dosage}</p>
                  <p><strong>Instructions:</strong> {prescription.instructions}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appointment;
