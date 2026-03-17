import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const SpecialtiesPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Medical Specialties</h1>
                    <p className="page-subtitle">Find experts across all healthcare domains</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="placeholder-box">
                        <i className="fas fa-stethoscope"></i>
                        <h2>Specialties Directory</h2>
                        <p>This page is currently under development. Soon you will be able to discover and learn more about the 50+ medical specialties our verified doctors cover.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default SpecialtiesPage;
