import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const ContactPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Contact Us</h1>
                    <p className="page-subtitle">We're here to help with any questions or feedback</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <h3>Get in Touch</h3>
                            <p><i className="fas fa-envelope"></i> support@channel4me.com</p>
                            <p><i className="fas fa-phone"></i> +1 (555) 123-4567</p>
                            <p><i className="fas fa-map-marker-alt"></i> 123 Health Ave, Silicon Valley, CA</p>
                        </div>
                        <div className="contact-form">
                            <input type="text" placeholder="Your Name" className="form-input" />
                            <input type="email" placeholder="Your Email" className="form-input" />
                            <textarea placeholder="Your Message" className="form-textarea"></textarea>
                            <button className="submit-btn">Send Message</button>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default ContactPage;
