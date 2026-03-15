import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/doctor-booking/PaymentReceiptPage.css';

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
}

export default function PaymentReceiptPage(): React.ReactElement {
  const { state } = useLocation() as { state: LocationState | null };
  const navigate = useNavigate();

  const receipt: ReceiptData = {
    referenceNo: state?.receipt?.referenceNo ?? '',
    appointmentDate: state?.receipt?.appointmentDate ?? '',
    appointmentNo: state?.receipt?.appointmentNo ?? '',
    hospital: state?.receipt?.hospital ?? '',
    phoneNo: state?.receipt?.phoneNo ?? '',
    email: state?.receipt?.email ?? '',
    paymentDateTime: state?.receipt?.paymentDateTime ?? '',
    paymentStatus: state?.receipt?.paymentStatus ?? 'Completed',
  };

  const handleDownload = (): void => {
    window.print();
  };

  return (
    <>
      <div className="receipt-wrapper">
        <div className="receipt-card">

          <div className="watermark">
            <div className="watermark-text">
              Channel<span>4</span>Me
            </div>
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
    </>
  );
}