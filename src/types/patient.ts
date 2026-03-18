export interface PatientPersonalData {
  fullName: string;
  email: string;
  dob: {
    day: string;
    month: string;
    year: string;
  };
  mobile: string;
  password?: string;
  confirmPassword?: string;
  terms: boolean;
}

export interface PatientHealthData {
  gender: string;
  bloodType: string;
  height: string;
  weight: string;
  medicalHistory: string[];
  medications?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  healthNotes?: string;
}

export interface PatientRegistrationData {
  personal?: PatientPersonalData;
  health?: PatientHealthData;
  step: number;
}
