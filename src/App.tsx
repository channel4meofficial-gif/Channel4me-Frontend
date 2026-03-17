import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';

// Auth Pages
import LoginPage from './pages/LoginPage';
import RegistrationType from './pages/register/RegistrationType';

// Platform Pages
import FeaturesPage from './pages/FeaturesPage';
import DoctorsPage from './pages/DoctorsPage';
import SpecialtiesPage from './pages/SpecialtiesPage';
import PricingPage from './pages/PricingPage';

// Company Pages
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import PressPage from './pages/PressPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

// Support Pages
import HelpCenterPage from './pages/HelpCenterPage';
import FaqPage from './pages/FaqPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import CookiePolicyPage from './pages/CookiePolicyPage';

function ScrollToHash() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

    return null;
}

function App() {
    return (
        <BrowserRouter>
            <ScrollToHash />
            <Routes>
                <Route path="/" element={<HomePage />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationType />} />
                
                {/* Platform Routes */}
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/specialties" element={<SpecialtiesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                
                {/* Company Routes */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/press" element={<PressPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
                
                {/* Support Routes */}
                <Route path="/help" element={<HelpCenterPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/cookies" element={<CookiePolicyPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;