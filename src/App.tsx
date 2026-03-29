import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Core Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/sign-in/LoginPage';
import RegistrationType from './pages/RegistrationType';
import PlaceholderPage from './pages/PlaceholderPage';

// Platform Pages (your footer branch)
import FeaturesPage from './pages/FeaturesPage';
import DoctorsPage from './pages/DoctorsPage';

// Company Pages (your footer branch)
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import PressPage from './pages/PressPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

// Support Pages (your footer branch)
import HelpCenterPage from './pages/HelpCenterPage';
import FaqPage from './pages/FaqPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import CookiePolicyPage from './pages/CookiePolicyPage';

// Patient Registration
import PatientStep1 from './pages/patient/sign-up/Step1';
import PatientStep2 from './pages/patient/sign-up/Step2';
import PatientStep3 from './pages/patient/sign-up/Step3';

// Doctor Registration
import DoctorStep1 from './pages/doctor/sign-up/Step1';
import DoctorStep2 from './pages/doctor/sign-up/Step2';
import DoctorStep3 from './pages/doctor/sign-up/Step3';

// Doctor Dashboard
import DoctorInformation from './pages/doctor/dashboard/DoctorInformation';
import Appointment from './pages/doctor/dashboard/Appointment';
import PatientList from './pages/doctor/dashboard/PatientList';
import PatientDetails from './pages/doctor/dashboard/PatientDetails';
import EPrescription from './pages/doctor/dashboard/EPrescription';

// Chatbot
import Chatbot from './pages/chatbot/Chatbot';

// Doctor Booking Pages
import DoctorPage from './pages/doctor-booking/DoctorPage';
import DoctorProfilePage from './pages/doctor-booking/DoctorProfilePage';
import DoctorSessionsPage from './pages/doctor-booking/DoctorSessionsPage';
import DoctorBookingPage from './pages/doctor-booking/DoctorBookingPage';
import CardPaymentPage from './pages/doctor-booking/CardPaymentPage';
import PaymentReceiptPage from './pages/doctor-booking/PaymentReceiptPage';

// Context Providers
import { PatientRegistrationProvider } from './context/patientRegistrationContext';
import { DoctorRegistrationProvider } from './context/doctorRegistrationContext';
import { AuthProvider } from './context/AuthContext';

// Auth & Protection
import PrivateRoute from './routes/PrivateRoute';
import Unauthorized from './pages/public/Unauthorized';

// Dashboards
import PatientDashboard from './pages/patient/Dashboard';
import PatientEditProfile from './pages/patient/Dashboard/PatientEditProfile';
import NewBloodReport from './pages/patient/Dashboard/NewBloodReport';
import EmergencyContactEdit from './pages/patient/Dashboard/EmergencyContactEdit';
import PatientPrescriptionHistory from './pages/patient/Dashboard/PatientPrescriptionHistory';
import PendingApproval from './pages/doctor/PendingApproval';
import AdminDashboard from './pages/admin/admindashboard';

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
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}>
                <AuthProvider>
                    <PatientRegistrationProvider>
                        <DoctorRegistrationProvider>
                            <Routes>
                                <Route path="/" element={<HomePage />} />

                                {/* Auth */}
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegistrationType />} />

                                {/* Patient Registration */}
                                <Route path="/patient/register/step1" element={<PatientStep1 />} />
                                <Route path="/patient/register/step2" element={<PatientStep2 />} />
                                <Route path="/patient/register/step3" element={<PatientStep3 />} />

                                {/* Doctor Registration */}
                                <Route path="/doctor/register/step1" element={<DoctorStep1 />} />
                                <Route path="/doctor/register/step2" element={<DoctorStep2 />} />
                                <Route path="/doctor/register/step3" element={<DoctorStep3 />} />

                                {/* Patient Routes */}
                                <Route path="/patient/dashboard" element={
                                    <PrivateRoute allowedRoles={['patient']}>
                                        <PatientDashboard />
                                    </PrivateRoute>
                                } />
                                <Route path="/patient/dashboard/edit-profile" element={
                                    <PrivateRoute allowedRoles={['patient']}>
                                        <PatientEditProfile />
                                    </PrivateRoute>
                                } />
                                <Route path="/patient/dashboard/new-blood-report" element={
                                    <PrivateRoute allowedRoles={['patient']}>
                                        <NewBloodReport />
                                    </PrivateRoute>
                                } />
                                <Route path="/patient/dashboard/edit-emergency-contact" element={
                                    <PrivateRoute allowedRoles={['patient']}>
                                        <EmergencyContactEdit />
                                    </PrivateRoute>
                                } />
                                <Route path="/patient/dashboard/prescriptions" element={
                                    <PrivateRoute allowedRoles={['patient']}>
                                        <PatientPrescriptionHistory />
                                    </PrivateRoute>
                                } />

                                {/* Doctor Dashboard Flow */}
                                <Route path="/doctor/dashboard" element={
                                    <PrivateRoute allowedRoles={['doctor']}>
                                        <DoctorInformation />
                                    </PrivateRoute>
                                } />
                                <Route path="/doctor/dashboard/appointments" element={
                                    <PrivateRoute allowedRoles={['doctor']}>
                                        <Appointment />
                                    </PrivateRoute>
                                } />
                                <Route path="/doctor/dashboard/patients" element={
                                    <PrivateRoute allowedRoles={['doctor']}>
                                        <PatientList />
                                    </PrivateRoute>
                                } />
                                <Route path="/doctor/dashboard/patients/:id" element={
                                    <PrivateRoute allowedRoles={['doctor']}>
                                        <PatientDetails />
                                    </PrivateRoute>
                                } />
                                <Route path="/doctor/dashboard/e-prescription" element={
                                    <PrivateRoute allowedRoles={['doctor']}>
                                        <EPrescription />
                                    </PrivateRoute>
                                } />

                                {/* Admin */}
                                <Route path="/admin/dashboard" element={
                                    <PrivateRoute allowedRoles={['admin']}>
                                        <AdminDashboard />
                                    </PrivateRoute>
                                } />

                                {/* Special */}
                                <Route path="/doctor/pending" element={<PendingApproval />} />
                                <Route path="/unauthorized" element={<Unauthorized />} />

                                {/* Platform */}
                                <Route path="/features" element={<FeaturesPage />} />
                                <Route path="/doctors" element={<DoctorsPage />} />

                            {/* Doctor Booking */}
                            <Route path="/doctor-booking/doctors" element={<DoctorPage />} />
                            <Route path="/doctor-booking/doctor/:id/profile" element={<DoctorProfilePage />} />
                            <Route path="/doctor-booking/doctor/:id/sessions" element={<DoctorSessionsPage />} />
                            <Route path="/doctor-booking/book" element={<DoctorBookingPage />} />
                            <Route path="/doctor-booking/card-payment" element={<CardPaymentPage />} />
                            <Route path="/doctor-booking/payment-receipt" element={<PaymentReceiptPage />} />

                                {/* Company */}
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/careers" element={<CareersPage />} />
                                <Route path="/press" element={<PressPage />} />
                                <Route path="/blog" element={<BlogPage />} />
                                <Route path="/contact" element={<ContactPage />} />

                                {/* Support */}
                                <Route path="/help" element={<HelpCenterPage />} />
                                <Route path="/faq" element={<FaqPage />} />
                                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                                <Route path="/terms" element={<TermsPage />} />
                                <Route path="/cookies" element={<CookiePolicyPage />} />

                                {/* Chatbot */}
                                <Route path="/chatbot" element={<Chatbot />} />
                            </Routes>
                        </DoctorRegistrationProvider>
                    </PatientRegistrationProvider>
                </AuthProvider>
            </GoogleOAuthProvider>
        </BrowserRouter>
    );
}

export default App;