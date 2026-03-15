import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientProfile from "./components/PatientProfile";
import DoctorDashboard from "./components/DoctorDashboard";
import SupportChat from "./components/SupportChat";
import UserProfileSettings from "./components/UserProfileSettings";
import DoctorProfileSettings from "./components/DoctorProfileSettings";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Logged-in users land on Patient Profile */}
                <Route path="/" element={<PatientProfile />} />
                <Route path="/doctor" element={<DoctorDashboard />} />
                <Route path="/chat" element={<SupportChat />} />
                <Route path="/settings" element={<UserProfileSettings />} />
                <Route path="/doctor-settings" element={<DoctorProfileSettings />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;