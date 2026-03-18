import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const FaqPage: React.FC = () => {
    const faqs = [
        { q: "How do I book an appointment?", a: "Simply sign up as a patient, browse our doctor list, and select a time slot that works for you." },
        { q: "Is my medical data secure?", a: "Yes, we use industry-standard encryption and strict privacy protocols to protect all your health information." },
        { q: "Can I cancel an appointment?", a: "Yes, you can cancel or reschedule through your dashboard at least 24 hours before the appointment." }
    ];

    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Frequently Asked Questions</h1>
                    <p className="page-subtitle">Everything you need to know about Channel4Me</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div key={index} className="faq-item">
                                <h3>{faq.q}</h3>
                                <p>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default FaqPage;
