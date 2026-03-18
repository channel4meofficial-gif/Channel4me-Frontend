import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const DoctorsPage: React.FC = () => {
    const doctors = [
        { name: 'Dr. Sudarshan', specialty: 'Cardiologist', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800' },
        { name: 'Dr. Sarah Chen', specialty: 'Neurologist', img: 'https://images.unsplash.com/photo-1594824812376-a3a90ddd6fdf?auto=format&fit=crop&w=800' },
        { name: 'Dr. James Wilson', specialty: 'Pediatrician', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800' }
    ];

    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Our Expert Doctors</h1>
                    <p className="page-subtitle">Highly qualified specialists dedicated to your health</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="doctors-grid">
                        {doctors.map((doc, index) => (
                            <div key={index} className="doctor-card">
                                <img src={doc.img} alt={doc.name} className="doctor-img" />
                                <h3>{doc.name}</h3>
                                <p>{doc.specialty}</p>
                                <button className="book-btn">Book Appointment</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default DoctorsPage;
