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
import PatientEditProfile from './pages/patient/Dashboard/PatientEditProfile';
import NewBloodReport from './pages/patient/Dashboard/NewBloodReport';
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
                        <Route path="/patient/profile/edit" element={
                            <PrivateRoute allowedRoles={['patient']}>
                                <PatientEditProfile />
                            </PrivateRoute>
                        } />
                        <Route path="/patient/blood-report/new" element={
                            <PrivateRoute allowedRoles={['patient']}>
                                <NewBloodReport />
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
                        <Route path="/doctors" element={<PlaceholderPage />} />
                        <Route path="/specialties" element={<PlaceholderPage />} />
                        <Route path="/pricing" element={<PlaceholderPage />} />
                        
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