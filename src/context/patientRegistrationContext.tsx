import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PatientPersonalData {
    fullName: string;
    email: string;
    dob: { day: string; month: string; year: string };
    mobile: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
}

export interface PatientHealthData {
    gender: string;
    bloodType: string;
    height: string;
    weight: string;
    medicalHistory: string[];
    medications: string;
    emergencyName: string;
    emergencyPhone: string;
    healthNotes: string;
}

interface PatientRegistrationData {
    personal: PatientPersonalData | null;
    health: PatientHealthData | null;
    step: number;
}

interface PatientRegistrationContextType {
    data: PatientRegistrationData;
    updatePersonal: (data: PatientPersonalData) => void;
    updateHealth: (data: PatientHealthData) => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
}

const PatientRegistrationContext = createContext<PatientRegistrationContextType | undefined>(undefined);

export const usePatientRegistration = () => {
    const context = useContext(PatientRegistrationContext);
    if (!context) {
        throw new Error('usePatientRegistration must be used within PatientRegistrationProvider');
    }
    return context;
};

export const PatientRegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<PatientRegistrationData>({
        personal: null,
        health: null,
        step: 1,
    });

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

    const reset = () => {
        setData({ personal: null, health: null, step: 1 });
    };

    return (
        <PatientRegistrationContext.Provider value={{ data, updatePersonal, updateHealth, nextStep, prevStep, reset }}>
            {children}
        </PatientRegistrationContext.Provider>
    );
};