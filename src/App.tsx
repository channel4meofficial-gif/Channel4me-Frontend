import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DoctorInformation from './pages/doctor/dashboard/DoctorInformation';
import Appointment from './pages/doctor/dashboard/Appointment';
import PatientList from './pages/doctor/dashboard/PatientList';
import PatientDetails from './pages/doctor/dashboard/PatientDetails';
import Chatbot from './pages/chatbot/Chatbot';
// import other pages if they exist

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
                {/* Add other routes like /about, /contact if they exist */}

                 {/* Doctor Dashboard Flow */}
                <Route path="/doctor/dashboard" element={<DoctorInformation />} />
                <Route path="/doctor/dashboard/appointments" element={<Appointment />} />
                <Route path="/doctor/dashboard/patients" element={<PatientList />} />
                {/* dynamic segment for patient id */}
                <Route path="/doctor/dashboard/patients/:id" element={<PatientDetails />} />

                <Route path='/chatbot' element={<Chatbot />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;