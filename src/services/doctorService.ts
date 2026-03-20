import api from './api';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiDoctor {
  _id: string;
  fullName: string;
  specialization: string;
  hospital: string;
  consultationFee?: number;
  registrationId: string;
}

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * GET /api/doctor/list
 * Returns all verified doctors from the backend database.
 * The frontend DoctorPage uses this to replace its hardcoded mock data.
 */
export const getDoctors = async (): Promise<ApiDoctor[]> => {
  const { data } = await api.get<{ success: boolean; count: number; data: ApiDoctor[] }>(
    '/api/doctor/list'
  );
  return data.data;
};
