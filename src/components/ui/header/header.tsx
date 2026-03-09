import React from 'react';
import { Link } from 'react-router-dom';

// simple header placeholder; add styles via global CSS or layout stylesheet
const Header: React.FC = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">Channel4Me</Link>
                </div>
                <ul className="nav-menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/features">Features</Link></li>
                    <li><Link to="/doctors">Doctors</Link></li>
                    <li><Link to="/specialties">Specialties</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
