// components/Layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/footer.css';

const Footer = () => {
    const platformLinks = [
        { label: 'Home', path: '/' },
        { label: 'Features', path: '/features' },
        { label: 'Doctors', path: '/doctors' },
        { label: 'Specialties', path: '/specialties' },
        { label: 'Pricing', path: '/pricing' }
    ];

    const companyLinks = [
        { label: 'About Us', path: '/about' },
        { label: 'Careers', path: '/careers' },
        { label: 'Press', path: '/press' },
        { label: 'Blog', path: '/blog' },
        { label: 'Contact', path: '/contact' }
    ];

    const supportLinks = [
        { label: 'Help Center', path: '/help' },
        { label: 'FAQs', path: '/faq' },
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Cookie Policy', path: '/cookies' }
    ];

    const socialLinks = [
        { icon: 'fab fa-facebook-f', link: '#' },
        { icon: 'fab fa-twitter', link: '#' },
        { icon: 'fab fa-instagram', link: '#' },
        { icon: 'fab fa-linkedin-in', link: '#' }
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            <img src="/logo.png" alt="Channel4Me" />
                        </div>
                        <p className="footer-description">
                            AI-powered doctor finding and smart health management platform for modern healthcare.
                        </p>
                        <div className="social-links">
                            {socialLinks.map((social, index) => (
                                <a key={index} href={social.link} target="_blank" rel="noopener noreferrer">
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    <div className="footer-section">
                        <h4>Platform</h4>
                        <ul>
                            {platformLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h4>Company</h4>
                        <ul>
                            {companyLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h4>Support</h4>
                        <ul>
                            {supportLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h4>Contact Us</h4>
                        <div className="contact-info">
                            <p><i className="fas fa-envelope"></i> hello@channel4me.com</p>
                            <p><i className="fas fa-phone"></i> +94 77 289 7544</p>
                            <p><i className="fas fa-map-marker-alt"></i> Colombo, Sri Lanka</p>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Channel4Me. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;