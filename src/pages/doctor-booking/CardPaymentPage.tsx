import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/doctor-booking/CardPaymentPage.css';
import { updatePaymentStatus } from '../../services/bookingService';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Doctor {
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
  total?: number | null;
}

type CardType = 'visa' | 'mastercard' | '';

// ─── Constants ────────────────────────────────────────────────────────────────
const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const years: string[] = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];

// ─── CardPaymentPage Component ────────────────────────────────────────────────
const CardPaymentPage: React.FC = () => {
  const { state } = useLocation() as { state: LocationState | null };
  const navigate  = useNavigate();

  const doctor: Doctor           = state?.doctor || {};
  const form: BookingForm        = state?.form   || {};
  const booking = state?.booking;
  const total: number | null     = state?.total  || null;

  const [cardType, setCardType]   = useState<CardType>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expMonth, setExpMonth]   = useState<string>('');
  const [expYear, setExpYear]     = useState<string>('');
  const [cvv, setCvv]             = useState<string>('');

  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    val = val.replace(/(.{4})/g, '$1  ').trim();
    setCardNumber(val);
  };

  const handlePayNow = async (): Promise<void> => {
    if (!booking?._id) {
      alert('Booking details are missing. Please create the booking again.');
      return;
    }

    try {
      const updatedBooking = await updatePaymentStatus(booking._id, 'completed');
      navigate('/doctor-booking/payment-receipt', {
        state: { doctor, form, booking: updatedBooking, payMethod: 'card', total },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to complete payment.';
      alert(message);
    }
  };

  return (
    <>
      <div className="card-payment-wrapper">
        <div className="page-card-flat">

          <div className="card-section-title">
            <i className="fas fa-credit-card"></i> Payment Details
          </div>
          <div className="inner-divider"></div>

          <div className="field-group">
            <label className="field-label">Card Type <span className="req">*</span></label>
            <div className="radio-row">

              <label className="card-type-option">
                <input
                  type="radio"
                  name="cardType"
                  value="visa"
                  checked={cardType === 'visa'}
                  onChange={() => setCardType('visa')}
                />
                <span className="card-type-box">
                  <span className="radio-dot"></span>
                  <span className="visa-logo">VISA</span>
                  <span className="card-type-name">Visa</span>
                </span>
              </label>

              <label className="card-type-option">
                <input
                  type="radio"
                  name="cardType"
                  value="mastercard"
                  checked={cardType === 'mastercard'}
                  onChange={() => setCardType('mastercard')}
                />
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
              <input
                type="text"
                className="card-num-input"
                maxLength={19}
                placeholder="XXXX  XXXX  XXXX  XXXX"
                value={cardNumber}
                onChange={handleCardNumber}
              />
            </div>
          </div>

          <div className="form-row two-col">
            <div className="field-group">
              <label className="field-label">Expiration Month <span className="req">*</span></label>
              <div className="select-wrap">
                <select
                  value={expMonth}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setExpMonth(e.target.value)}
                >
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
                <select
                  value={expYear}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setExpYear(e.target.value)}
                >
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
            <input
              type="password"
              className="cvv-input"
              maxLength={4}
              placeholder="•••"
              value={cvv}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCvv(e.target.value)}
            />
          </div>

          <div className="order-block">
            <h4 className="order-block-title">Your Order</h4>
            <div className="order-divider"></div>
            <div className="order-row">
              <span className="order-label">
                <i className="fas fa-receipt"></i> Total Amount
              </span>
              <span className="order-amount">
                {total ? `Rs. ${total.toLocaleString()}.00` : 'Rs. —'}
              </span>
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
    </>
  );
};

export default CardPaymentPage;
