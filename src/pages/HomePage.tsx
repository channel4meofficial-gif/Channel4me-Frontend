// src/pages/HomePage.tsx
import React from 'react';

import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/homepage.css';
import heroImage from '../assets/hero-illustration.png'; 


const HomePage: React.FC = () => {



    // Navigation functions
    const handleBookDemo = () => console.log('Book demo clicked');

    // Quick Actions data
    const quickActions = [
        { icon: 'fas fa-stethoscope', title: 'Symptom Checker', description: 'AI-powered preliminary diagnosis', primary: true },
        { icon: 'fas fa-calendar-check', title: 'Book Doctor', description: 'Instant appointment booking' },
    ];

    // Trust indicators
    const trustIndicators = [
        { icon: 'fas fa-user-md', text: '500+ Verified Doctors' },
        { icon: 'fas fa-shield-alt', text: '100% Secure & Private' },
        { icon: 'fas fa-clock', text: '24/7 Available' },
    ];





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




            </div>
        </PublicLayout>
    );
};

export default HomePage;