import { useState } from "react";
import { Link } from "react-router-dom";
import "./PatientProfile.css";

/* ── Static data ─────────────────────────────────────────── */
const patientData = {
  name: "Cristiano Ronaldo",
  age: 40,
  location: "Riyadh, Saudi Arabia",
  image: "https://randomuser.me/api/portraits/men/75.jpg",

  emergency: {
    guardianName: "Dolores Aveiro",
    contactNumber1: "0778518614",
    contactNumber2: "0742107576",
  },

  appointments: [
    { time: "5.00 pm", hospital: "Roseth Hospital", doctor: "Dr Sudarshan" },
  ],

  healthConditions: [
    "Blood Sugar Level - 85mg/dL",
    "Cholesterol - 200 mg/dL",
    "Cholesterol - 200 mg/dL",
    "Thyroid Disorders - 4.0 mIU/L",
  ],

  doctorFeedback: [
    "I've reviewed your case and prescribed the needed medicine. Please follow the instructions in the app. - Dr. prasad",
    "Your consultation is complete, and your medication has been updated. Follow the steps shown in the app. - Dr. Nalin",
  ],
};

const NAV_LINKS = ["Home", "About Us", "How to use"];

const FOOTER_COLS = [
  { title: "Product", links: ["Features", "Pricing", "Case Studies", "Reviews", "Updates"] },
  { title: "Company", links: ["About", "Contact us", "Careers", "Culture", "Blog"] },
  { title: "Support", links: ["Getting started", "Help center", "Server status", "Report a bug", "Chat support"] },
  { title: "Contact us", links: ["contact@company.com", "(206) 687 - 5892", "794 Mcallister St, SF 94102"] },
];

/* ── Sub-components ──────────────────────────────────────── */
function Dot({ color = "blue" }) {
  return <span className={`pp-dot pp-dot-${color}`} />;
}

function LogoIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#eef2ff" />
      <path d="M20 10 C14 10 10 14 10 20 S14 30 20 30 30 26 30 20 26 10 20 10Z"
        stroke="#667eea" strokeWidth="2" fill="none" />
      <path d="M20 14 V26 M14 20 H26" stroke="#667eea" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ── Main Component ──────────────────────────────────────── */
export default function PatientProfile() {
  const [activeNav, setActiveNav] = useState("Home");
  const { name, age, location, image, emergency, appointments, healthConditions, doctorFeedback } =
    patientData;

  return (
    <div className="pp-page">

      {/* ══ HEADER ══ */}
      <header className="pp-header">
        <Link to="/" className="pp-logo">
          <LogoIcon size={32} />
          <span className="pp-logo-text">Channel<span>4</span>Me</span>
        </Link>

        <nav className="pp-nav">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className={`pp-nav-link ${activeNav === link ? "pp-active" : ""}`}
              onClick={() => setActiveNav(link)}
            >
              {link}
            </button>
          ))}
        </nav>

        <div className="pp-avatar-wrap">
          <img src={image} alt="avatar" className="pp-avatar" />
        </div>
      </header>

      {/* ══ MAIN ══ */}
      <main className="pp-main">

        {/* Top Row: Profile + Right Cards */}
        <div className="pp-top-grid">

          {/* Patient Profile Card */}
          <div className="pp-card">
            <div className="pp-profile-img-wrap">
              <img src={image} alt={name} className="pp-profile-img" />
            </div>
            <p className="pp-profile-name">{name}</p>
            <p className="pp-profile-age">Age {age}</p>
            <div className="pp-profile-location">
              <PinIcon />
              <span className="pp-location-text">{location}</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="pp-right-col">

            {/* Emergency Contact */}
            <div className="pp-card">
              <h3 className="pp-section-title">Emergency Contact</h3>
              <div className="pp-contact-list">
                <div className="pp-contact-row">
                  <Dot color="blue" />
                  <span className="pp-contact-label">Guardian Name</span>
                  <span className="pp-contact-colon">:</span>
                  <span className="pp-contact-value">{emergency.guardianName}</span>
                </div>
                <div className="pp-contact-row">
                  <Dot color="blue" />
                  <span className="pp-contact-label">Contact Number1</span>
                  <span className="pp-contact-colon">:</span>
                  <span className="pp-contact-value">{emergency.contactNumber1}</span>
                </div>
                <div className="pp-contact-row">
                  <Dot color="blue" />
                  <span className="pp-contact-label">Contact Number2</span>
                  <span className="pp-contact-colon">:</span>
                  <span className="pp-contact-value">{emergency.contactNumber2}</span>
                </div>
              </div>
            </div>

            {/* Up-coming Appointments */}
            <div className="pp-card">
              <h3 className="pp-section-title">Up-comming appointments</h3>
              <div className="pp-apt-list">
                {appointments.map((apt, i) => (
                  <div key={i} className="pp-apt-row">
                    <Dot color="purple" />
                    <span>{apt.time} at {apt.hospital}. {apt.doctor}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Health Conditions */}
        <div className="pp-card">
          <h3 className="pp-section-title">Health Conditions (Last Time Sync)</h3>
          <div className="pp-health-grid">
            {healthConditions.map((condition, i) => (
              <div key={i} className="pp-health-row">
                <Dot color="blue" />
                <span>{condition}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Feedback */}
        <div className="pp-card">
          <h3 className="pp-section-title">Doctor Feedback</h3>
          <div className="pp-feedback-list">
            {doctorFeedback.map((feedback, i) => (
              <div key={i} className="pp-feedback-row">
                <Dot color="blue" />
                <span>{feedback}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* ══ FOOTER ══ */}
      <footer className="pp-footer">
        <div className="pp-footer-top">
          {/* Brand column */}
          <div>
            <p className="pp-footer-lorem">
              Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
            </p>
            <div className="pp-social-row">
              {["f", "𝕏", "in", "▶"].map((ic, i) => (
                <button key={i} className="pp-social-btn">{ic}</button>
              ))}
            </div>
            <div className="pp-footer-logo-wrap">
              <LogoIcon size={24} />
              <span className="pp-logo-text">Channel<span>4</span>Me</span>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="pp-footer-col-title">{col.title}</h4>
              <ul className="pp-footer-list">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="pp-footer-link">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pp-footer-bottom">
          <span className="pp-footer-copy">Copyright © 2022</span>
          <div className="pp-footer-bottom-links">
            <a href="#" className="pp-footer-link">Terms and Conditions</a>
            <span className="pp-footer-divider">|</span>
            <a href="#" className="pp-footer-link">Privacy Policy</a>
          </div>
          <span className="pp-footer-copy">All Rights Reserved</span>
        </div>
      </footer>

    </div>
  );
}
