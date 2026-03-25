import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../../styles/header.css';
import logo from '../../../assets/logo.png';
import { useAuth } from '../../../context/AuthContext';

const API_BASE = 'http://localhost:5000';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  // ── Load profile picture ──────────────────────────────────────────────────
  // 1. Read from localStorage immediately (fast, no flicker)
  // 2. Also fetch from the API once so it's always fresh after a login
  useEffect(() => {
    const cached = localStorage.getItem('profilePicture');
    if (cached) setProfilePicUrl(cached);

    if (isAuthenticated) {
      const token = localStorage.getItem('token') || '';
      fetch(`${API_BASE}/api/v1/profiles`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(r => r.json())
        .then(data => {
          if (data.success && data.data?.profilePicture) {
            const url = `${API_BASE}/${data.data.profilePicture}`;
            setProfilePicUrl(url);
            localStorage.setItem('profilePicture', url);
          }
        })
        .catch(() => { /* ignore silently */ });
    } else {
      // Logged out — clear cached picture
      setProfilePicUrl(null);
    }
  }, [isAuthenticated]);

  // ── Listen for picture changes from PatientEditProfile (same tab) ─────────
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'profilePicture') {
        setProfilePicUrl(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navLinks: { label: string; path: string }[] = [];

  const isActive = (path: string) => {
    if (path === '/#home' && location.pathname === '/' && !location.hash) return true;
    if (location.hash === path.replace('/', '')) return true;
    return false;
  };

  // ── Profile icon: real picture if available, generic icon otherwise ───────
  const ProfileIcon = () =>
    profilePicUrl ? (
      <img
        src={profilePicUrl}
        alt="Profile"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid #4f86f7',
          display: 'block',
        }}
        onError={() => setProfilePicUrl(null)}
      />
    ) : (
      <div className="profile-icon-container">
        <i className="fas fa-user-circle"></i>
      </div>
    );

  return (
    <header className="header">
      <div className="container header-container">
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
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    logout();
                    localStorage.removeItem('profilePicture');
                    navigate('/');
                  }}
                  className="btn btn-logout"
                >
                  Log Out
                </button>
                <Link to={`/${user?.role}/dashboard`} className="nav-profile-link" title="Profile">
                  <ProfileIcon />
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-login">Log In</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
              </>
            )}
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
            {isAuthenticated ? (
              <>
                <Link to={`/${user?.role}/dashboard`} className="nav-link profile-mobile-link" onClick={closeMobileMenu}>
                  {profilePicUrl ? (
                    <img
                      src={profilePicUrl}
                      alt="Profile"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        verticalAlign: 'middle',
                        marginRight: 6,
                      }}
                    />
                  ) : (
                    <i className="fas fa-user-circle"></i>
                  )}
                  {' '}Profile
                </Link>
                <button
                  className="btn btn-logout"
                  onClick={() => {
                    logout();
                    localStorage.removeItem('profilePicture');
                    closeMobileMenu();
                    navigate('/');
                  }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-login" onClick={closeMobileMenu}>Log In</Link>
                <Link to="/register" className="btn btn-primary" onClick={closeMobileMenu}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;