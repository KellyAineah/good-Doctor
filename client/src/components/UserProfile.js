import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import './User.css';

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    phone_number: ''
  });

  useEffect(() => {
    if (user) {
      fetch(`/users/${user.id}`, {
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        setFormData(data);
      })
      .catch(error => console.error("Error fetching user details:", error));

    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      setUserData(data);
      setIsEditing(false);
    })
    .catch(error => console.error("Error updating user details:", error));
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="save-button">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
        </form>
      ) : (
        <div className="user-details">
          <h2>Details</h2>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Age:</strong> {userData.age}</p>
          <p><strong>Gender:</strong> {userData.gender}</p>
          <p><strong>Phone Number:</strong> {userData.phone_number}</p>
          <button 
            onClick={handleEditClick}
            className="edit-button"
          >
            Edit Profile
          </button>
        </div>
      )}
      <div className="appointment-history">
        <h2>Appointment History</h2>
        {appointments.map(appointment => (
          <div key={appointment.id} className="appointment">
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

export default UserProfile;
