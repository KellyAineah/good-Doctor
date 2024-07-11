import React, { useState, useEffect } from 'react';
import './Doctor.css';

const DoctorProfile = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/doctors')
            .then(response => response.json())
            .then(data => setDoctors(data))
            .catch(error => console.error('Error fetching doctors:', error));
    }, []);

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
    };

    const handleAppointmentBooking = (event) => {
        event.preventDefault();

        if (!selectedDoctor) {
            alert('Please select a doctor before booking.');
            return;
        }

        const appointmentData = {
            doctor_id: selectedDoctor.id,
            date: appointmentDate,
            time: appointmentTime,
            status: 'Scheduled',
            // Add any additional fields required by your backend
        };

        fetch('http://localhost:5000/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to book appointment');
            }
            return response.json();
        })
        .then(data => {
            console.log('Appointment booked successfully:', data);
            setAppointmentDate('');
            setAppointmentTime('');
            setSelectedDoctor(null);
        })
        .catch(error => {
            console.error('Error booking appointment:', error);
            setError('Failed to book appointment. Please try again.');
        });
    };

    return (
        <div className="doctor-profile-container">
            <h2>Choose a Doctor</h2>
            <div className="doctor-list">
                {doctors.map(doctor => (
                    <div key={doctor.id} className="doctor-card">
                        <h3>{doctor.name}</h3>
                        <p>Specialty: {doctor.specialty}</p>
                        <p>Experience: {doctor.experience_years} years</p>
                        <p>Availability: {doctor.availability}</p>
                        <button onClick={() => handleDoctorSelect(doctor)}>Select Doctor</button>
                    </div>
                ))}
            </div>
            {selectedDoctor && (
                <>
                    <div className="doctor-info">
                        <h2>{selectedDoctor.name}</h2>
                        <p>Specialty: {selectedDoctor.specialty}</p>
                        <p>Experience: {selectedDoctor.experience_years} years</p>
                        <p>Availability: {selectedDoctor.availability}</p>
                    </div>
                    <div className="appointment-scheduler">
                        <h3>Book an Appointment</h3>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <form onSubmit={handleAppointmentBooking}>
                            <label htmlFor="date">Date:</label>
                            <input 
                                type="date" 
                                id="date" 
                                name="date" 
                                value={appointmentDate} 
                                onChange={(e) => setAppointmentDate(e.target.value)} 
                                required 
                            />

                            <label htmlFor="time">Time:</label>
                            <input 
                                type="time" 
                                id="time" 
                                name="time" 
                                value={appointmentTime} 
                                onChange={(e) => setAppointmentTime(e.target.value)} 
                                required 
                            />

                            <button type="submit">Book Appointment</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default DoctorProfile;
