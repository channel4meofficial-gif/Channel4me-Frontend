import React from 'react';
import { useLocation } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/publiclayout';
import '../../styles/doctor-booking/PaymentReceiptPage.css';
import logo from '../../assets/doctor-booking images/Channel4Me-logo.jpeg';

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
    ref_number: string;
    hospital: string;
    date_and_time: string;
    contact_number: string;
    payment_status: 'completed' | 'pending' | 'failed';
  };
  form?: {
    appointmentNo?: string;
  };
}

export default function PaymentReceiptPage(): React.ReactElement {
  const { state } = useLocation() as { state: LocationState | null };
  const booking = state?.booking;
  const form = state?.form;

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
    referenceNo: state?.receipt?.referenceNo ?? booking?.ref_number ?? '',
    appointmentDate: state?.receipt?.appointmentDate ?? (booking?.date_and_time ? new Date(booking.date_and_time).toLocaleString() : ''),
    appointmentNo: state?.receipt?.appointmentNo ?? form?.appointmentNo ?? '',
    hospital: state?.receipt?.hospital ?? booking?.hospital ?? '',
    phoneNo: state?.receipt?.phoneNo ?? booking?.contact_number ?? '',
    email: state?.receipt?.email ?? '',
    paymentDateTime: state?.receipt?.paymentDateTime ?? '',
    paymentStatus:
      state?.receipt?.paymentStatus ??
      (booking?.payment_status ? (booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)) as ReceiptData['paymentStatus'] : 'Completed'),
  };

  const handleDownload = (): void => {
    window.print();
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
