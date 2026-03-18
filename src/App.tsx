import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Core Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/sign-in/LoginPage';
import RegistrationType from './pages/RegistrationType';
import PlaceholderPage from './pages/PlaceholderPage';

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
import DoctorPage from './pages/doctor-booking/DoctorPage';
import DoctorProfilePage from './pages/doctor-booking/DoctorProfilePage';
import DoctorSessionsPage from './pages/doctor-booking/DoctorSessionsPage';
import DoctorBookingPage from './pages/doctor-booking/DoctorBookingPage';
import PaymentPage from './pages/doctor-booking/PaymentPage';
import CardPaymentPage from './pages/doctor-booking/CardPaymentPage';
import PaymentReceiptPage from './pages/doctor-booking/PaymentReceiptPage';

// Chatbot Page
import Chatbot from './pages/chatbot/Chatbot';

// Context Providers
import { PatientRegistrationProvider } from './context/patientRegistrationContext';
import { DoctorRegistrationProvider } from './context/doctorRegistrationContext';
import { AuthProvider } from './context/AuthContext';

// Auth & Protection
import PrivateRoute from './routes/PrivateRoute';
import Unauthorized from './pages/public/Unauthorized';

// New Dashboards/Pages
import PatientDashboard from './pages/patient/Dashboard';
import PendingApproval from './pages/doctor/PendingApproval';
import AdminDashboard from './pages/admin/Dashboard';

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
    console.log('App rendering, current location:', window.location.pathname);
    return (
        <BrowserRouter>
            <ScrollToHash />
            <AuthProvider>
                <PatientRegistrationProvider>
                    <DoctorRegistrationProvider>
                        <Routes>
                        <Route path="/" element={<HomePage />} />
                        
                        {/* Auth Routes */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegistrationType />} />
                        
                        {/* Patient Registration Flow */}
                        <Route path="/patient/register/step1" element={<PatientStep1 />} />
                        <Route path="/patient/register/step2" element={<PatientStep2 />} />
                        <Route path="/patient/register/step3" element={<PatientStep3 />} />

                        {/* Doctor Registration Flow */}
                        <Route path="/doctor/register/step1" element={<DoctorStep1 />} />
                        <Route path="/doctor/register/step2" element={<DoctorStep2 />} />
                        <Route path="/doctor/register/step3" element={<DoctorStep3 />} />

                        {/* Patient Routes */}
                        <Route path="/patient/dashboard" element={
                            <PrivateRoute allowedRoles={['patient']}>
                                <PatientDashboard />
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

                        {/* Admin Routes */}
                        <Route path="/admin/dashboard" element={
                            <PrivateRoute allowedRoles={['admin']}>
                                <AdminDashboard />
                            </PrivateRoute>
                        } />

                        {/* Special Pages */}
                        <Route path="/doctor/pending" element={<PendingApproval />} />
                        <Route path="/unauthorized" element={<Unauthorized />} />

                        {/* Platform Routes */}
                        <Route path="/features" element={<PlaceholderPage />} />
                        <Route path="/doctors" element={<DoctorPage />} />
                        <Route path="/specialties" element={<PlaceholderPage />} />
                        <Route path="/pricing" element={<PlaceholderPage />} />

                        {/* Doctor Booking Routes */}
                        <Route path="/doctor-booking" element={<DoctorPage />} />
                        <Route path="/doctor-booking/book" element={<DoctorBookingPage />} />
                        <Route path="/doctor-booking/doctor/:id/profile" element={<DoctorProfilePage />} />
                        <Route path="/doctor-booking/doctor/:id/sessions" element={<DoctorSessionsPage />} />
                        <Route path="/doctor-booking/payment" element={<PaymentPage />} />
                        <Route path="/doctor-booking/card-payment" element={<CardPaymentPage />} />
                        <Route path="/doctor-booking/payment-receipt" element={<PaymentReceiptPage />} />
                        
                        {/* Company Routes */}
                        <Route path="/about" element={<PlaceholderPage />} />
                        <Route path="/careers" element={<PlaceholderPage />} />
                        <Route path="/press" element={<PlaceholderPage />} />
                        <Route path="/blog" element={<PlaceholderPage />} />
                        <Route path="/contact" element={<PlaceholderPage />} />
                        
                        {/* Support Routes */}
                        <Route path="/help" element={<PlaceholderPage />} />
                        <Route path="/faq" element={<PlaceholderPage />} />
                        <Route path="/privacy" element={<PlaceholderPage />} />
                        <Route path="/terms" element={<PlaceholderPage />} />
                        <Route path="/cookies" element={<PlaceholderPage />} />

                        {/* Chatbot Route */}
                        <Route path="/chatbot" element={<Chatbot />} />
                    </Routes>
                </DoctorRegistrationProvider>
            </PatientRegistrationProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
