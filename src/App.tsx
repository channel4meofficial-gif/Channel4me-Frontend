import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DoctorPage from './pages/doctor-booking/DoctorPage';
import DoctorProfilePage from './pages/doctor-booking/DoctorProfilePage';
import DoctorSessionsPage from './pages/doctor-booking/DoctorSessionsPage';
import DoctorBookingPage from './pages/doctor-booking/DoctorBookingPage';
 import CardPaymentPage from './pages/doctor-booking/CardPaymentPage';
import PaymentPage from './pages/doctor-booking/PaymentPage';
 import PaymentReceiptPage from './pages/doctor-booking/PaymentReceiptPage';

function ScrollToHash() {
    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
            const el = document.querySelector(location.hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
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
                <Route path="/doctors" element={<DoctorPage />} />
                <Route path="/doctor/:id" element={<DoctorProfilePage />} />
                <Route path="/doctor/:id/sessions" element={<DoctorSessionsPage />} /> 
                <Route path="/doctor/:id/booking" element={<DoctorBookingPage />} /> 
                <Route path="/card-payment" element={<CardPaymentPage />} />
                <Route path="/payment" element={<PaymentPage />} /> 
                <Route path="/payment-receipt" element={<PaymentReceiptPage />} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default App;