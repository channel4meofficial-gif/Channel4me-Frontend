import React from 'react';

interface DoctorInfoCardProps {
    doctorName: string;
    specialization: string;
    licenseNumber: string;
    registrationId: string;
    status: string;
    statusColor: string;
}

const DoctorInfoCard: React.FC<DoctorInfoCardProps> = ({
    doctorName,
    specialization,
    licenseNumber,
    registrationId,
    status,
    statusColor
}) => {
    return (
        <div className="doctor-info-card" style={{
            background: '#f8fafc',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid #e2e8f0'
        }}>
            <div className="info-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="info-label" style={{ color: '#64748b', fontWeight: '500' }}>Doctor Name</span>
                <span className="info-value" style={{ color: '#1e293b', fontWeight: '600' }}>{doctorName}</span>
            </div>
            <div className="info-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="info-label" style={{ color: '#64748b', fontWeight: '500' }}>Specialization</span>
                <span className="info-value" style={{ color: '#1e293b', fontWeight: '600' }}>{specialization}</span>
            </div>
            <div className="info-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="info-label" style={{ color: '#64748b', fontWeight: '500' }}>License Number</span>
                <span className="info-value" style={{ color: '#1e293b', fontWeight: '600' }}>{licenseNumber}</span>
            </div>
            <div className="info-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="info-label" style={{ color: '#64748b', fontWeight: '500' }}>Registration ID</span>
                <span className="info-value" style={{ color: '#1e293b', fontWeight: '600' }}>{registrationId}</span>
            </div>
            <div className="info-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="info-label" style={{ color: '#64748b', fontWeight: '500' }}>Status</span>
                <span className="info-value" style={{ color: statusColor, fontWeight: 'bold' }}>
                    {status}
                </span>
            </div>
        </div>
    );
};

export default DoctorInfoCard;
