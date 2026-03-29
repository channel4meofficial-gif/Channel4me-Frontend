import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import '../../../styles/patient/PatientPrescriptionHistory.css';

const API_BASE = 'https://api.channel4me.com';

const PatientPrescriptionHistory: React.FC = () => {
    const navigate = useNavigate();
    const [prescriptions, setPrescriptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getToken = () => localStorage.getItem('token') || '';

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/v1/prescriptions/my`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                const data = await res.json();
                
                if (data.success && Array.isArray(data.data)) {
                    setPrescriptions(data.data);
                } else {
                    setPrescriptions([]);
                }
            } catch (err: any) {
                console.error("Error fetching prescriptions:", err);
                setError("Failed to load prescription history. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPrescriptions();
    }, []);

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <PublicLayout>
            <div className="pph-page">
                <main className="pph-main">
                    <div className="pph-container">
                        <div className="pph-header">
                            <h1 className="pph-title">Prescription History</h1>
                            <p className="pph-subtitle">View all your medications and doctor instructions.</p>
                            <button className="pph-back-btn" onClick={() => navigate('/patient/dashboard')}>
                                ← Back to Dashboard
                            </button>
                        </div>

                        {loading && (
                            <div className="pph-loading">
                                <div className="pph-spinner"></div>
                                <p>Loading prescriptions...</p>
                            </div>
                        )}

                        {error && (
                            <div className="pph-error">
                                {error}
                            </div>
                        )}

                        {!loading && !error && prescriptions.length === 0 && (
                            <div className="pph-empty">
                                <div className="pph-empty-icon">💊</div>
                                <h2>No Prescriptions Found</h2>
                                <p>You don't have any prescriptions in your history yet.</p>
                            </div>
                        )}

                        <div className="pph-grid">
                            {!loading && prescriptions.map((prescription) => (
                                <div key={prescription._id} className="pph-card" id={`prescription-${prescription._id}`}>
                                    <div className="pph-card-header">
                                        <div className="pph-doc-info">
                                            <span className="pph-doc-avatar">
                                                {prescription.doctorName ? prescription.doctorName.charAt(0).toUpperCase() : 'D'}
                                            </span>
                                            <div>
                                                <h3 className="pph-doc-name">{prescription.doctorName || 'Doctor'}</h3>
                                                <span className="pph-date">{formatDate(prescription.date || prescription.createdAt)}</span>
                                            </div>
                                        </div>
                                        <div className="pph-status">
                                            {prescription.status}
                                        </div>
                                    </div>

                                    <div className="pph-card-body">
                                        <h4 className="pph-section-title">Prescribed Medicines</h4>
                                        <ul className="pph-medicine-list">
                                            {prescription.medicines && prescription.medicines.map((med: any, index: number) => (
                                                <li key={index} className="pph-medicine-item">
                                                    <div className="pph-med-main">
                                                        <span className="pph-med-name">{med.drugName}</span>
                                                        <span className="pph-med-dosage">{med.dosageMg}mg</span>
                                                    </div>
                                                    <div className="pph-med-details">
                                                        <span><i className="pph-icon">🔄</i> {med.frequency}</span>
                                                        <span><i className="pph-icon">⏱️</i> {med.duration}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        {prescription.additionalFeedback && (
                                            <div className="pph-feedback">
                                                <h4 className="pph-section-title">Doctor's Feedback</h4>
                                                <p>{prescription.additionalFeedback}</p>
                                            </div>
                                        )}
                                        
                                        {prescription.medicationPicture && (
                                            <div className="pph-picture">
                                                <h4 className="pph-section-title">Attached Image</h4>
                                                <a href={`${API_BASE}${prescription.medicationPicture}`} target="_blank" rel="noreferrer" className="pph-view-image-btn">
                                                    📷 View Document
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </PublicLayout>
    );
};

export default PatientPrescriptionHistory;
