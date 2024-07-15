import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from './AuthContext';
import './DoctorProfile.css';

const DoctorProfile = () => {
    const { user } = useContext(AuthContext);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [error, setError] = useState('');
    const [bookedAppointment, setBookedAppointment] = useState(null);
    const [specialtyFilter, setSpecialtyFilter] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = () => {
        fetch('http://localhost:5000/doctors')
            .then(response => response.json())
            .then(data => {
                setDoctors(data);
                setFilteredDoctors(data);
            })
            .catch(error => console.error('Error fetching doctors:', error));
    };

    useEffect(() => {
        filterDoctors();
    }, [specialtyFilter, searchTerm, doctors]);

    const filterDoctors = () => {
        if (!specialtyFilter) {
            setFilteredDoctors(doctors.filter(doctor =>
                doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        } else {
            setFilteredDoctors(doctors.filter(doctor =>
                (doctor.specialty === specialtyFilter) &&
                (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
            ));
        }
    };

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleAppointmentBooking = (event) => {
        event.preventDefault();

        if (!selectedDoctor) {
            alert('Please select a doctor before booking.');
            return;
        }

        const appointmentData = {
            doctor_id: selectedDoctor.id,
            user_id: user.id,
            date: appointmentDate,
            time: appointmentTime,
            status: 'Scheduled',
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
                setBookedAppointment(data);
                setAppointmentDate('');
                setAppointmentTime('');
                setSelectedDoctor(null);
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error('Error booking appointment:', error);
                setError('Failed to book appointment. Please try again.');
            });
    };

    const handleFilterChange = (specialty) => {
        if (specialty === specialtyFilter) {
            setSpecialtyFilter('');
        } else {
            setSpecialtyFilter(specialty);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="doctor-profile-container">
            <h2>Choose a Doctor</h2>
            <div className="filter-buttons">
                <button className={specialtyFilter === '' ? 'active' : ''} onClick={() => handleFilterChange('')}>All</button>
                <button className={specialtyFilter === 'Cardiology' ? 'active' : ''} onClick={() => handleFilterChange('Cardiology')}>Cardiology</button>
                <button className={specialtyFilter === 'Neurology' ? 'active' : ''} onClick={() => handleFilterChange('Neurology')}>Neurology</button>
                <button className={specialtyFilter === 'Orthopedics' ? 'active' : ''} onClick={() => handleFilterChange('Orthopedics')}>Orthopedics</button>
                <button className={specialtyFilter === 'Pediatrics' ? 'active' : ''} onClick={() => handleFilterChange('Pediatrics')}>Pediatrics</button>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name or specialty..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="doctor-list">
                {filteredDoctors.map(doctor => (
                    <div key={doctor.id} className="doctor-card">
                        <FontAwesomeIcon icon={faUserMd} className="doctor-icon" />
                        <div className="doctor-info">
                            <h3>{doctor.name}</h3>
                            <p>Specialty: {doctor.specialty}</p>
                            <p>Experience: {doctor.experience_years} years</p>
                            <p>Availability: {doctor.availability}</p>
                            <button onClick={() => handleDoctorSelect(doctor)}>Book Appointment</button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedDoctor && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="doctor-info">
                            <h2>{selectedDoctor.name}</h2>
                            <p>Specialty: {selectedDoctor.specialty}</p>
                            <p>Experience: {selectedDoctor.experience_years} years</p>
                            <p>Availability: {selectedDoctor.availability}</p>
                        </div>
                        <div className="appointment-scheduler">
                            <h3>Book an Appointment</h3>
                            {error && <p className="error-message">{error}</p>}
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
                        <button className="close-modal" onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorProfile;
