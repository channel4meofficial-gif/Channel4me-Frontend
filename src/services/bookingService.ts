import api from './api';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CreateBookingPayload {
  patient_id: string;
  ref_number?: string;
  hospital: string;
  date_and_time: string; // ISO string, e.g. "2026-03-20T14:00"
  nic_number: string;
  contact_number: string;
}

export interface BookingResponse {
  _id: string;
  patient_id: string;
  ref_number: string;
  hospital: string;
  date_and_time: string;
  nic_number: string;
  contact_number: string;
  payment_status: 'pending' | 'completed' | 'failed';
  createdAt?: string;
  updatedAt?: string;
}

export type PaymentStatus = 'pending' | 'completed' | 'failed';

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * POST /api/v1/bookings
 * Create a new doctor booking and return the saved document.
 */
export const createBooking = async (
  payload: CreateBookingPayload
): Promise<BookingResponse> => {
  const { data } = await api.post<{ success: boolean; data: BookingResponse }>(
    '/api/v1/bookings',
    payload
  );
  return data.data;
};

/**
 * GET /api/v1/bookings/:id
 * Retrieve a single booking by its MongoDB _id.
 */
export const getBooking = async (id: string): Promise<BookingResponse> => {
  const { data } = await api.get<{ success: boolean; data: BookingResponse }>(
    `/api/v1/bookings/${id}`
  );
  return data.data;
};

/**
 * PATCH /api/v1/bookings/:id/payment
 * Update the payment_status of a booking.
 */
export const updatePaymentStatus = async (
  id: string,
  payment_status: PaymentStatus
): Promise<BookingResponse> => {
  const { data } = await api.patch<{ success: boolean; data: BookingResponse }>(
    `/api/v1/bookings/${id}/payment`,
    { payment_status }
  );
  return data.data;
};
