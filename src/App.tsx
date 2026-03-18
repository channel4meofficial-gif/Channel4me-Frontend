import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';

// Platform Pages
import FeaturesPage from './pages/FeaturesPage';
import DoctorsPage from './pages/DoctorsPage';

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

// Doctor Dashboard
import DoctorInformation from './pages/doctor/dashboard/DoctorInformation';
import Appointment from './pages/doctor/dashboard/Appointment';
import PatientList from './pages/doctor/dashboard/PatientList';
import PatientDetails from './pages/doctor/dashboard/PatientDetails';

// Chatbot Page
import Chatbot from './pages/chatbot/Chatbot';

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
                
                {/* Platform Routes */}
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                
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

                {/* Doctor Dashboard Flow */}
                <Route path="/doctor/dashboard" element={<DoctorInformation />} />
                <Route path="/doctor/dashboard/appointments" element={<Appointment />} />
                <Route path="/doctor/dashboard/patients" element={<PatientList />} />
                <Route path="/doctor/dashboard/patients/:id" element={<PatientDetails />} />

                {/* Chatbot Route */}
                <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;