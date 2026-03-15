// src/context/DoctorRegistrationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  DoctorRegistrationData,
  DoctorPersonalData,
  DoctorProfessionalData,
  VerificationStatus,
} from '../types/doctor';

interface DoctorRegistrationContextType {
  registrationData: DoctorRegistrationData | null;
  updatePersonalData: (data: DoctorPersonalData) => void;
  updateProfessionalData: (data: DoctorProfessionalData) => void;
  updateVerificationStatus: (status: VerificationStatus, step: number) => void;
  getRegistrationId: () => string;
  clearRegistrationData: () => void;
  isRegistrationComplete: () => boolean;
}

const DoctorRegistrationContext = createContext<DoctorRegistrationContextType | undefined>(undefined);

export const useDoctorRegistration = () => {
  const context = useContext(DoctorRegistrationContext);
  if (!context) {
    throw new Error('useDoctorRegistration must be used within DoctorRegistrationProvider');
  }
  return context;
};

interface DoctorRegistrationProviderProps {
  children: ReactNode;
}

export const DoctorRegistrationProvider: React.FC<DoctorRegistrationProviderProps> = ({ children }) => {
  const [registrationData, setRegistrationData] = useState<DoctorRegistrationData | null>(() => {
    const saved = localStorage.getItem('doctorRegistrationComplete');
    return saved ? JSON.parse(saved) : null;
  });

  const generateRegistrationId = (): string => {
    const prefix = 'DOC-';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomNum}`;
  };

  const updatePersonalData = (data: DoctorPersonalData) => {
    const registrationId = generateRegistrationId();
    const updatedData: DoctorRegistrationData = {
      personal: data,
      professional: registrationData?.professional || {
        license: '',
        specialization: '',
        experience: '',
        qualifications: [],
        hospital: '',
        fee: 0,
        bio: '',
        documents: [],
        documentsCount: 0,
      },
      registrationId,
      registrationDate: new Date().toISOString(),
      status: 'pending',
      verificationStep: 0,
    };

    setRegistrationData(updatedData);
    // Optionally store only the personal part separately
    localStorage.setItem('doctorPersonalData', JSON.stringify(data));
    localStorage.setItem('doctorRegistrationComplete', JSON.stringify(updatedData));
  };

  const updateProfessionalData = (data: DoctorProfessionalData) => {
    if (!registrationData) {
      throw new Error('Personal data must be provided first');
    }

    const updatedData: DoctorRegistrationData = {
      ...registrationData,
      professional: data,
      status: 'in_progress',
      verificationStep: 1,
    };

    setRegistrationData(updatedData);
    localStorage.setItem('doctorProfessionalData', JSON.stringify(data));
    localStorage.setItem('doctorRegistrationComplete', JSON.stringify(updatedData));
  };

  const updateVerificationStatus = (status: VerificationStatus, step: number) => {
    if (!registrationData) return;

    const updatedData: DoctorRegistrationData = {
      ...registrationData,
      status,
      verificationStep: step,
    };

    setRegistrationData(updatedData);
    localStorage.setItem('doctorRegistrationComplete', JSON.stringify(updatedData));
  };

  const getRegistrationId = (): string => {
    return registrationData?.registrationId || generateRegistrationId();
  };

  const clearRegistrationData = () => {
    setRegistrationData(null);
    localStorage.removeItem('doctorPersonalData');
    localStorage.removeItem('doctorProfessionalData');
    localStorage.removeItem('doctorRegistrationComplete');
  };

  const isRegistrationComplete = (): boolean => {
    return registrationData?.status === 'verified';
  };

  return (
    <DoctorRegistrationContext.Provider
      value={{
        registrationData,
        updatePersonalData,
        updateProfessionalData,
        updateVerificationStatus,
        getRegistrationId,
        clearRegistrationData,
        isRegistrationComplete,
      }}
    >
      {children}
    </DoctorRegistrationContext.Provider>
  );
};