import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import { usePatientRegistration } from '../../../context/patientRegistrationContext';
import '../../../styles/register/RegistrationType.css';
import '../../../styles/patient/sign-up/PatientRegistration.css'; // patient-specific styles
import StepIndicator from '../../../components/ui/common/StepIndicator';

const PatientStep2: React.FC = () => {
    const navigate = useNavigate();
    const { data, updateHealth, nextStep, prevStep, resetRegistration } = usePatientRegistration();
    const health = data.health;

    const [submitError, setSubmitError] = useState('');

    const [gender, setGender] = useState(health?.gender || '');
    const [bloodType, setBloodType] = useState(health?.bloodType || '');
    const [height, setHeight] = useState(health?.height || '');
    const [weight, setWeight] = useState(health?.weight || '');
    const [medicalHistory, setMedicalHistory] = useState<string[]>(health?.medicalHistory || []);
    const [medications, setMedications] = useState(health?.medications || '');
    const [emergencyName, setEmergencyName] = useState(health?.emergencyName || '');
    const [emergencyPhone, setEmergencyPhone] = useState(health?.emergencyPhone || '');
    const [healthNotes, setHealthNotes] = useState(health?.healthNotes || '');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleGenderSelect = (value: string) => {
        setGender(value);
        if (errors.gender) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.gender;
                return newErrors;
            });
        }
    };

    const handleBloodTypeSelect = (value: string) => {
        setBloodType(value);
        if (errors.bloodType) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.bloodType;
                return newErrors;
            });
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        if (id === 'none') {
            if (checked) setMedicalHistory([]);
        } else {
            setMedicalHistory(prev =>
                checked ? [...prev, id] : prev.filter(item => item !== id)
            );
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!gender) newErrors.gender = 'Gender is required';
        if (!bloodType) newErrors.bloodType = 'Blood type is required';
        if (!height) newErrors.height = 'Height is required';
        else if (parseFloat(height) < 100 || parseFloat(height) > 250) newErrors.height = 'Height must be between 100 and 250 cm';
        if (!weight) newErrors.weight = 'Weight is required';
        else if (parseFloat(weight) < 20 || parseFloat(weight) > 200) newErrors.weight = 'Weight must be between 20 and 200 kg';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const healthData = {
            gender,
            bloodType,
            height,
            weight,
            medicalHistory,
            medications,
            emergencyName,
            emergencyPhone,
            healthNotes,
        };
        updateHealth(healthData);

        // ── Split fullName into firstName / lastName for the backend ────────
        const fullName = data.personal?.fullName?.trim() || '';
        const spaceIdx = fullName.indexOf(' ');
        const firstName = spaceIdx !== -1 ? fullName.slice(0, spaceIdx).trim() : fullName;
        const lastName  = (spaceIdx !== -1 && fullName.slice(spaceIdx + 1).trim() !== '') 
            ? fullName.slice(spaceIdx + 1).trim() 
            : '.'; // fallback for single-word names

        const dob = data.personal?.dob;
        const dobString = (dob && dob.year && dob.month && dob.day) 
            ? `${dob.year}-${String(dob.month).padStart(2, '0')}-${String(dob.day).padStart(2, '0')}` 
            : undefined;

        const payload = {
            firstName: firstName || '.',
            lastName,
            email:           data.personal?.email || '',
            phone:           data.personal?.mobile || '',
            password:        data.personal?.password || '',
            confirmPassword: data.personal?.confirmPassword || '',
            dateOfBirth:     dobString,
        };

        if (!payload.email || !payload.password) {
            setSubmitError('Personal information is missing. Please go back to Step 1 to fill out your details.');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const result = await res.json();

            if (!res.ok || !result.success) {
                setSubmitError(result.message || 'Registration failed. Please try again.');
                return;
            }

            // Success — clear context so the form resets on next visit
            resetRegistration();
            nextStep();
            navigate('/patient/register/step3', {
                state: {
                    token: result.token || null,
                    email: payload.email,
                    fullName,
                }
            });
        } catch (err) {
            console.error('Signup error:', err);
            setSubmitError('Cannot connect to the server. Please check your connection and try again.');
        }
    };

    const handleBack = () => {
        prevStep();
        navigate('/patient/register/step1');
    };

    return (
        <PublicLayout>
            <main className="main-content-register">
                <div className="container">
                    <div className="registration-wrapper-steps" style={{maxWidth: '900px'}}>
                        
                        {/* Steps Indicator */}
                        <StepIndicator 
                            currentStep={2} 
                            steps={[
                                { number: 1, label: 'Personal Info' },
                                { number: 2, label: 'Health Profile' },
                                { number: 3, label: 'Complete' }
                            ]} 
                        />
                        
                        {/* Form Container */}
                        <div className="registration-form-container">
                            <div className="form-header">
                                <h1>Complete Your Health Profile</h1>
                                <p>Help us provide better personalized care</p>
                            </div>
                            
                            <form onSubmit={handleSubmit}>
                                {/* API Error Banner */}
                                {submitError && (
                                    <div style={{
                                        background: '#fef2f2',
                                        border: '1px solid #fecaca',
                                        color: '#dc2626',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        marginBottom: '20px',
                                        fontSize: '14px'
                                    }}>
                                        ⚠️ {submitError}
                                    </div>
                                )}
                                {/* Basic Information */}
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Gender</label>
                                        <div className="gender-options">
                                            <div 
                                                className={`gender-option ${gender === 'male' ? 'selected' : ''}`}
                                                onClick={() => handleGenderSelect('male')}
                                            >
                                                <i className="fas fa-mars"></i>
                                                Male
                                            </div>
                                            <div 
                                                className={`gender-option ${gender === 'female' ? 'selected' : ''}`}
                                                onClick={() => handleGenderSelect('female')}
                                            >
                                                <i className="fas fa-venus"></i>
                                                Female
                                            </div>
                                            <div 
                                                className={`gender-option ${gender === 'other' ? 'selected' : ''}`}
                                                onClick={() => handleGenderSelect('other')}
                                            >
                                                <i className="fas fa-genderless"></i>
                                                Other
                                            </div>
                                        </div>
                                        {errors.gender && <span className="error-message">{errors.gender}</span>}
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="form-label">Blood Type</label>
                                        <div className="blood-type-grid">
                                            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(type => (
                                                <div 
                                                    key={type}
                                                    className={`blood-type ${bloodType === type ? 'selected' : ''}`}
                                                    onClick={() => handleBloodTypeSelect(type)}
                                                >
                                                    {type}
                                                </div>
                                            ))}
                                        </div>
                                        {errors.bloodType && <span className="error-message">{errors.bloodType}</span>}
                                    </div>
                                </div>
                                
                                {/* Height & Weight */}
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="height" className="form-label">Height (cm)</label>
                                        <input 
                                            type="number" 
                                            id="height" 
                                            className="form-control" 
                                            placeholder="e.g., 170" 
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            min="100" 
                                            max="250" 
                                        />
                                        {errors.height && <span className="error-message">{errors.height}</span>}
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="weight" className="form-label">Weight (kg)</label>
                                        <input 
                                            type="number" 
                                            id="weight" 
                                            className="form-control" 
                                            placeholder="e.g., 70" 
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            min="20" 
                                            max="200" 
                                        />
                                        {errors.weight && <span className="error-message">{errors.weight}</span>}
                                    </div>
                                </div>
                                
                                {/* Medical History */}
                                <div className="form-group">
                                    <label className="form-label">Medical History</label>
                                    <div className="medical-grid">
                                        {[
                                            {id: 'diabetes', label: 'Diabetes'},
                                            {id: 'bp', label: 'High BP'},
                                            {id: 'asthma', label: 'Asthma'},
                                            {id: 'heart', label: 'Heart'},
                                            {id: 'allergy', label: 'Allergies'},
                                            {id: 'none', label: 'None'}
                                        ].map(item => (
                                            <div className="checkbox-item" key={item.id}>
                                                <input 
                                                    type="checkbox" 
                                                    id={item.id} 
                                                    checked={item.id === 'none' ? medicalHistory.length === 0 : medicalHistory.includes(item.id)}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label htmlFor={item.id}>{item.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Medications */}
                                <div className="form-group">
                                    <label htmlFor="medications" className="form-label">Current Medications (Optional)</label>
                                    <input 
                                        type="text" 
                                        id="medications" 
                                        className="form-control" 
                                        placeholder="List medications separated by commas"
                                        value={medications}
                                        onChange={(e) => setMedications(e.target.value)}
                                    />
                                </div>
                                
                                {/* Emergency Contact */}
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="emergencyName" className="form-label">Emergency Contact Name</label>
                                        <input 
                                            type="text" 
                                            id="emergencyName" 
                                            className="form-control" 
                                            placeholder="Full name"
                                            value={emergencyName}
                                            onChange={(e) => setEmergencyName(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="emergencyPhone" className="form-label">Emergency Phone</label>
                                        <input 
                                            type="tel" 
                                            id="emergencyPhone" 
                                            className="form-control" 
                                            placeholder="Phone number"
                                            value={emergencyPhone}
                                            onChange={(e) => setEmergencyPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                                
                                {/* Additional Info */}
                                <div className="form-group">
                                    <label htmlFor="healthNotes" className="form-label">Additional Health Notes (Optional)</label>
                                    <textarea 
                                        id="healthNotes" 
                                        className="form-control" 
                                        rows={3} 
                                        placeholder="Any other health information you'd like to share..."
                                        value={healthNotes}
                                        onChange={(e) => setHealthNotes(e.target.value)}
                                    />
                                </div>
                                
                                {/* Navigation Buttons */}
                                <div className="register-form-navigation">
                                    <button type="button" className="btn btn-secondary btn-back" onClick={handleBack}>
                                        <i className="fas fa-arrow-left"></i> Back
                                    </button>
                                    <button type="submit" className="btn btn-primary btn-next">
                                        Continue <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
};

export default PatientStep2;