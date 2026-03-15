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
        <div className="doctor-info-card">
            <div className="info-item">
                <span className="info-label">Doctor Name</span>
                <span className="info-value">{doctorName}</span>
            </div>
            <div className="info-item">
                <span className="info-label">Specialization</span>
                <span className="info-value">{specialization}</span>
            </div>
            <div className="info-item">
                <span className="info-label">License Number</span>
                <span className="info-value">{licenseNumber}</span>
            </div>
            <div className="info-item">
                <span className="info-label">Registration ID</span>
                <span className="info-value">{registrationId}</span>
            </div>
            <div className="info-item">
                <span className="info-label">Status</span>
                <span className="info-value" style={{ color: statusColor, fontWeight: 'bold' }}>
                    {status}
                </span>
            </div>
        </div>
    );
};

export default DoctorInfoCard;
