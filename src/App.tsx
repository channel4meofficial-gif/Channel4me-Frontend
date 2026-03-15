import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DoctorRegistrationProvider } from './context/doctorRegistrationContext';
import { PatientRegistrationProvider } from './context/patientRegistrationContext';
import DoctorStep1 from './pages/register/doctor/Step1';
import DoctorStep2 from './pages/register/doctor/Step2';
import DoctorStep3 from './pages/register/doctor/Step3';
import PatientStep1 from './pages/register/patient/Step1';
import PatientStep2 from './pages/register/patient/Step2';
import PatientStep3 from './pages/register/patient/Step3';
import HomePage from './pages/HomePage';
import RegistrationType from './pages/register/RegistrationType';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegistrationType />} />

                {/* Doctor registration routes with its own provider */}
                <Route path="/doctor/register/*" element={
                    <DoctorRegistrationProvider>
                        <Routes>
                            <Route path="step1" element={<DoctorStep1 />} />
                            <Route path="step2" element={<DoctorStep2 />} />
                            <Route path="step3" element={<DoctorStep3 />} />
                        </Routes>
                    </DoctorRegistrationProvider>
                } />

                {/* Patient registration routes with its own provider */}
                <Route path="/patient/register/*" element={
                    <PatientRegistrationProvider>
                        <Routes>
                            <Route path="step1" element={<PatientStep1 />} />
                            <Route path="step2" element={<PatientStep2 />} />
                            <Route path="step3" element={<PatientStep3 />} />
                        </Routes>
                    </PatientRegistrationProvider>
                } />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;