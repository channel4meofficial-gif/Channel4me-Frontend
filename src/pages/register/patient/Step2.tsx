import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientRegistration } from '../../../context/patientRegistrationContext';
import '../../../styles/register/patient/PatientRegistration.css';

const PatientStep2: React.FC = () => {
    const navigate = useNavigate();
    const { data, updateHealth, nextStep, prevStep } = usePatientRegistration();
    const health = data.health;

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

    const handleGenderSelect = (value: string) => setGender(value);
    const handleBloodTypeSelect = (value: string) => setBloodType(value);

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

    const handleSubmit = (e: React.FormEvent) => {
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
        nextStep();
        navigate('/patient/register/step3');
    };

    const handleBack = () => {
        prevStep();
        navigate('/patient/register/step1');
    };

    return (
        <div className="container">
            <div className="registration-wrapper">
                <div className="steps">
                    <div className="step completed">
                        <div className="step-number">1</div>
                        <div className="step-label">Personal Info</div>
                    </div>
                    <div className="step active">
                        <div className="step-number">2</div>
                        <div className="step-label">Health Profile</div>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-label">Complete</div>
                    </div>
                </div>

                <div className="form-container">
                    <div className="form-header">
                        <h1>Complete Your Health Profile</h1>
                        <p>Help us provide better personalized care</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Gender</label>
                                <div className="gender-options">
                                    <div className={`gender-option ${gender === 'male' ? 'selected' : ''}`} onClick={() => handleGenderSelect('male')}>
                                        <i className="fas fa-mars"></i> Male
                                    </div>
                                    <div className={`gender-option ${gender === 'female' ? 'selected' : ''}`} onClick={() => handleGenderSelect('female')}>
                                        <i className="fas fa-venus"></i> Female
                                    </div>
                                    <div className={`gender-option ${gender === 'other' ? 'selected' : ''}`} onClick={() => handleGenderSelect('other')}>
                                        <i className="fas fa-genderless"></i> Other
                                    </div>
                                </div>
                                {errors.gender && <span className="error-message">{errors.gender}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Blood Type</label>
                                <div className="blood-type-grid">
                                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(type => (
                                        <div key={type} className={`blood-type ${bloodType === type ? 'selected' : ''}`} onClick={() => handleBloodTypeSelect(type)}>
                                            {type}
                                        </div>
                                    ))}
                                </div>
                                {errors.bloodType && <span className="error-message">{errors.bloodType}</span>}
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="height" className="form-label">Height (cm)</label>
                                <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} className="form-control" placeholder="e.g., 170" min="100" max="250" />
                                {errors.height && <span className="error-message">{errors.height}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="weight" className="form-label">Weight (kg)</label>
                                <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} className="form-control" placeholder="e.g., 70" min="20" max="200" />
                                {errors.weight && <span className="error-message">{errors.weight}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Medical History</label>
                            <div className="medical-grid">
                                {['Diabetes', 'High BP', 'Asthma', 'Heart', 'Allergies', 'None'].map(cond => {
                                    const id = cond.toLowerCase().replace(' ', '');
                                    return (
                                        <div key={cond} className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                id={id}
                                                checked={cond === 'None' ? medicalHistory.length === 0 : medicalHistory.includes(id)}
                                                onChange={handleCheckboxChange}
                                                disabled={cond === 'None' ? medicalHistory.length > 0 : medicalHistory.length === 0 && !medicalHistory.includes('none')}
                                            />
                                            <label htmlFor={id}>{cond}</label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="medications" className="form-label">Current Medications (Optional)</label>
                            <input type="text" id="medications" value={medications} onChange={(e) => setMedications(e.target.value)} className="form-control" placeholder="List medications separated by commas" />
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="emergencyName" className="form-label">Emergency Contact Name</label>
                                <input type="text" id="emergencyName" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} className="form-control" placeholder="Full name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="emergencyPhone" className="form-label">Emergency Phone</label>
                                <input type="tel" id="emergencyPhone" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} className="form-control" placeholder="Phone number" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="healthNotes" className="form-label">Additional Health Notes (Optional)</label>
                            <textarea id="healthNotes" value={healthNotes} onChange={(e) => setHealthNotes(e.target.value)} className="form-control" rows={3} placeholder="Any other health information you'd like to share..." />
                        </div>

                        <div className="form-navigation">
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
    );
};

export default PatientStep2;