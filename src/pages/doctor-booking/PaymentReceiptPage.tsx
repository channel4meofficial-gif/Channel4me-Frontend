import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/publiclayout';
import '../../styles/doctor-booking/PaymentReceiptPage.css';
import logo from '../../assets/doctor-booking images/Channel4Me-logo.jpeg';

const API_BASE_URL = 'http://localhost:5000';

interface ReceiptData {
  referenceNo: string;
  appointmentDate: string;
  appointmentNo: string;
  hospital: string;
  phoneNo: string;
  email: string;
  paymentDateTime: string;
  paymentStatus: 'Completed' | 'Pending' | 'Failed';
}

interface LocationState {
  receipt?: Partial<ReceiptData>;
  booking?: {
    _id: string;
    payment_id?: string;
    ref_number: string;
    reference_no?: string;
    appointment_number?: string;
    appointment_no?: string;
    hospital: string;
    hospital_name?: string;
    date_and_time: string;
    appointment_date?: string;
    contact_number: string;
    phone_no?: string;
    email?: string;
    payment_date_time?: string;
    paid_at?: string;
    updated_at?: string;
    payment_status: 'completed' | 'pending' | 'failed';
  };
  form?: {
    appointmentNo?: string;
  };
}

const resolveAppointmentDate = (booking: NonNullable<LocationState['booking']>): string => {
  const value = booking.appointment_date || booking.date_and_time || '';
  return value ? new Date(value).toLocaleString() : '';
};

const resolvePaymentDateTime = (booking: NonNullable<LocationState['booking']>): string => {
  const value = booking.payment_date_time || booking.paid_at || booking.updated_at || '';
  return value ? new Date(value).toLocaleString() : '';
};

export default function PaymentReceiptPage(): React.ReactElement {
  const { state } = useLocation() as { state: LocationState | null };
  const booking = state?.booking;
  const form = state?.form;
  const [isDownloading, setIsDownloading] = useState(false);

  if (!booking) {
    return (
      <PublicLayout>
        <div className="receipt-wrapper">
          <div className="receipt-card">
            <div className="receipt-header">
              <span className="receipt-title">RECEIPT</span>
            </div>
            <div className="receipt-body">
              <div className="receipt-row">
                <span className="receipt-value">No completed booking/payment was found for this page.</span>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const receipt: ReceiptData = {
    referenceNo: state?.receipt?.referenceNo ?? booking?.ref_number ?? booking?.reference_no ?? '',
    appointmentDate: state?.receipt?.appointmentDate ?? resolveAppointmentDate(booking),
    appointmentNo: state?.receipt?.appointmentNo ?? booking?.appointment_number ?? booking?.appointment_no ?? form?.appointmentNo ?? '',
    hospital: state?.receipt?.hospital ?? booking?.hospital_name ?? booking?.hospital ?? '',
    phoneNo: state?.receipt?.phoneNo ?? booking?.phone_no ?? booking?.contact_number ?? '',
    email: state?.receipt?.email ?? booking?.email ?? '',
    paymentDateTime: state?.receipt?.paymentDateTime ?? resolvePaymentDateTime(booking),
    paymentStatus:
      state?.receipt?.paymentStatus ??
      (booking?.payment_status ? (booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)) as ReceiptData['paymentStatus'] : 'Completed'),
  };

  const handleDownload = async (): Promise<void> => {
    const paymentId = booking.payment_id || booking._id;

    if (!paymentId) {
      alert('Payment ID is missing. Unable to download receipt.');
      return;
    }

    setIsDownloading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/payments/${paymentId}/receipt/download`);
      if (!response.ok) {
        throw new Error('Unable to download receipt.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const contentDisposition = response.headers.get('content-disposition');
      const match = contentDisposition?.match(/filename="?([^"]+)"?/i);

      link.href = url;
      link.download = match?.[1] || `receipt-${paymentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to download receipt.';
      alert(message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="receipt-wrapper">
        <div className="receipt-card">

          {/* ✅ Logo image watermark */}
          <div className="watermark">
            <img src={logo} alt="Channel4Me Logo" className="watermark-logo" />
          </div>

          <div className="receipt-header">
            <span className="receipt-title">RECEIPT</span>
            <button
              className="download-btn"
              onClick={handleDownload}
              title="Download Receipt"
              type="button"
              disabled={isDownloading}
            >
              <i className="fas fa-download" aria-hidden="true"></i>
            </button>
          </div>

          <div className="receipt-body">

            <div className="receipt-row">
              <span className="receipt-label">Reference No :</span>
              <span className="receipt-value">{receipt.referenceNo}</span>
            </div>

            <div className="receipt-row">
              <span className="receipt-label">Appointment Date :</span>
              <span className="receipt-value">{receipt.appointmentDate}</span>
            </div>

            <div className="receipt-row">
              <span className="receipt-label">Appointment No :</span>
              <span className="receipt-value">{receipt.appointmentNo}</span>
            </div>

            <div className="receipt-row">
              <span className="receipt-label">Hospital :</span>
              <span className="receipt-value">{receipt.hospital}</span>
            </div>

            <div className="receipt-row">
              <span className="receipt-label">Phone No :</span>
              <span className="receipt-value">{receipt.phoneNo}</span>
            </div>

            <div className="receipt-row">
              <span className="receipt-label">Email :</span>
              <span className="receipt-value">{receipt.email}</span>
            </div>

            <div className="receipt-row">
              <span className="receipt-label">Payment Date &amp; Time :</span>
              <span className="receipt-value">{receipt.paymentDateTime}</span>
            </div>

            <div className="receipt-row">
              <span className="receipt-label">Payment Status :</span>
              <span className={`receipt-value status-${receipt.paymentStatus.toLowerCase()}`}>
                {receipt.paymentStatus}
                {receipt.paymentStatus === 'Completed' && (
                  <i className="fas fa-check status-check" aria-hidden="true"></i>
                )}
              </span>
            </div>

          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
