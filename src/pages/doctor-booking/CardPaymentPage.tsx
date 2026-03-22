import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/publiclayout';
import '../../styles/doctor-booking/CardPaymentPage.css';

const API_BASE_URL = 'http://localhost:5000';

interface Doctor {
  id?: number;
  name?: string;
  specialty?: string;
  charges?: {
    booking: number;
    doctor: number;
    hospital: number;
  };
}

interface BookingForm {
  patientId?: string;
  refNo?: string;
  hospital?: string;
  date?: string;
  time?: string;
  nic?: string;
  email?: string;
  contactNo?: string;
}

interface LocationState {
  doctor?: Doctor;
  form?: BookingForm;
  booking?: {
    _id: string;
    ref_number: string;
    reference_no?: string;
    appointment_number?: string;
    appointment_no?: string;
    hospital?: string;
    hospital_name?: string;
    date_and_time?: string;
    appointment_date?: string;
    contact_number?: string;
    phone_no?: string;
    email?: string;
    payment_date_time?: string;
    paid_at?: string;
    updated_at?: string;
    payment_status: 'pending' | 'completed' | 'failed';
  };
  total?: number | null;
}

type CardType = 'visa' | 'mastercard' | '';

const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years: string[] = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];

const CardPaymentPage: React.FC = () => {
  const { state } = useLocation() as { state: LocationState | null };
  const navigate = useNavigate();

  const doctor: Doctor = state?.doctor || {};
  const form: BookingForm = state?.form || {};
  const booking = state?.booking;
  const total: number | null = state?.total ?? (
    doctor.charges ? doctor.charges.booking + doctor.charges.doctor + doctor.charges.hospital : null
  );

  const [cardType, setCardType] = useState<CardType>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expMonth, setExpMonth] = useState<string>('');
  const [expYear, setExpYear] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    val = val.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(val);
  };

  const handlePayNow = async (): Promise<void> => {
    if (!booking?._id) {
      alert('Booking details are missing. Please create the booking again.');
      return;
    }
    if (!cardType) {
      setErrorMessage('Please select a card type.');
      return;
    }
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      setErrorMessage('Please enter a valid 16-digit card number.');
      return;
    }
    if (!expMonth || !expYear) {
      setErrorMessage('Please select the card expiration month and year.');
      return;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      setErrorMessage('Please enter a valid 3 or 4 digit CVV.');
      return;
    }

    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/bookings/${booking._id}/payment`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctor_id: doctor.id,
          payment_status: 'completed',
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to complete payment.');
      }

      navigate('/doctor-booking/payment-receipt', {
        state: { doctor, form, booking: result.data, payMethod: 'card', total },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to complete payment.';
      alert(message);
    }
  };

  return (
    <PublicLayout>
      <div className="card-payment-wrapper">
        <div className="page-card-flat">
          <div className="card-section-title">
            <i className="fas fa-credit-card"></i> Payment Details
          </div>
          <div className="inner-divider"></div>

          {errorMessage && <p style={{ color: '#dc2626', marginBottom: '16px' }}>{errorMessage}</p>}

          <div className="field-group">
            <label className="field-label">Card Type <span className="req">*</span></label>
            <div className="radio-row">
              <label className="card-type-option">
                <input type="radio" name="cardType" value="visa" checked={cardType === 'visa'} onChange={() => setCardType('visa')} />
                <span className="card-type-box">
                  <span className="radio-dot"></span>
                  <span className="visa-logo">VISA</span>
                  <span className="card-type-name">Visa</span>
                </span>
              </label>

              <label className="card-type-option">
                <input type="radio" name="cardType" value="mastercard" checked={cardType === 'mastercard'} onChange={() => setCardType('mastercard')} />
                <span className="card-type-box">
                  <span className="radio-dot"></span>
                  <span className="mc-logo">
                    <span className="mc-l"></span>
                    <span className="mc-r"></span>
                  </span>
                  <span className="card-type-name">Mastercard</span>
                </span>
              </label>
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Card Number <span className="req">*</span></label>
            <div className="card-num-wrap">
              <i className="fas fa-lock card-num-icon"></i>
              <input type="text" className="card-num-input" maxLength={19} placeholder="XXXX XXXX XXXX XXXX" value={cardNumber} onChange={handleCardNumber} />
            </div>
          </div>

          <div className="form-row two-col">
            <div className="field-group">
              <label className="field-label">Expiration Month <span className="req">*</span></label>
              <div className="select-wrap">
                <select value={expMonth} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setExpMonth(e.target.value)}>
                  <option value="" disabled>Month</option>
                  {months.map((m: string) => <option key={m}>{m}</option>)}
                </select>
                <span className="select-arrow">
                  <i className="fas fa-chevron-down" style={{ fontSize: '.75rem' }}></i>
                </span>
              </div>
            </div>
            <div className="field-group">
              <label className="field-label">Expiration Year <span className="req">*</span></label>
              <div className="select-wrap">
                <select value={expYear} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setExpYear(e.target.value)}>
                  <option value="" disabled>Year</option>
                  {years.map((y: string) => <option key={y}>{y}</option>)}
                </select>
                <span className="select-arrow">
                  <i className="fas fa-chevron-down" style={{ fontSize: '.75rem' }}></i>
                </span>
              </div>
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">CVV <span className="req">*</span></label>
            <p className="cvv-hint">
              <i className="fas fa-info-circle" style={{ color: '#667eea', marginRight: '4px' }}></i>
              Three or four digit number printed on the back or front of your card.
            </p>
            <input type="password" className="cvv-input" maxLength={4} placeholder="***" value={cvv} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCvv(e.target.value)} />
          </div>

          <div className="order-block">
            <h4 className="order-block-title">Your Order</h4>
            <div className="order-divider"></div>
            <div className="order-row">
              <span className="order-label">
                <i className="fas fa-receipt"></i> Total Amount
              </span>
              <span className="order-amount">{total ? `Rs. ${total.toLocaleString()}.00` : 'Rs. -'}</span>
            </div>
          </div>

          <div className="action-row">
            <button className="btn btn-cancel" onClick={() => navigate(-1)}>
              <i className="fas fa-times"></i> Cancel
            </button>
            <button className="btn btn-primary" onClick={handlePayNow}>
              <i className="fas fa-lock"></i> Pay Now
            </button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default CardPaymentPage;
