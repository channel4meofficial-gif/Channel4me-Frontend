// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/homepage.css';
import heroImage from '../assets/hero-illustration.png';
import doctorImage1 from '../assets/doctor-booking images/Doctorimage1.jpeg';
import doctorImage2 from '../assets/doctor-booking images/Doctorimage2.jpeg';
import doctorImage3 from '../assets/doctor-booking images/Doctorimage3.jpeg';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Navigation functions
    const handleLogin = () => navigate('/login');
    const handleSignUp = () => navigate('/register');
    const handleGetStarted = () => navigate('/register');
    const handleViewAllDoctors = () => navigate('/doctors');  // keep if you still have a dedicated page
    const handleBookDemo = () => console.log('Book demo clicked');

    // Quick Actions data
    const quickActions = [
        { icon: 'fas fa-stethoscope', title: 'Symptom Checker', description: 'AI-powered preliminary diagnosis', primary: true },
        { icon: 'fas fa-calendar-check', title: 'Book Doctor', description: 'Instant appointment booking' },
        { icon: 'fas fa-file-medical', title: 'Health Reports', description: 'Upload & analyze reports' },
    ];

    // Trust indicators
    const trustIndicators = [
        { icon: 'fas fa-user-md', text: '500+ Verified Doctors' },
        { icon: 'fas fa-shield-alt', text: '100% Secure & Private' },
        { icon: 'fas fa-clock', text: '24/7 Available' },
    ];

    // Features data
    const features = [
        { icon: 'fas fa-robot', title: 'AI Doctor Matching', description: 'Our AI analyzes your symptoms and matches you with the perfect specialist in seconds.' },
        { icon: 'fas fa-calendar-alt', title: 'Instant Booking', description: 'Book appointments with verified doctors instantly. No waiting, no hassle.' },
        { icon: 'fas fa-prescription-bottle-alt', title: 'E-Prescriptions', description: 'Digital prescriptions sent directly to your pharmacy. No paper needed.' },
        { icon: 'fas fa-chart-line', title: 'Health Tracking', description: 'Track your health metrics and get personalized insights and recommendations.' },
    ];

    // How It Works steps
    const steps = [
        { number: '01', icon: 'fas fa-search', title: 'Describe Symptoms', description: 'Tell us what you\'re experiencing. Our AI will analyze and suggest the right specialist.' },
        { number: '02', icon: 'fas fa-user-md', title: 'Choose Doctor', description: 'Browse verified doctors, read reviews, and check availability in real-time.' },
        { number: '03', icon: 'fas fa-calendar-check', title: 'Book & Consult', description: 'Book instantly and consult via video, phone, or in-person as per your preference.' },
    ];

    // Specialties data
    const specialties = [
        { icon: 'fas fa-heartbeat', name: 'Cardiology', description: 'Heart specialists' },
        { icon: 'fas fa-brain', name: 'Neurology', description: 'Brain & nerve care' },
        { icon: 'fas fa-lungs', name: 'Pulmonology', description: 'Respiratory health' },
        { icon: 'fas fa-bone', name: 'Orthopedics', description: 'Bones & joints' },
        { icon: 'fas fa-eye', name: 'Ophthalmology', description: 'Eye care' },
        { icon: 'fas fa-tooth', name: 'Dentistry', description: 'Dental care' },
        { icon: 'fas fa-baby', name: 'Pediatrics', description: 'Child healthcare' },
        { icon: 'fas fa-female', name: 'Gynecology', description: 'Women\'s health' },
    ];

    // Doctors data
    const doctors = [
        { name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', rating: 4.8, reviews: 245, availability: 'Today', image: doctorImage1 },
        { name: 'Dr. Michael Chen', specialty: 'Neurologist', rating: 5.0, reviews: 189, availability: 'Today', image: doctorImage2 },
        { name: 'Dr. Priya Sharma', specialty: 'Pediatrician', rating: 5.0, reviews: 312, availability: 'Tomorrow', image: doctorImage3 },
    ];

    // Pricing data (add this section)
    const pricingPlans = [
        { name: 'Free', price: 'LKR 0', features: ['Symptom checker', 'Doctor search', 'Basic health tips'] },
        { name: 'Pro', price: 'LKR 500/mo', features: ['Appointment booking', 'Medical records', 'E‑prescriptions', 'Priority support'] },
        { name: 'Family', price: 'LKR 1200/mo', features: ['Up to 5 members', 'All Pro features', 'Family health dashboard'] },
    ];

    const renderStars = (rating: number) => {
        const stars: JSX.Element[] = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
        }
        if (hasHalfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
        }
        const remaining = 5 - stars.length;
        for (let i = 0; i < remaining; i++) {
            stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
        }
        return stars;
    };

    return (
        <PublicLayout>
            <div className="home-page">
                {/* HERO SECTION */}
                <section className="hero" id="home">
                    <div className="container">
                        <div className="hero-content">
                            <div className="hero-text">
                                <h1 className="hero-title">
                                    <span className="gradient-text">Your Health,</span> Simplified
                                </h1>
                                <h2 className="hero-subtitle">
                                    AI-Powered Doctor Matching & Instant Booking
                                </h2>
                                <p className="hero-description">
                                    Find the perfect specialist, book appointments instantly, and manage your healthcare—all in one intelligent platform.
                                </p>

                                {/* Quick Actions */}
                                <div className="quick-actions">
                                    {quickActions.map((action, index) => (
                                        <div
                                            key={index}
                                            className={`action-card ${action.primary ? 'primary' : ''}`}
                                            onClick={action.title === 'Book Doctor' ? handleViewAllDoctors : undefined}
                                            style={action.title === 'Book Doctor' ? { cursor: 'pointer' } : undefined}
                                        >
                                            <div className="action-icon">
                                                <i className={action.icon}></i>
                                            </div>
                                            <h4>{action.title}</h4>
                                            <p>{action.description}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Buttons */}
                                <div className="hero-cta">
                                    <button className="btn btn-primary btn-lg" onClick={handleGetStarted}>
                                        <i className="fas fa-play-circle"></i> Get Started Free
                                    </button>
                                    <button className="btn btn-outline btn-lg" onClick={handleBookDemo}>
                                        <i className="fas fa-video"></i> Watch Demo
                                    </button>
                                </div>

                                {/* Trust Indicators */}
                                <div className="trust-indicators">
                                    {trustIndicators.map((indicator, index) => (
                                        <div key={index} className="trust-item">
                                            <i className={indicator.icon}></i>
                                            <span>{indicator.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="hero-image">
                                <img src={heroImage} alt="Medical Consultation" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES SECTION */}
                <section className="features" id="features">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">Powerful Features</h2>
                            <p className="section-subtitle">Everything you need for modern healthcare management</p>
                        </div>

                        <div className="features-grid">
                            {features.map((feature, index) => (
                                <div key={index} className="feature-card">
                                    <div className="feature-icon">
                                        <i className={feature.icon}></i>
                                    </div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                    {feature.title === 'Instant Booking' ? (
                                        <button
                                            type="button"
                                            className="feature-link"
                                            onClick={handleViewAllDoctors}
                                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                                        >
                                            Learn More →
                                        </button>
                                    ) : (
                                        <a href="#features" className="feature-link">Learn More →</a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS SECTION */}
                <section className="how-it-works" id="how-it-works">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">How It Works</h2>
                            <p className="section-subtitle">Get medical help in 3 simple steps</p>
                        </div>

                        <div className="steps">
                            {steps.map((step, index) => (
                                <div key={index} className="step">
                                    <div className="step-number">{step.number}</div>
                                    <div className="step-icon">
                                        <i className={step.icon}></i>
                                    </div>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SPECIALTIES SECTION */}
                <section className="specialties" id="specialties">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">Find by Specialties</h2>
                            <p className="section-subtitle">Connect with specialists for your specific health needs</p>
                        </div>

                        <div className="specialties-grid">
                            {specialties.map((specialty, index) => (
                                <div key={index} className="specialty-card">
                                    <div className="specialty-icon">
                                        <i className={specialty.icon}></i>
                                    </div>
                                    <h4>{specialty.name}</h4>
                                    <p>{specialty.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* DOCTORS SECTION */}
                <section className="doctors" id="doctors">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">Featured Doctors</h2>
                            <p className="section-subtitle">Top-rated specialists available now</p>
                        </div>

                        <div className="doctors-grid">
                            {doctors.map((doctor, index) => (
                                <div key={index} className="doctor-card">
                                    <div className="doctor-image">
                                        <img src={doctor.image} alt={doctor.name} />
                                    </div>
                                    <div className="doctor-info">
                                        <h3>{doctor.name}</h3>
                                        <p className="specialty">{doctor.specialty}</p>
                                        <div className="rating">
                                            {renderStars(doctor.rating)}
                                            <span>{doctor.rating} ({doctor.reviews} reviews)</span>
                                        </div>
                                        <p className="availability">
                                            <i className="fas fa-clock"></i> Available {doctor.availability}
                                        </p>
                                        <button className="btn btn-primary btn-sm" onClick={handleViewAllDoctors}>
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <button className="btn btn-outline" onClick={handleViewAllDoctors}>
                                <i className="fas fa-search"></i> View All Doctors
                            </button>
                        </div>
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="cta-section" id="cta">
                    <div className="container">
                        <div className="cta-content">
                            <h2>Ready to Take Control of Your Health?</h2>
                            <p>Join thousands of satisfied patients who found their perfect doctor through Channel4Me</p>
                            <div className="cta-buttons">
                                <button className="btn btn-primary btn-lg" onClick={handleGetStarted}>
                                    <i className="fas fa-play-circle"></i> Get Started Free
                                </button>
                                <button className="btn btn-primary btn-lg" onClick={handleSignUp}>
                                    <i className="fas fa-user-plus"></i> Sign Up Free
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
};

export default HomePage;
