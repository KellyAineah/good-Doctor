from sqlalchemy_serializer import SerializerMixin # type: ignore    

from config import db # Imports the database configuration from a separate config file

# Define the User model
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'  # Specifies the table name
    id = db.Column(db.Integer, primary_key=True)  # Primary key column
    name = db.Column(db.String, nullable=False)  # Name column, cannot be null
    email = db.Column(db.String, unique=True, nullable=False)  # Email column, must be unique and cannot be null
    password_hash = db.Column(db.String, nullable=False)  # Password hash column, cannot be null
    age = db.Column(db.Integer, nullable=False)  # Age column, cannot be null
    gender = db.Column(db.String, nullable=False)  # Gender column, cannot be null
    phone_number = db.Column(db.String, nullable=False)  # Phone number column, cannot be null

    appointments = db.relationship('Appointment', back_populates='user', cascade='all, delete-orphan')  # Establishes a relationship with the Appointment model

# Define the Doctor model
class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'  # Specifies the table name
    id = db.Column(db.Integer, primary_key=True)  # Primary key column
    name = db.Column(db.String, nullable=False)  # Name column, cannot be null
    specialty = db.Column(db.String, nullable=False)  # Specialty column, cannot be null
    experience_years = db.Column(db.Integer, nullable=False)  # Experience years column, cannot be null
    availability = db.Column(db.String, nullable=False)  # Availability column, cannot be null

    appointments = db.relationship('Appointment', back_populates='doctor', cascade='all, delete-orphan')  # Establishes a relationship with the Appointment model

# Define the Appointment model
class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'  # Specifies the table name
    id = db.Column(db.Integer, primary_key=True)  # Primary key column
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key column linking to the User model, cannot be null
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), nullable=False)  # Foreign key column linking to the Doctor model, cannot be null
    date = db.Column(db.Date, nullable=False)  # Date column, cannot be null
    time = db.Column(db.Time, nullable=False)  # Time column, cannot be null
    status = db.Column(db.String, nullable=False)  # Status column, cannot be null

    user = db.relationship('User', back_populates='appointments')  # Relationship to the User model
    doctor = db.relationship('Doctor', back_populates='appointments')  # Relationship to the Doctor model
    prescriptions = db.relationship('Prescription', back_populates='appointment', cascade='all, delete-orphan')  # Establishes a relationship with the Prescription model

# Define the Prescription model
class Prescription(db.Model, SerializerMixin):
    __tablename__ = 'prescriptions'  # Specifies the table name
    id = db.Column(db.Integer, primary_key=True)  # Primary key column
    appointment_id = db.Column(db.Integer, db.ForeignKey('appointments.id'), nullable=False)  # Foreign key column linking to the Appointment model, cannot be null
    medicine = db.Column(db.String, nullable=False)  # Medicine column, cannot be null
    dosage = db.Column(db.String, nullable=False)  # Dosage column, cannot be null
    instructions = db.Column(db.String, nullable=False)  # Instructions column, cannot be null

    appointment = db.relationship('Appointment', back_populates='prescriptions')  # Relationship to the Appointment model
