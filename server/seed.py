#!/usr/bin/env python3

# Standard library imports
from datetime import datetime

# Local imports
from app import app, db
from models import User, Doctor, Appointment, Prescription


with app.app_context():
    # Drop existing tables
    db.drop_all()
    # Create tables
    db.create_all()

    # Clear session
    db.session.remove()

    # Create some users with dummy passwords
    user1 = User(
        name='Alice Johnson',
        email='alice@example.com',
        password_hash='password1',
        age=29,
        gender='Female',
        phone_number='555-1234'
    )
    user2 = User(
        name='Bob Smith',
        email='bob@example.com',
        password_hash='password2',
        age=45,
        gender='Male',
        phone_number='555-5678'
    )

    # Create some doctors
    doctor1 = Doctor(
        name='Dr. Smith',
        specialty='Cardiology',
        experience_years=15,
        availability='Available'
    )
    doctor2 = Doctor(
        name='Dr. Johnson',
        specialty='Neurology',
        experience_years=20,
        availability='Unavailable'
    )

    # Create some appointments
    appointment1 = Appointment(
        user=user1,
        doctor=doctor1,
        date=datetime(2023, 7, 9).date(),
        time=datetime(2023, 7, 9, 10, 0).time(),
        status='Scheduled'
    )
    appointment2 = Appointment(
        user=user2,
        doctor=doctor2,
        date=datetime(2023, 7, 10).date(),
        time=datetime(2023, 7, 10, 11, 0).time(),
        status='Scheduled'
    )

    # Create some prescriptions
    prescription1 = Prescription(
        appointment=appointment1,
        medicine='Aspirin',
        dosage='1 pill',
        instructions='Take one pill after meal'
    )
    prescription2 = Prescription(
        appointment=appointment2,
        medicine='Ibuprofen',
        dosage='2 pills',
        instructions='Take two pills daily'
    )

    # Add the records to the session and commit them to the database
    db.session.add_all([user1, user2, doctor1, doctor2, appointment1, appointment2, prescription1, prescription2])
    db.session.commit()

    print("Database seeded!")
