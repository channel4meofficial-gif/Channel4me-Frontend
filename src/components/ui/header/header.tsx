import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../../styles/header.css';
import logo from '../../../assets/logo.png';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Navigation links – adjust paths as needed (hash links for homepage sections)
  const navLinks = [
    { label: 'Home', path: '/#home' },
    { label: 'Features', path: '/#features' },
    { label: 'Doctors', path: '/#doctors' },
    { label: 'Specialties', path: '/#specialties' },
  ];

  // Check if a link is active (for highlighting)
  const isActive = (path: string) => {
    if (path === '/#home' && location.pathname === '/' && !location.hash) return true;
    if (location.hash === path.replace('/', '')) return true;
    return false;
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <img src={logo} alt="Channel4Me" />
          </Link>

          {/* Desktop Navigation */}
          <ul className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.path}
                  className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Action Buttons */}
          <div className="nav-buttons">
            <Link to="/login" className="btn btn-login">Log In</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Mobile Menu Overlay */}
          <div
            className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={closeMobileMenu}
          />
        </nav>

        {/* Mobile Action Buttons (appear when menu is open) */}
        {isMobileMenuOpen && (
          <div className="nav-buttons-mobile">
            <Link to="/login" className="btn btn-login" onClick={closeMobileMenu}>Log In</Link>
            <Link to="/register" className="btn btn-primary" onClick={closeMobileMenu}>Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;