import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/doctor-booking/PaymentPage.css';
import { updatePaymentStatus } from '../../services/bookingService';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Charges {
  booking: number;
  doctor: number;
  hospital: number;
}

interface Doctor {
  name: string;
  specialty: string;
  charges?: Charges;
}

interface BookingForm {
  patientId?: string;
  refNo?: string;
  hospital?: string;
  appointmentNo?: string;
  date?: string;
  time?: string;
  nic?: string;
  contactNo?: string;
}

interface LocationState {
  doctor?: Doctor;
  form?: BookingForm;
  booking?: {
    _id: string;
    ref_number: string;
    payment_status: 'pending' | 'completed' | 'failed';
  };
}

type PayMethod = 'card' | 'cash' | '';

// ─── Default Doctor ───────────────────────────────────────────────────────────
const defaultDoctor: Doctor = {
  name: 'Dr. Emma Wilson',
  specialty: 'Cardiologist',
};

// ─── PaymentPage Component ────────────────────────────────────────────────────
const PaymentPage: React.FC = () => {
  const { state } = useLocation() as { state: LocationState | null };
  const navigate  = useNavigate();

  const doctor: Doctor       = state?.doctor || defaultDoctor;
  const form: BookingForm    = state?.form   || {};
  const booking = state?.booking;

  const charges: Charges | null = doctor.charges || null;
  const total: number | null    = charges
    ? charges.booking + charges.doctor + charges.hospital
    : null;

  const [payMethod, setPayMethod] = useState<PayMethod>('');

  const handlePay = async (): Promise<void> => {
    if (!booking?._id) {
      alert('Booking details are missing. Please create the booking again.');
      return;
    }

    if (payMethod === 'card') {
      navigate('/doctor-booking/card-payment', { state: { doctor, form, booking, payMethod, total } });
    } else if (payMethod === 'cash') {
      try {
        const updatedBooking = await updatePaymentStatus(booking._id, 'pending');
        navigate('/doctor-booking/payment-receipt', {
          state: { doctor, form, booking: updatedBooking, payMethod, total },
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to update payment status.';
        alert(message);
      }
    } else {
      alert('Please select a payment method.');
    }
  };

  return (
    <>
      <div className="payment-page-wrapper">
        <div className="page-card">
          <div className="card-band"></div>
          <div className="card-body">

            <div className="illus-panel">
              <div className="illus-ring lg"></div>
              <div className="illus-ring md"></div>
              <img
                src={require('../../assets/doctor-booking images/Paymentimage.jpeg')}
                alt="Payment Illustration"
                className="illus-img"
              />
            </div>

            <div className="form-panel">

              <div className="form-row two-col">
                <div className="field-group">
                  <label className="field-label">Patient Id</label>
                  <input
                    type="text"
                    placeholder="e.g. 012283"
                    defaultValue={form.patientId || ''}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Ref No</label>
                  <input
                    type="text"
                    placeholder="e.g. 11289234"
                    defaultValue={form.refNo || ''}
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Doctor's Name</label>
                <input type="text" defaultValue={doctor.name} readOnly />
              </div>

              <div className="field-group">
                <label className="field-label">Total Amount</label>
                <input
                  type="text"
                  readOnly
                  value={total ? `Rs. ${total.toLocaleString()}.00` : ''}
                  placeholder="Rs. 0.00"
                  className="amount-input"
                />
              </div>

              <div className="field-group">
                <label className="field-label">Payment Method</label>
                <div className="pay-method-group">

                  <label className="pay-method-option">
                    <input
                      type="radio"
                      name="payMethod"
                      value="card"
                      checked={payMethod === 'card'}
                      onChange={() => setPayMethod('card')}
                    />
                    <span className="pm-radio"></span>
                    <span className="pm-label">
                      <i className="fas fa-credit-card" style={{ color: '#667eea', marginRight: '6px' }}></i>
                      Credit / Debit Card
                    </span>
                  </label>

                  <label className="pay-method-option">
                    <input
                      type="radio"
                      name="payMethod"
                      value="cash"
                      checked={payMethod === 'cash'}
                      onChange={() => setPayMethod('cash')}
                    />
                    <span className="pm-radio"></span>
                    <span className="pm-label">
                      <i className="fas fa-hospital" style={{ color: '#10b981', marginRight: '6px' }}></i>
                      Cash Payment (Pay during visit)
                    </span>
                  </label>

                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="btn-row">
          <button className="btn btn-primary btn-lg" onClick={handlePay}>
            <i className="fas fa-arrow-right"></i> PAY
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
