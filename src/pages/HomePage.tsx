// src/pages/HomePage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicLayout from "../components/layout/PublicLayout/publiclayout";
import "../styles/homepage.css";
import heroImage from "../assets/hero-illustration.png";
import doctorImage1 from "../assets/doctor-booking images/Doctorimage1.jpeg";
import doctorImage2 from "../assets/doctor-booking images/Doctorimage2.jpeg";
import doctorImage3 from "../assets/doctor-booking images/Doctorimage3.jpeg";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation functions
  const handleLogin = () => navigate("/login");
  const handleSignUp = () => navigate("/register");
  const handleGetStarted = () => navigate("/register");
  const handleViewAllDoctors = () => navigate("/doctor-booking/doctors");
  const handleBookDemo = () => console.log("Book demo clicked");

  // Quick Actions data
  const quickActions = [
    {
      icon: "fas fa-stethoscope",
      title: "Symptom Checker",
      description: "AI-powered preliminary diagnosis",
      primary: true,
    },
    {
      icon: "fas fa-calendar-check",
      title: "Book Doctor",
      description: "Instant appointment booking",
    },
    {
      icon: "fas fa-file-medical",
      title: "Health Reports",
      description: "Upload & analyze reports",
    },
  ];

  // Trust indicators
  const trustIndicators = [
    { icon: "fas fa-user-md", text: "500+ Verified Doctors" },
    { icon: "fas fa-shield-alt", text: "100% Secure & Private" },
    { icon: "fas fa-clock", text: "24/7 Available" },
  ];

  // Features data
  const features = [
    {
      icon: "fas fa-robot",
      title: "AI Doctor Matching",
      description:
        "Our AI analyzes your symptoms and matches you with the perfect specialist in seconds.",
    },
    {
      icon: "fas fa-calendar-alt",
      title: "Instant Booking",
      description:
        "Book appointments with verified doctors instantly. No waiting, no hassle.",
    },
    {
      icon: "fas fa-prescription-bottle-alt",
      title: "E-Prescriptions",
      description:
        "Digital prescriptions sent directly to your pharmacy. No paper needed.",
    },
    {
      icon: "fas fa-chart-line",
      title: "Health Tracking",
      description:
        "Track your health metrics and get personalized insights and recommendations.",
    },
  ];

  // How It Works steps
  const steps = [
    {
      number: "01",
      icon: "fas fa-search",
      title: "Describe Symptoms",
      description:
        "Tell us what you're experiencing. Our AI will analyze and suggest the right specialist.",
    },
    {
      number: "02",
      icon: "fas fa-user-md",
      title: "Choose Doctor",
      description:
        "Browse verified doctors, read reviews, and check availability in real-time.",
    },
    {
      number: "03",
      icon: "fas fa-calendar-check",
      title: "Book & Consult",
      description:
        "Book instantly and consult via video, phone, or in-person as per your preference.",
    },
  ];

  // Specialties data
  const specialties = [
    {
      icon: "fas fa-heartbeat",
      name: "Cardiology",
      description: "Heart specialists",
    },
    {
      icon: "fas fa-brain",
      name: "Neurology",
      description: "Brain & nerve care",
    },
    {
      icon: "fas fa-lungs",
      name: "Pulmonology",
      description: "Respiratory health",
    },
    { icon: "fas fa-bone", name: "Orthopedics", description: "Bones & joints" },
    { icon: "fas fa-eye", name: "Ophthalmology", description: "Eye care" },
    { icon: "fas fa-tooth", name: "Dentistry", description: "Dental care" },
    {
      icon: "fas fa-baby",
      name: "Pediatrics",
      description: "Child healthcare",
    },
    {
      icon: "fas fa-female",
      name: "Gynecology",
      description: "Women's health",
    },
  ];

  // Doctors data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.8,
      reviews: 245,
      availability: "Today",
      image: doctorImage1,
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      rating: 5.0,
      reviews: 189,
      availability: "Today",
      image: doctorImage2,
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialty: "Pediatrician",
      rating: 5.0,
      reviews: 312,
      availability: "Tomorrow",
      image: doctorImage3,
    },
  ];

  // Pricing data (add this section)
  const pricingPlans = [
    {
      name: "Free",
      price: "LKR 0",
      features: ["Symptom checker", "Doctor search", "Basic health tips"],
    },
    {
      name: "Pro",
      price: "LKR 500/mo",
      features: [
        "Appointment booking",
        "Medical records",
        "E-prescriptions",
        "Priority support",
      ],
    },
    {
      name: "Family",
      price: "LKR 1200/mo",
      features: [
        "Up to 5 members",
        "All Pro features",
        "Family health dashboard",
      ],
    },
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
                  Find the perfect specialist, book appointments instantly, and
                  manage your healthcare—all in one intelligent platform.
                </p>

                {/* Quick Actions */}
                <div className="quick-actions">
                  <button
                    onClick={() => navigate("/chatbot")}
                    className={`action-card ${"primary"}`}
                    type="button"
                  >
                    <div className="action-icon">
                      <i className="fas fa-stethoscope"></i>
                    </div>
                    <h4>Symptom Checker</h4>
                    <p>AI-powered preliminary diagnosis</p>
                  </button>

                  <button
                    onClick={() => navigate("/doctor-booking/doctors")}
                    className={`action-card ${"primary"}`}
                    type="button"
                  >
                    <div className="action-icon">
                      <i className="fas fa-calendar-check"></i>
                    </div>
                    <h4>Book Doctor</h4>
                    <p>Instant appointment booking</p>
                  </button>

                </div>

                {/* CTA Buttons */}
                <div className="hero-cta">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleGetStarted}
                  >
                    <i className="fas fa-play-circle"></i> Get Started Free
                  </button>
                  <button
                    className="btn btn-outline btn-lg"
                    onClick={handleBookDemo}
                  >
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
