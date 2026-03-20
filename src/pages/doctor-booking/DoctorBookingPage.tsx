import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/publiclayout';
import '../../styles/doctor-booking/DoctorBookingPage.css';
import { createBooking } from '../../services/bookingService';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Doctor {
  name: string;
  specialty: string;
  image: string;
}

interface BookingForm {
  patientId: string;
  refNo: string;
  hospital: string;
  appointmentNo: string;
  date: string;
  time: string;
  nic: string;
  contactNo: string;
}

interface LocationState {
  doctor?: Doctor;
  selectedHospital?: string;
  date?: string;
  time?: string;
}


// ─── Default Doctor ───────────────────────────────────────────────────────────
const defaultDoctor: Doctor = {
  name: 'Dr. Emma Wilson',
  specialty: 'Cardiologist',
  image: 'https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827757.jpg',
};

// ─── DoctorBookingPage Component ──────────────────────────────────────────────
const DoctorBookingPage: React.FC = () => {
  const { state } = useLocation() as { state: LocationState | null };
  const navigate = useNavigate();

  const doctor: Doctor = state?.doctor || defaultDoctor;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [form, setForm] = useState<BookingForm>({
    patientId: '',
    refNo: '',
    hospital: state?.selectedHospital || '',
    appointmentNo: '',
    date: state?.date || '',
    time: state?.time || '',
    nic: '',
    contactNo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMakePayment = async (): Promise<void> => {
    if (!form.patientId || !form.hospital || !form.date || !form.time || !form.nic || !form.contactNo) {
      setErrorMessage('Please fill in all required booking details before continuing.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const booking = await createBooking({
        patient_id: form.patientId,
        ref_number: form.refNo || undefined,
        hospital: form.hospital,
        date_and_time: `${form.date}T${form.time}`,
        nic_number: form.nic,
        contact_number: form.contactNo,
      });

      navigate('/doctor-booking/payment', {
        state: {
          doctor,
          form: {
            ...form,
            refNo: booking.ref_number,
          },
          booking,
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to create booking.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <div className="main-wrapper">
        <div className="page-card">
          <div className="card-band"></div>
          <div className="card-body">

            <div className="doctor-panel">
              <span className="available-badge">
                <i className="fas fa-circle" style={{ fontSize: '.5rem' }}></i> Available
              </span>
              <div className="doctor-photo-wrap">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="doctor-photo"
                />
              </div>
              <h3 className="doctor-name">{doctor.name}</h3>
              <span className="doctor-specialty">{doctor.specialty}</span>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt half-star"></i>
                <span className="review-count">(96)</span>
              </div>
            </div>

            <div className="form-panel">

              <div className="form-row two-col">
                <div className="field-group">
                  <label className="field-label">Patient Id</label>
                  <input
                    type="text"
                    name="patientId"
                    placeholder="e.g. 0001"
                    value={form.patientId}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Ref No</label>
                  <input
                    type="text"
                    name="refNo"
                    placeholder="e.g. 11289234"
                    value={form.refNo}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row one-col">
                <div className="field-group">
                  <label className="field-label">Hospital</label>
                  <input
                    type="text"
                    name="hospital"
                    placeholder="e.g. Asiri Hospital, Colombo"
                    value={form.hospital}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row half-col">
                <div className="field-group">
                  <label className="field-label">Appointment No</label>
                  <input
                    type="text"
                    name="appointmentNo"
                    placeholder="e.g. 001"
                    value={form.appointmentNo}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row two-col">
                <div className="field-group">
                  <label className="field-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row two-col">
                <div className="field-group">
                  <label className="field-label">NIC</label>
                  <input
                    type="text"
                    name="nic"
                    placeholder="e.g. 789245672V"
                    value={form.nic}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Contact No</label>
                  <input
                    type="tel"
                    name="contactNo"
                    placeholder="e.g. 0743328921"
                    value={form.contactNo}
                    onChange={handleChange}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {errorMessage && <p style={{ color: '#dc2626', textAlign: 'center', marginBottom: '16px' }}>{errorMessage}</p>}

        <div className="btn-row">
          <button className="btn btn-primary btn-lg" onClick={handleMakePayment} disabled={isSubmitting}>
            <i className="fas fa-credit-card"></i> {isSubmitting ? 'Creating Booking...' : 'Make Payment'}
          </button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default DoctorBookingPage;
