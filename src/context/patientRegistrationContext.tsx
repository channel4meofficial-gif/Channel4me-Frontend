import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PatientRegistrationData, PatientPersonalData, PatientHealthData } from '../types/patient';

interface PatientRegistrationContextType {
  data: PatientRegistrationData;
  updatePersonal: (personal: PatientPersonalData) => void;
  updateHealth: (health: PatientHealthData) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetRegistration: () => void;
}

const initialState: PatientRegistrationData = {
  step: 1,
};

const PatientRegistrationContext = createContext<PatientRegistrationContextType | undefined>(undefined);

export const PatientRegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PatientRegistrationData>(initialState);

  const updatePersonal = (personal: PatientPersonalData) => {
    setData(prev => ({ ...prev, personal }));
  };

  const updateHealth = (health: PatientHealthData) => {
    setData(prev => ({ ...prev, health }));
  };

  const nextStep = () => {
    setData(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const prevStep = () => {
    setData(prev => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  };

  const resetRegistration = () => {
    setData(initialState);
  };

  return (
    <PatientRegistrationContext.Provider value={{ data, updatePersonal, updateHealth, nextStep, prevStep, resetRegistration }}>
      {children}
    </PatientRegistrationContext.Provider>
  );
};

export const usePatientRegistration = () => {
  const context = useContext(PatientRegistrationContext);
  if (context === undefined) {
    throw new Error('usePatientRegistration must be used within a PatientRegistrationProvider');
  }
  return context;
};
