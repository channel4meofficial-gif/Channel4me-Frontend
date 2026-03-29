import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import '../../../styles/patient/NewBloodReport.css';

const API_BASE = 'https://api.channel4me.com';

const NewBloodReport: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        bloodSugar: '',
        cholesterol: '',
        kidneyHealth: '',
        thyroidDisorders: '',  // frontend uses plural; maps to backend 'thyroidDisorder'
    });
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const getToken = () => localStorage.getItem('token') || '';

    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/v1/health-records`, {
                    headers: { Authorization: `Bearer ${getToken()}` }
                });
                const data = await res.json();
                if (data.success && data.data) {
                    const r = data.data;
                    setForm({
                        bloodSugar: r.bloodSugar || '',
                        cholesterol: r.cholesterol || '',
                        kidneyHealth: r.kidneyHealth || '',
                        thyroidDisorders: r.thyroidDisorder || '',  // map from singular
                    });
                }
            } catch (e) {
                console.error('Failed to load health record', e);
            }
        };
        fetchRecord();
    }, []);

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError('');
        try {
            const res = await fetch(`${API_BASE}/api/v1/health-records`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    bloodSugar: form.bloodSugar,
                    cholesterol: form.cholesterol,
                    kidneyHealth: form.kidneyHealth,
                    thyroidDisorder: form.thyroidDisorders,  // map to singular for backend
                })
            });
            const data = await res.json();
            if (data.success) {
                navigate('/patient/dashboard');
            } else {
                setError(data.message || 'Failed to save health record.');
            }
        } catch (err) {
            setError('Network error. Please check your connection.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <PublicLayout>
            <div className="nbr-page">
                <main className="nbr-main">
                    <div className="nbr-container">
                        <h1 className="nbr-title">New Blood Report Detail</h1>
                        <p className="nbr-subtitle">Help to the Doctor to Identify Your Health Conditions.</p>

                        {error && (
                            <div style={{ color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '14px' }}>
                                {error}
                            </div>
                        )}

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

                        <button className="nbr-save-btn" onClick={handleSave} disabled={isSaving}>
                            {isSaving ? 'Saving…' : 'Save And Exit'}
                        </button>
                    </div>
                </main>
            </div>
        </PublicLayout>
    );
};

export default NewBloodReport;
