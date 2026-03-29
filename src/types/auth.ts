export type UserRole = 'patient' | 'doctor' | 'admin';

export interface Appointment {
  id: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  location?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  prescriptionUrl?: string;
  rating?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  _id?: string;
  patientId?: string;
  patient_id?: string;
  age?: number;
  location?: string;
  guardianName?: string;
  contactNumber?: string;
  memberId?: string;
  createdDate?: string;
  appointments?: Appointment[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
}