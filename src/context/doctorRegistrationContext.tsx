import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { DoctorRegistrationData, DoctorPersonalData, DoctorProfessionalData } from '../types/doctor';

interface DoctorRegistrationContextType {
  registrationData: DoctorRegistrationData;
  updatePersonalData: (personal: DoctorPersonalData) => void;
  updateProfessionalData: (professional: DoctorProfessionalData) => void;
  updateVerificationStatus: (status: DoctorRegistrationData['verificationStatus'], step: number) => void;
  resetRegistration: () => void;
}

const initialState: DoctorRegistrationData = {
  verificationStatus: 'pending',
  verificationStep: 1,
};

const DoctorRegistrationContext = createContext<DoctorRegistrationContextType | undefined>(undefined);

export const DoctorRegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [registrationData, setRegistrationData] = useState<DoctorRegistrationData>(initialState);

  const updatePersonalData = useCallback((personal: DoctorPersonalData) => {
    setRegistrationData(prev => {
      // Basic shallow comparison for personal data
      if (prev.personal === personal) return prev;
      return { ...prev, personal };
    });
  }, []);

  const updateProfessionalData = useCallback((professional: DoctorProfessionalData) => {
    setRegistrationData(prev => {
      if (prev.professional === professional) return prev;
      return { ...prev, professional };
    });
  }, []);

  const updateVerificationStatus = useCallback((status: DoctorRegistrationData['verificationStatus'], step: number) => {
    setRegistrationData(prev => {
      if (prev.verificationStatus === status && prev.verificationStep === step) {
        return prev;
      }
      return { ...prev, verificationStatus: status, verificationStep: step };
    });
  }, []);

  const resetRegistration = useCallback(() => {
    setRegistrationData(initialState);
  }, []);

  const value = useMemo(() => ({
    registrationData,
    updatePersonalData,
    updateProfessionalData,
    updateVerificationStatus,
    resetRegistration
  }), [registrationData, updatePersonalData, updateProfessionalData, updateVerificationStatus, resetRegistration]);

  return (
    <DoctorRegistrationContext.Provider value={value}>
      {children}
    </DoctorRegistrationContext.Provider>
  );
};

export const useDoctorRegistration = () => {
  const context = useContext(DoctorRegistrationContext);
  if (context === undefined) {
    throw new Error('useDoctorRegistration must be used within a DoctorRegistrationProvider');
  }
  return context;
};
