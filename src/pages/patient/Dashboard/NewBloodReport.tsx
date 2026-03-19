import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import '../../../styles/patient/NewBloodReport.css';

const NewBloodReport: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        bloodSugar: '',
        cholesterol: '',
        kidneyHealth: '',
        thyroidDisorders: '',
    });

    useEffect(() => {
        const stored = localStorage.getItem('patientBloodReport');
        if (stored) {
            try {
                setForm(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse patientBloodReport", e);
            }
        }
    }, []);

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSave = () => {
        // Save form to local storage
        localStorage.setItem('patientBloodReport', JSON.stringify(form));
        navigate('/patient/dashboard');
    };

    return (
        <PublicLayout>
            <div className="nbr-page">
                <main className="nbr-main">
                    <div className="nbr-container">
                        <h1 className="nbr-title">New Blood Report Detail</h1>
                        <p className="nbr-subtitle">Help to the Doctor to Identify Your Health Conditions.</p>

                        <div className="nbr-card">
                            {/* Blood Sugar Level */}
                            <div className="nbr-field">
                                <label className="nbr-label">1. Blood Sugar Level :</label>
                                <div className="nbr-input-wrap">
                                    <div className="nbr-dot"></div>
                                    <input
                                        type="text"
                                        placeholder="Ex: 85mg/dl"
                                        value={form.bloodSugar}
                                        onChange={handleChange('bloodSugar')}
                                    />
                                </div>
                            </div>

                            {/* Cholesterol */}
                            <div className="nbr-field">
                                <label className="nbr-label">2. Cholesterol :</label>
                                <div className="nbr-input-wrap">
                                    <div className="nbr-dot"></div>
                                    <input
                                        type="text"
                                        placeholder="Ex: 200mg/dl"
                                        value={form.cholesterol}
                                        onChange={handleChange('cholesterol')}
                                    />
                                </div>
                            </div>

                            {/* Kidney Health */}
                            <div className="nbr-field">
                                <label className="nbr-label">3. Kidney Health :</label>
                                <div className="nbr-input-wrap">
                                    <div className="nbr-dot"></div>
                                    <input
                                        type="text"
                                        placeholder="Ex: 0.9mg/dl"
                                        value={form.kidneyHealth}
                                        onChange={handleChange('kidneyHealth')}
                                    />
                                </div>
                            </div>

                            {/* Thyroid Disorders */}
                            <div className="nbr-field">
                                <label className="nbr-label">4. Thyroid Disorders :</label>
                                <div className="nbr-input-wrap">
                                    <div className="nbr-dot"></div>
                                    <input
                                        type="text"
                                        placeholder="Ex: 4.0mIU/L"
                                        value={form.thyroidDisorders}
                                        onChange={handleChange('thyroidDisorders')}
                                    />
                                </div>
                            </div>
                        </div>

                        <button className="nbr-save-btn" onClick={handleSave}>
                            Save And Exit
                        </button>
                    </div>
                </main>
            </div>
        </PublicLayout>
    );
};

export default NewBloodReport;
