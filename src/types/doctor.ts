export type Gender = 'male' | 'female' | 'other';

export interface DoctorPersonalData {
  fullName: string;
  email: string;
  mobile: string;
  dob: string;
  gender: Gender;
  password?: string;
  confirmPassword?: string;
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
  bio?: string;
  documents?: File[];
  documentsCount?: number;
}

export interface DoctorRegistrationData {
  personal?: DoctorPersonalData;
  professional?: DoctorProfessionalData;
  verificationStatus?: 'pending' | 'in_progress' | 'verified' | 'rejected';
  verificationStep?: number;
}
