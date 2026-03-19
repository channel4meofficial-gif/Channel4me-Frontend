import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/doctor-booking/DoctorSessionsPage.css';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Session {
  date: string;
  day: string;
  time: string;
  appointments: number;
  status: 'AVAILABLE' | 'CANCELED';
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image?: string;
}

interface LocationState {
  doctor?: Doctor;
  hospital?: string;
}

interface SessionTemplates {
  [key: number]: Session[];
}

interface SpecialNotes {
  [key: number]: string;
}

// ─── Helper: generate upcoming dates dynamically ──────────────────────────────
const getUpcomingDates = (count: number): { date: string; day: string }[] => {
  const days   = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
  ];

  const results: { date: string; day: string }[] = [];
  const today = new Date();

  const d0 = new Date(today);
  results.push({
    date: `${months[d0.getMonth()]} ${String(d0.getDate()).padStart(2, '0')}, ${d0.getFullYear()}`,
    day:  days[d0.getDay()],
  });

  for (let i = 1; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i * 2);
    results.push({
      date: `${months[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}, ${d.getFullYear()}`,
      day:  days[d.getDay()],
    });
  }

  return results;
};

// ─── Session Data ─────────────────────────────────────────────────────────────
const generateSessions = (doctorId: number): Session[] => {
  const dates = getUpcomingDates(5);

  const sessionTemplates: SessionTemplates = {
    1:  [
      { ...dates[0], time: '12:00 PM', appointments: 0,  status: 'CANCELED'  },
      { ...dates[1], time: '04:00 PM', appointments: 14, status: 'AVAILABLE' },
      { ...dates[2], time: '05:00 PM', appointments: 4,  status: 'AVAILABLE' },
      { ...dates[3], time: '10:00 AM', appointments: 9,  status: 'AVAILABLE' },
      { ...dates[4], time: '09:00 AM', appointments: 5,  status: 'AVAILABLE' },
    ],
    2:  [
      { ...dates[0], time: '12:00 PM', appointments: 0,  status: 'CANCELED'  },
      { ...dates[1], time: '10:00 AM', appointments: 6,  status: 'AVAILABLE' },
      { ...dates[2], time: '04:00 PM', appointments: 14, status: 'AVAILABLE' },
      { ...dates[3], time: '11:00 AM', appointments: 3,  status: 'AVAILABLE' },
      { ...dates[4], time: '02:00 PM', appointments: 9,  status: 'AVAILABLE' },
    ],
    3:  [
      { ...dates[0], time: '12:00 PM', appointments: 0,  status: 'CANCELED'  },
      { ...dates[1], time: '09:00 AM', appointments: 18, status: 'AVAILABLE' },
      { ...dates[2], time: '01:00 PM', appointments: 7,  status: 'AVAILABLE' },
      { ...dates[3], time: '10:00 AM', appointments: 11, status: 'AVAILABLE' },
      { ...dates[4], time: '03:00 PM', appointments: 4,  status: 'AVAILABLE' },
    ],
    4:  [
      { ...dates[0], time: '12:00 PM', appointments: 0,  status: 'CANCELED'  },
      { ...dates[1], time: '08:00 AM', appointments: 22, status: 'AVAILABLE' },
      { ...dates[2], time: '05:00 PM', appointments: 16, status: 'AVAILABLE' },
      { ...dates[3], time: '09:00 AM', appointments: 10, status: 'AVAILABLE' },
      { ...dates[4], time: '11:00 AM', appointments: 8,  status: 'AVAILABLE' },
    ],
    5:  [
      { ...dates[0], time: '12:00 PM', appointments: 0,  status: 'CANCELED'  },
      { ...dates[1], time: '10:00 AM', appointments: 5,  status: 'AVAILABLE' },
      { ...dates[2], time: '03:00 PM', appointments: 13, status: 'AVAILABLE' },
      { ...dates[3], time: '09:00 AM', appointments: 7,  status: 'AVAILABLE' },
      { ...dates[4], time: '02:00 PM', appointments: 2,  status: 'AVAILABLE' },
    ],
    6:  [
      { ...dates[0], time: '12:00 PM', appointments: 0,  status: 'CANCELED'  },
      { ...dates[1], time: '11:00 AM', appointments: 8,  status: 'AVAILABLE' },
      { ...dates[2], time: '02:00 PM', appointments: 6,  status: 'AVAILABLE' },
      { ...dates[3], time: '10:00 AM', appointments: 15, status: 'AVAILABLE' },
      { ...dates[4], time: '01:00 PM', appointments: 4,  status: 'AVAILABLE' },
    ],
    7:  [
      { ...dates[0], time: '12:00 PM', appointments: 0,  status: 'CANCELED'  },
      { ...dates[1], time: '10:00 AM', appointments: 10, status: 'AVAILABLE' },
      { ...dates[2], time: '04:00 PM', appointments: 9,  status: 'AVAILABLE' },
      { ...dates[3], time: '09:00 AM', appointments: 18, status: 'AVAILABLE' },
      { ...dates[4], time: '02:00 PM', appointments: 6,  status: 'AVAILABLE' },
    ],
    8:  [
      { ...dates[0], time: '12:00 PM', appointments: 0,  status: 'CANCELED'  },
      { ...dates[1], time: '09:00 AM', appointments: 11, status: 'AVAILABLE' },
      { ...dates[2], time: '03:00 PM', appointments: 7,  status: 'AVAILABLE' },
      { ...dates[3], time: '10:00 AM', appointments: 14, status: 'AVAILABLE' },
      { ...dates[4], time: '04:00 PM', appointments: 3,  status: 'AVAILABLE' },
    ],
    9:  [
      { ...dates[0], time: '12:00 PM', appointments: 0,  status: 'CANCELED'  },
      { ...dates[1], time: '11:00 AM', appointments: 4,  status: 'AVAILABLE' },
      { ...dates[2], time: '05:00 PM', appointments: 8,  status: 'AVAILABLE' },
      { ...dates[3], time: '10:00 AM', appointments: 6,  status: 'AVAILABLE' },
      { ...dates[4], time: '02:00 PM', appointments: 12, status: 'AVAILABLE' },
    ],
    10: [
      { ...dates[0], time: '12:00 PM', appointments: 0,  status: 'CANCELED'  },
      { ...dates[1], time: '10:00 AM', appointments: 7,  status: 'AVAILABLE' },
      { ...dates[2], time: '01:00 PM', appointments: 15, status: 'AVAILABLE' },
      { ...dates[3], time: '09:00 AM', appointments: 5,  status: 'AVAILABLE' },
      { ...dates[4], time: '03:00 PM', appointments: 9,  status: 'AVAILABLE' },
    ],
    11: [
      { ...dates[0], time: '12:00 PM', appointments: 0,  status: 'CANCELED'  },
      { ...dates[1], time: '08:00 AM', appointments: 20, status: 'AVAILABLE' },
      { ...dates[2], time: '04:00 PM', appointments: 13, status: 'AVAILABLE' },
      { ...dates[3], time: '09:00 AM', appointments: 8,  status: 'AVAILABLE' },
      { ...dates[4], time: '11:00 AM', appointments: 4,  status: 'AVAILABLE' },
    ],
    12: [
      { ...dates[0], time: '12:00 PM', appointments: 0,  status: 'CANCELED'  },
      { ...dates[1], time: '09:00 AM', appointments: 6,  status: 'AVAILABLE' },
      { ...dates[2], time: '02:00 PM', appointments: 10, status: 'AVAILABLE' },
      { ...dates[3], time: '10:00 AM', appointments: 7,  status: 'AVAILABLE' },
      { ...dates[4], time: '04:00 PM', appointments: 3,  status: 'AVAILABLE' },
    ],
  };

  return sessionTemplates[doctorId] || [];
};

// ─── Special Notes ────────────────────────────────────────────────────────────
const specialNotes: SpecialNotes = {
  1:  'Pending appointments will be accepted right after 1st Two paid appointments only',
  2:  'Please bring previous neurological reports. Consultation strictly by appointment.',
  3:  'Child must be accompanied by a parent or guardian at all times during consultation.',
  4:  'General consultations available daily. Walk-ins accepted after scheduled patients.',
  5:  'Please fast for 4 hours before appointment if ECG or blood tests are required.',
  6:  'Bring your previous eye prescriptions and avoid wearing contact lenses on visit day.',
  7:  'Neurological assessments may take longer. Please allocate at least 1 hour.',
  8:  'Cardiac patients please bring all previous reports and medication list.',
  9:  'Sessions are confidential. Please arrive on time to ensure full consultation.',
  10: 'Skin patch tests may be conducted. Avoid applying creams on the day of visit.',
  11: 'Accepting new patients. Referral letters welcomed but not mandatory.',
  12: 'X-rays may be taken during consultation. Please inform of any dental allergies.',
};

// ─── DoctorSessionsPage Component ────────────────────────────────────────────
const DoctorSessionsPage: React.FC = () => {
  const { state } = useLocation() as { state: LocationState | null };
  const navigate  = useNavigate();

  const doctor: Doctor      = state?.doctor   || { id: 0, name: '', specialty: '' };
  const hospital: string    = state?.hospital || '';
  const sessions: Session[] = generateSessions(doctor.id);
  const note: string        = specialNotes[doctor.id] || '';

  const [expanded, setExpanded] = useState<boolean>(true);

  const handleBook = (s: Session): void => {
    navigate('/doctor-booking/book', {
      state: { doctor, selectedHospital: hospital, date: s.date, time: s.time },
    });
  };

  return (
    <div className="sp-page">
      <main className="sp-main">
        <div className="sp-container">

          <div className="sp-doc-card">
            <div className="sp-doc-hosp-bar">{hospital.toUpperCase()}</div>
            <div className="sp-doc-body">
              <div className="sp-doc-avatar">
                {doctor.image
                  ? <img src={doctor.image} alt={doctor.name} />
                  : <i className="fas fa-user-md"></i>}
              </div>
              <div className="sp-doc-details">
                <p className="sp-doc-name">{doctor.name}</p>
                <p className="sp-doc-spec">{doctor.specialty}</p>
                {note && (
                  <p className="sp-doc-note">
                    <span className="sp-note-lbl">Special Notes: </span>
                    <span className="sp-note-val">
                      {hospital.split(',')[0].trim()} – {note}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="sp-sess-bar">
            <i className="far fa-clock"></i>
            <span>{hospital.toUpperCase()} SESSIONS</span>
          </div>

          <div className="sp-group">
            <div className="sp-group-title" onClick={() => setExpanded((v: boolean) => !v)}>
              <div className="sp-group-title-left">
                <span className="sp-group-redbar"></span>
                <i className="fas fa-stethoscope sp-group-ico"></i>
                <div>
                  <span className="sp-group-spec">{doctor.specialty?.toUpperCase()}</span>
                  <span className="sp-group-cnt">{sessions.length} SESSIONS</span>
                </div>
              </div>
              <i className={`fas fa-chevron-${expanded ? 'up' : 'down'} sp-group-chev`}></i>
            </div>

            {expanded && sessions.map((s: Session, i: number) => {
              const canceled: boolean = s.status === 'CANCELED';
              return (
                <div className={`sp-row ${canceled ? 'sp-row-canceled' : ''}`} key={i}>
                  <div className={`sp-row-accent ${canceled ? 'sp-accent-gray' : 'sp-accent-red'}`}></div>
                  <div className="sp-col-date">
                    <span className="sp-date-sm">{s.date}</span>
                    <span className={`sp-daytime ${canceled ? 'sp-daytime-gray' : 'sp-daytime-red'}`}>
                      {s.day} {s.time}
                    </span>
                  </div>
                  <div className="sp-col-appt">
                    <span className="sp-appt-lbl">ACTIVE APPOINTMENTS</span>
                    <span className={`sp-appt-num ${canceled ? 'sp-num-gray' : 'sp-num-red'}`}>
                      {String(s.appointments).padStart(2, '0')}
                    </span>
                  </div>
                  <button
                    className={`sp-book-btn ${canceled ? 'sp-book-disabled' : 'sp-book-active'}`}
                    onClick={() => !canceled && handleBook(s)}
                    disabled={canceled}
                    type="button"
                  >
                    <i className="fas fa-bookmark"></i> Book
                  </button>
                  <span className={`sp-status-txt ${canceled ? 'sp-txt-gray' : 'sp-txt-green'}`}>
                    {s.status}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </main>
    </div>
  );
};

export default DoctorSessionsPage;
