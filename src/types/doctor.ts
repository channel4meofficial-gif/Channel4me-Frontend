export type Gender = 'male' | 'female' | 'other';
export type VerificationStatus = 'pending' | 'in_progress' | 'verified' | 'rejected';

export interface DoctorPersonalData {
    fullName: string;
    email: string;
    mobile: string;
    dob: string;
    gender: Gender;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
    userType: 'doctor';
}

export interface DoctorProfessionalData {
    license: string;
    specialization: string;
    experience: string;
    qualifications: string[];
    hospital: string;
    fee: number;
    bio: string;
    documents: File[];
    documentsCount: number;
}

export interface DoctorRegistrationData {
    personal: DoctorPersonalData;
    professional: DoctorProfessionalData;
    registrationId: string;
    registrationDate: string;
    status: VerificationStatus;
    verificationStep: number;
    verificationNotes?: string;
}

export interface VerificationStep {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    icon: string;
}