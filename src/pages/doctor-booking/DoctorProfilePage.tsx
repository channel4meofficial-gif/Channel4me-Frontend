import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/doctor-booking/DoctorProfilePage.css';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Review {
  stars: number;
  text: string;
}

interface Charges {
  noShow: number;
  booking: number;
  doctor: number;
  hospital: number;
}

interface DoctorData {
  name: string;
  firstName: string;
  specialty: string;
  specializedIn: string;
  education: string;
  experience: string;
  image: string;
  hospitals: string[];
  reviews: Review[];
  charges: Charges;
}

interface DoctorsDataMap {
  [key: number]: DoctorData;
}

// ─── Doctor Data ──────────────────────────────────────────────────────────────
const doctorsData: DoctorsDataMap = {
  1: {
    name: 'Dr. Sonali Perera',
    firstName: 'Sonali Perera',
    specialty: 'Cardiologist',
    specializedIn: 'Cardiology',
    education: 'MBBS – Harvard Medical School',
    experience: '8 Years of experience in diagnosing and treating heart conditions.',
    image: require('../../assets/doctor-booking images/Doctorimage1.jpeg'),
    hospitals: ['Asiri Hospital, Colombo', 'Nawaloka Hospital, Colombo'],
    reviews: [
      { stars: 5,   text: 'Dr. Sonali is amazing! My heart condition was diagnosed quickly and accurately.' },
      { stars: 5,   text: 'Very caring and attentive. Explained my treatment plan in detail.' },
      { stars: 4.5, text: 'Highly professional cardiologist. I felt safe under her care.' },
      { stars: 5,   text: 'Outstanding doctor. She took time to listen to all my concerns.' },
      { stars: 4.5, text: 'Dr. Sonali thoroughly explained my ECG results. Very reassuring visit.' },
      { stars: 5,   text: 'Exceptional cardiologist. Her diagnosis was spot on and treatment effective.' },
    ],
    charges: { noShow: 500, booking: 300, doctor: 3500, hospital: 1200 },
  },
  2: {
    name: 'Dr. Amal Fernando',
    firstName: 'Amal Fernando',
    specialty: 'Neurologist',
    specializedIn: 'Neurology',
    education: 'MBBS – Johns Hopkins University',
    experience: '10 Years of experience in diagnosing and treating neurological disorders.',
    image: require('../../assets/doctor-booking images/Doctorimage2.jpeg'),
    hospitals: ['Asiri Hospital, Colombo', 'Lanka Hospital, Colombo'],
    reviews: [
      { stars: 5,   text: 'Dr. Amal diagnosed my migraine condition perfectly. Very knowledgeable.' },
      { stars: 4.5, text: 'Excellent neurologist. He explained everything clearly and patiently.' },
      { stars: 5,   text: 'Best neurology consultation I have ever had. Highly recommended.' },
      { stars: 4.5, text: 'Very thorough and professional. I am grateful for his expert care.' },
      { stars: 5,   text: 'Dr. Amal identified my condition that others had missed. Truly outstanding.' },
      { stars: 4.5, text: 'Very detailed consultation. He took extra time to address all my questions.' },
    ],
    charges: { noShow: 600, booking: 350, doctor: 4500, hospital: 1500 },
  },
  3: {
    name: 'Dr. Isuri Anupama',
    firstName: 'Isuri Anupama',
    specialty: 'Pediatrician',
    specializedIn: 'Pediatrics',
    education: 'MBBS – University of Delhi',
    experience: '6 Years of experience in child healthcare and development.',
    image: require('../../assets/doctor-booking images/Doctorimage3.jpeg'),
    hospitals: ['Nawaloka Hospital, Colombo', 'Durdans Hospital, Colombo'],
    reviews: [
      { stars: 5,   text: 'Dr. Isuri is wonderful with children. My son loves visiting her!' },
      { stars: 5,   text: 'Very gentle and caring pediatrician. Made my daughter feel at ease.' },
      { stars: 4.5, text: 'Excellent doctor for kids. Always thorough and reassuring.' },
      { stars: 5,   text: 'She is incredibly patient and knowledgeable. Highly recommend for children.' },
      { stars: 5,   text: 'My toddler was very comfortable with Dr. Isuri. She has a magical touch.' },
      { stars: 4.5, text: 'Great follow-up care after treatment. She genuinely cares for her patients.' },
    ],
    charges: { noShow: 400, booking: 250, doctor: 2800, hospital: 1000 },
  },
  4: {
    name: 'Dr. Kasun Ranaweera',
    firstName: 'Kasun Ranaweera',
    specialty: 'Physician',
    specializedIn: 'General Medicine',
    education: 'MBBS – University of Oxford',
    experience: '12 Years of experience in general medicine and patient care.',
    image: require('../../assets/doctor-booking images/Doctorimage4.jpeg'),
    hospitals: ['Asiri Hospital, Colombo', 'Durdans Hospital, Colombo'],
    reviews: [
      { stars: 5,   text: 'Dr. Kasun is an exceptional physician. Very thorough in his examination.' },
      { stars: 4.5, text: 'Great doctor with a calm approach. Highly recommend for general care.' },
      { stars: 5,   text: 'He listened to all my symptoms carefully and gave excellent advice.' },
      { stars: 4.5, text: 'Very experienced and professional. I trust him completely with my health.' },
      { stars: 5,   text: 'Dr. Kasun is extremely thorough. Best general physician I have visited.' },
      { stars: 4.5, text: 'Very approachable and knowledgeable. I always leave feeling well informed.' },
    ],
    charges: { noShow: 450, booking: 300, doctor: 3000, hospital: 1100 },
  },
  5: {
    name: 'Dr. Mihiri Ranathunga',
    firstName: 'Mihiri Ranathunga',
    specialty: 'Cardiologist',
    specializedIn: 'Cardiology',
    education: 'MBBS – University of Texas',
    experience: '4 Years of experience in diagnosing and treating patients.',
    image: require('../../assets/doctor-booking images/Doctorimage5.jpeg'),
    hospitals: ['Asiri Hospital, Colombo', 'Nawaloka Hospital, Colombo'],
    reviews: [
      { stars: 4.5, text: 'Dr. Mihiri is very dedicated and thorough. Great experience overall.' },
      { stars: 5,   text: 'She made me feel comfortable and explained my condition very well.' },
      { stars: 4.5, text: 'Very professional and caring cardiologist. Highly recommended.' },
      { stars: 5,   text: 'Excellent consultation. She answered all my questions with patience.' },
      { stars: 5,   text: 'Dr. Mihiri caught an early warning sign I was unaware of. Truly grateful.' },
      { stars: 4.5, text: 'Warm and professional. She took time to understand my full medical history.' },
    ],
    charges: { noShow: 500, booking: 300, doctor: 3200, hospital: 1200 },
  },
  6: {
    name: 'Dr. Ann Perera',
    firstName: 'Ann Perera',
    specialty: 'Eye Surgeon',
    specializedIn: 'Ophthalmology',
    education: 'MBBS – Stanford University',
    experience: '7 Years of experience in eye surgery and vision correction.',
    image: require('../../assets/doctor-booking images/Doctorimage6.jpeg'),
    hospitals: ['Lanka Hospital, Colombo', 'Asiri Hospital, Colombo'],
    reviews: [
      { stars: 5,   text: 'Dr. Ann performed my eye surgery flawlessly. Vision is perfect now!' },
      { stars: 5,   text: 'Outstanding eye specialist. Very precise and professional in her work.' },
      { stars: 4.5, text: 'Excellent surgeon. She explained the procedure clearly before starting.' },
      { stars: 5,   text: 'My eyesight has improved tremendously. Thank you Dr. Ann!' },
      { stars: 5,   text: 'Dr. Ann corrected my vision perfectly. The procedure was smooth and painless.' },
      { stars: 4.5, text: 'Very skilled ophthalmologist. She answered all my pre-surgery concerns.' },
    ],
    charges: { noShow: 700, booking: 400, doctor: 5000, hospital: 1800 },
  },
  7: {
    name: 'Dr. Chinthaka Silva',
    firstName: 'Chinthaka Silva',
    specialty: 'Neurologist',
    specializedIn: 'Neurology',
    education: 'MBBS – University of Melbourne',
    experience: '9 Years of experience in neurology and brain disorders.',
    image: require('../../assets/doctor-booking images/Doctorimage7.jpeg'),
    hospitals: ['Nawaloka Hospital, Colombo', 'Durdans Hospital, Colombo'],
    reviews: [
      { stars: 4.5, text: 'Dr. Chinthaka is very knowledgeable and precise in his diagnosis.' },
      { stars: 5,   text: 'Excellent neurologist. He helped me manage my condition very well.' },
      { stars: 4.5, text: 'Very professional and attentive. I always feel well cared for.' },
      { stars: 5,   text: 'Great doctor. He explains complex conditions in a simple way.' },
      { stars: 5,   text: 'Dr. Chinthaka treated my chronic headaches effectively. Life has improved.' },
      { stars: 4.5, text: 'Very calm and methodical. His approach gave me confidence in my treatment.' },
    ],
    charges: { noShow: 550, booking: 320, doctor: 4000, hospital: 1400 },
  },
  8: {
    name: 'Dr. Malith Jayasinghe',
    firstName: 'Malith Jayasinghe',
    specialty: 'Cardiologist',
    specializedIn: 'Cardiology',
    education: 'MBBS – University of Sydney',
    experience: '5 Years of experience in cardiac care and treatment.',
    image: require('../../assets/doctor-booking images/Doctorimage8.jpeg'),
    hospitals: ['Asiri Hospital, Colombo', 'Lanka Hospital, Colombo'],
    reviews: [
      { stars: 5,   text: 'Dr. Malith is an excellent cardiologist. Very calm and reassuring.' },
      { stars: 4.5, text: 'Great experience. He diagnosed my issue quickly and accurately.' },
      { stars: 5,   text: 'Very caring and professional. I felt in safe hands throughout.' },
      { stars: 4.5, text: 'Highly recommend Dr. Malith for any cardiac concerns.' },
      { stars: 5,   text: 'Dr. Malith monitored my recovery closely and I am now fully recovered.' },
      { stars: 4.5, text: 'Very attentive cardiologist. He explained each step of my treatment plan.' },
    ],
    charges: { noShow: 500, booking: 300, doctor: 3400, hospital: 1200 },
  },
  9: {
    name: 'Dr. Monali Jayarathna',
    firstName: 'Monali Jayarathna',
    specialty: 'Psychiatrist',
    specializedIn: 'Psychiatry',
    education: 'MBBS – University of Mumbai',
    experience: '6 Years of experience in mental health and psychiatric care.',
    image: require('../../assets/doctor-booking images/Doctorimage9.jpeg'),
    hospitals: ['Durdans Hospital, Colombo', 'Nawaloka Hospital, Colombo'],
    reviews: [
      { stars: 5,   text: 'Dr. Monali is incredibly empathetic and supportive. Life changing!' },
      { stars: 5,   text: 'She creates a safe environment to talk. Highly recommend her care.' },
      { stars: 4.5, text: 'Exceptional psychiatrist. She really listens and understands deeply.' },
      { stars: 5,   text: 'My mental health has improved greatly thanks to Dr. Monali.' },
      { stars: 5,   text: 'Dr. Monali helped me through a very difficult period. Forever thankful.' },
      { stars: 4.5, text: 'Non-judgmental and deeply caring. She made me feel heard and understood.' },
    ],
    charges: { noShow: 500, booking: 300, doctor: 3800, hospital: 1300 },
  },
  10: {
    name: 'Dr. Sehansa Gamage',
    firstName: 'Sehansa Gamage',
    specialty: 'Dermatologist',
    specializedIn: 'Dermatology',
    education: 'MBBS – University of Madrid',
    experience: '3 Years of experience in skin care and dermatology.',
    image: require('../../assets/doctor-booking images/Doctorimage10.jpeg'),
    hospitals: ['Asiri Hospital, Colombo', 'Durdans Hospital, Colombo'],
    reviews: [
      { stars: 4.5, text: 'Dr. Sehansa treated my skin condition very effectively. Great results!' },
      { stars: 5,   text: 'Very thorough and knowledgeable about skin issues. Highly recommend.' },
      { stars: 4.5, text: 'She gave me a clear skincare plan and it worked wonderfully.' },
      { stars: 5,   text: 'Excellent dermatologist. My skin has never looked better!' },
      { stars: 5,   text: 'My chronic skin issue is finally resolved thanks to Dr. Sehansa. Amazing!' },
      { stars: 4.5, text: 'She prescribed the right treatment first try. Very efficient and helpful.' },
    ],
    charges: { noShow: 400, booking: 250, doctor: 2600, hospital: 950 },
  },
  11: {
    name: 'Dr. Nuwan Gunasekara',
    firstName: 'Nuwan Gunasekara',
    specialty: 'Physician',
    specializedIn: 'General Medicine',
    education: 'MBBS – University of Edinburgh',
    experience: '11 Years of experience in general medicine and patient care.',
    image: require('../../assets/doctor-booking images/Doctorimage11.jpeg'),
    hospitals: ['Lanka Hospital, Colombo', 'Nawaloka Hospital, Colombo'],
    reviews: [
      { stars: 5,   text: 'Dr. Nuwan is very experienced and thorough. Always feel better after.' },
      { stars: 4.5, text: 'Excellent physician. He takes time to understand your health properly.' },
      { stars: 5,   text: 'Very professional and knowledgeable. I trust him with my health fully.' },
      { stars: 4.5, text: 'Outstanding doctor. His diagnosis and treatment plans are always spot on.' },
      { stars: 5,   text: 'Dr. Nuwan found the root cause of my illness others had missed. Brilliant.' },
      { stars: 4.5, text: 'Very thorough examination and clear explanation. Highly recommend him.' },
    ],
    charges: { noShow: 450, booking: 280, doctor: 3100, hospital: 1050 },
  },
  12: {
    name: 'Dr. Vinu Jayawardena',
    firstName: 'Vinu Jayawardena',
    specialty: 'Dentist',
    specializedIn: 'Dental Care',
    education: 'MBBS – University of Toronto',
    experience: '15 Years of experience in dental care and oral health.',
    image: require('../../assets/doctor-booking images/Doctorimage12.jpeg'),
    hospitals: ['Asiri Hospital, Colombo', 'Durdans Hospital, Colombo'],
    reviews: [
      { stars: 5,   text: 'Dr. Vinu is the best dentist I have visited. Pain-free experience!' },
      { stars: 5,   text: 'Very gentle and professional. My teeth have never felt so clean.' },
      { stars: 4.5, text: 'Excellent dental care. He explained every step of the procedure.' },
      { stars: 5,   text: 'Highly recommend Dr. Vinu for any dental treatment. Outstanding!' },
      { stars: 5,   text: 'Dr. Vinu fixed my tooth with zero pain. Best dental experience I have had.' },
      { stars: 4.5, text: 'Very gentle technique and excellent results. I no longer fear the dentist.' },
    ],
    charges: { noShow: 350, booking: 200, doctor: 2400, hospital: 900 },
  },
};

// ─── DoctorProfilePage Component ─────────────────────────────────────────────
const DoctorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const doctor: DoctorData | undefined = doctorsData[parseInt(id ?? '0')];
  const [selectedHospital, setSelectedHospital] = useState<string>('');

  if (!doctor) {
    return <div style={{ padding: '60px', textAlign: 'center' }}>Doctor not found.</div>;
  }

  const total: number = doctor.charges.booking + doctor.charges.doctor + doctor.charges.hospital;

  return (
    <>
      <main className="profile-wrapper">
        <div className="container">
          <div className="profile-grid">

            <div className="left-col">
              <div className="photo-card">
                <img src={doctor.image} alt={doctor.name} className="doctor-photo" />
              </div>

              <div className="reviews-card">
                <h3 className="reviews-title">
                  <i className="fas fa-comment-alt"></i> Reviews
                </h3>
                <div className="reviews-grid">
                  {doctor.reviews.map((review: Review, i: number) => (
                    <div className="review-item" key={i}>
                      <div className="review-stars">
                        {[1, 2, 3, 4].map((s: number) => (
                          <i key={s} className="fas fa-star"></i>
                        ))}
                        {review.stars === 5
                          ? <i className="fas fa-star"></i>
                          : <i className="fas fa-star-half-alt"></i>
                        }
                      </div>
                      <p>{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="right-col">
              <div className="info-card">
                <div className="info-row">
                  <i className="fas fa-user-md"></i>
                  <div>
                    <span className="info-label">Name</span>
                    <span className="info-value">{doctor.firstName}</span>
                  </div>
                </div>
                <div className="info-row">
                  <i className="fas fa-stethoscope"></i>
                  <div>
                    <span className="info-label">Specialized In</span>
                    <span className="info-value">{doctor.specializedIn}</span>
                  </div>
                </div>
                <div className="info-row">
                  <i className="fas fa-graduation-cap"></i>
                  <div>
                    <span className="info-label">Education</span>
                    <span className="info-value">{doctor.education}</span>
                  </div>
                </div>
                <div className="info-row">
                  <i className="fas fa-briefcase-medical"></i>
                  <div>
                    <span className="info-label">Experience</span>
                    <span className="info-value">{doctor.experience}</span>
                  </div>
                </div>
              </div>

              <div className="section-card charges-card">
                <h3 className="section-card-title">
                  <i className="fas fa-receipt"></i> Charges Summary
                </h3>
                <div className="charge-row">
                  <span className="charge-label">
                    <span className="charge-icon no-show"><i className="fas fa-ban"></i></span>
                    No Show / Refund Fee
                  </span>
                  <span className="charge-value">Rs. {doctor.charges.noShow.toLocaleString()}.00</span>
                </div>
                <div className="charge-row">
                  <span className="charge-label">
                    <span className="charge-icon booking"><i className="fas fa-calendar-check"></i></span>
                    Booking Charge
                  </span>
                  <span className="charge-value">Rs. {doctor.charges.booking.toLocaleString()}.00</span>
                </div>
                <div className="charge-row">
                  <span className="charge-label">
                    <span className="charge-icon doctor-fee"><i className="fas fa-user-md"></i></span>
                    Doctor Charge
                  </span>
                  <span className="charge-value">Rs. {doctor.charges.doctor.toLocaleString()}.00</span>
                </div>
                <div className="charge-row">
                  <span className="charge-label">
                    <span className="charge-icon hospital-fee"><i className="fas fa-hospital"></i></span>
                    Hospital Charge
                  </span>
                  <span className="charge-value">Rs. {doctor.charges.hospital.toLocaleString()}.00</span>
                </div>
                <div className="charge-divider"></div>
                <div className="charge-row total-row">
                  <span className="charge-label total-label">
                    <span className="charge-icon total-fee"><i className="fas fa-coins"></i></span>
                    Total Amount
                  </span>
                  <span className="charge-value total-value">
                    Rs. {total.toLocaleString()}.00
                  </span>
                </div>
              </div>

              <div className="section-card hosp-section-card">
                <h3 className="section-card-title">
                  <i className="fas fa-hospital"></i> Available Hospitals
                </h3>
                <div className="hosp-channel-list">
                  {doctor.hospitals.map((hosp: string, i: number) => (
                    <div className="hosp-channel-group" key={i}>
                      <div className="hosp-channel-header">{hosp.toUpperCase()}</div>
                      <div className="hosp-channel-row">
                        <div className="hosp-channel-avatar">
                          <i className="fas fa-user-md"></i>
                        </div>
                        <div className="hosp-channel-info">
                          <span className="hosp-channel-name">{doctor.name}</span>
                          <span className="hosp-channel-specialty">{doctor.specialty}</span>
                        </div>
                        <button
                          className={'hosp-channel-btn' + (selectedHospital === hosp ? ' selected' : '')}
                          onClick={() => {
                            setSelectedHospital(hosp);
                            navigate(`/doctor/${id}/sessions`, {
                              state: { doctor: { ...doctor, id }, hospital: hosp },
                            });
                          }}
                        >
                          <i className="fas fa-stethoscope"></i> Channel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DoctorProfilePage;