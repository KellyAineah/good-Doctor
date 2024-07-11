import React, { useState, useEffect } from "react";

function UserProfile() {
  const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState([]);
  const userId = 1; // Assuming we get the logged-in user's ID somehow

  useEffect(() => {
    // Fetch user details
    fetch(`/users/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error("Error fetching user details:", error));

    // Fetch user's appointments
    fetch(`/appointments/user/${userId}`)
      .then(response => response.json())
      .then(data => setAppointments(data))
      .catch(error => console.error("Error fetching appointments:", error));
  }, [userId]);

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <div className="user-details">
        <h2>Details</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Phone Number:</strong> {user.phone_number}</p>
      </div>
      <div className="appointment-history">
        <h2>Appointment History</h2>
        {appointments.map(appointment => (
          <div key={appointment.id} className="appointment">
            <h3>Appointment with {appointment.doctor.name}</h3>
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

export default UserProfile;
