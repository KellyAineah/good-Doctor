#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timedelta

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Doctor, Appointment, Prescription

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Clear existing data to avoid duplication
        db.session.query(Prescription).delete()
        db.session.query(Appointment).delete()
        db.session.query(User).delete()
        db.session.query(Doctor).delete()
        db.session.commit()

        # Create users
        users = []
        for _ in range(10):  # Generate 10 users
            user = User(
                name=fake.name(),  # Generate a fake name
                email=fake.unique.email(),  # Generate a unique fake email
                password_hash=fake.password(),  # Generate a fake password
                age=randint(18, 90),  # Random age between 18 and 90
                gender=rc(['Male', 'Female', 'Other']),  # Random gender
                phone_number=fake.phone_number()  # Generate a fake phone number
            )
            users.append(user)
            db.session.add(user)  # Add user to the session

        # Create doctors
        doctors = []
        specialties = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Practice']
        for _ in range(5):  # Generate 5 doctors
            doctor = Doctor(
                name=fake.name(),  # Generate a fake name
                specialty=rc(specialties),  # Randomly select a specialty
                experience_years=randint(1, 40),  # Random experience years between 1 and 40
                availability=rc(['Available', 'Unavailable'])  # Random availability status
            )
            doctors.append(doctor)
            db.session.add(doctor)  # Add doctor to the session

        # Create appointments
        appointments = []
        for _ in range(15):  # Generate 15 appointments
            appointment = Appointment(
                user=rc(users),  # Randomly select a user
                doctor=rc(doctors),  # Randomly select a doctor
                date=fake.date_between(start_date='-1y', end_date='+1y'),  # Random date within the past year and next year
                time=fake.time(),  # Generate a random time
                status=rc(['Scheduled', 'Completed', 'Cancelled'])  # Random status
            )
            appointments.append(appointment)
            db.session.add(appointment)  # Add appointment to the session

        # Create prescriptions
        medicines = ['Aspirin', 'Ibuprofen', 'Paracetamol', 'Metformin', 'Atorvastatin']
        for appointment in appointments:
            if appointment.status == 'Completed':  # Only create prescriptions for completed appointments
                prescription = Prescription(
                    appointment=appointment,  # Link prescription to the appointment
                    medicine=rc(medicines),  # Randomly select a medicine
                    dosage=f'{randint(1, 3)} pills',  # Random dosage between 1 and 3 pills
                    instructions=fake.sentence(nb_words=6)  # Generate random instructions
                )
                db.session.add(prescription)  # Add prescription to the session

        # Commit the changes to the database
        db.session.commit()
        print("Seeding complete!")
