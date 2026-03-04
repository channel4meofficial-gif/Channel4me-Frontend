import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const doctorData = {
  name: "DR. Sudarshan",
  age: 35,
  location: "Galle, Ambalangoda",
  image: "https://randomuser.me/api/portraits/men/32.jpg",
  emergency: [
    { label: "Contact Number 1", value: "0778518614" },
    { label: "Contact Number 2", value: "0742107576" },
  ],
  appointments: [
    { time: "5.00 pm", hospital: "Roseth Hospital", patient: "Patient Ronaldo" },
    { time: "6.00 pm", hospital: "Heams Hospital", patient: "Patient Virat" },
  ],
  schedule: [
    { day: "Monday", hours: "8.00am to 5.00pm" },
    { day: "Tuesday", hours: "8.00am to 5.00pm" },
    { day: "Thursday", hours: "8.00am to 5.00pm" },
    { day: "Friday", hours: "8.00am to 5.00pm" },
  ],
};

const NAV_LINKS = ["Home", "About Us", "How to use"];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
.dd-page{font-family:'Poppins',sans-serif;background:#f8fafc;min-height:100vh;display:flex;flex-direction:column;}
.dd-header{background:#fff;padding:12px 40px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 2px 12px rgba(0,0,0,.07);position:sticky;top:0;z-index:100;}
.dd-logo{display:flex;align-items:center;gap:10px;}
.dd-logo-text{font-size:20px;font-weight:700;color:#1e293b;letter-spacing:-.5px;}
.dd-logo-text span{color:#667eea;}
.dd-nav{display:flex;gap:32px;}
.dd-nav-link{background:none;border:none;border-bottom:2px solid transparent;padding:6px 0;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s;font-family:'Poppins',sans-serif;color:#475569;}
.dd-nav-link:hover{color:#667eea;}
.dd-nav-link.active{color:#667eea;border-bottom:2px solid #667eea;}
.dd-avatar-wrap{width:40px;height:40px;border-radius:50%;overflow:hidden;border:2px solid #e2e8f0;}
.dd-avatar{width:100%;height:100%;object-fit:cover;}
.dd-main{flex:1;padding:32px 40px;max-width:960px;margin:0 auto;width:100%;}
.dd-grid{display:grid;grid-template-columns:200px 1fr;gap:20px;}
.dd-card{background:#fff;border-radius:16px;padding:24px;box-shadow:0 4px 20px rgba(0,0,0,.05);}
.dd-card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;}
.dd-card-title{font-size:15px;font-weight:600;color:#1e293b;margin:0;}
.dd-doc-img-wrap{width:100px;height:120px;border-radius:12px;overflow:hidden;margin:0 auto 14px;border:3px solid #eef2ff;}
.dd-doc-img{width:100%;height:100%;object-fit:cover;}
.dd-doc-name{font-size:14px;font-weight:700;color:#1e293b;text-align:center;margin:0 0 4px;}
.dd-doc-age{font-size:12px;color:#64748b;text-align:center;margin:0 0 8px;}
.dd-loc-row{display:flex;align-items:center;gap:5px;justify-content:center;margin-bottom:16px;}
.dd-loc-text{font-size:11px;color:#64748b;}
.dd-btn{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none;border-radius:50px;padding:8px 20px;font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;margin:0 auto;font-family:'Poppins',sans-serif;transition:transform .2s,box-shadow .2s;}
.dd-btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(102,126,234,.35);}
.dd-btn-sm{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none;border-radius:50px;padding:5px 14px;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:5px;font-family:'Poppins',sans-serif;transition:transform .2s,box-shadow .2s;}
.dd-btn-sm:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(102,126,234,.3);}
.dd-btn-absent{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none;border-radius:50px;padding:6px 18px;font-size:12px;font-weight:600;cursor:pointer;font-family:'Poppins',sans-serif;transition:transform .2s,box-shadow .2s;}
.dd-btn-absent:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(102,126,234,.3);}
.dd-btn-cancel{background:#f1f5f9;color:#475569;border:none;border-radius:50px;padding:8px 20px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Poppins',sans-serif;}
.dd-btn-cancel:hover{background:#e2e8f0;}
.dd-right-col{display:flex;flex-direction:column;gap:16px;}
.dd-contact-list{display:flex;flex-direction:column;gap:12px;}
.dd-contact-row{display:flex;align-items:center;gap:10px;}
.dd-contact-label{font-size:13px;color:#475569;font-weight:500;min-width:140px;}
.dd-contact-value{font-size:13px;color:#1e293b;font-weight:600;}
.dd-contact-input{font-size:13px;padding:4px 10px;border:1px solid #cbd5e1;border-radius:8px;font-family:'Poppins',sans-serif;outline:none;}
.dd-contact-input:focus{border-color:#667eea;}
.dd-dot{display:inline-block;width:10px;height:10px;border-radius:50%;flex-shrink:0;}
.dd-dot-green{background:#4ade80;}
.dd-dot-purple{background:#667eea;}
.dd-apt-list{display:flex;flex-direction:column;gap:12px;margin-top:8px;}
.dd-apt-row{display:flex;align-items:flex-start;gap:10px;}
.dd-apt-text{font-size:13px;color:#1e293b;line-height:1.5;}
.dd-apt-text .muted{color:#64748b;}
.dd-schedule-card{margin-top:24px;}
.dd-schedule-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px;}
.dd-schedule-row{display:flex;align-items:center;gap:10px;}
.dd-schedule-text{font-size:13px;color:#1e293b;}
.dd-footer{background:#0f172a;color:#fff;padding:48px 40px 24px;margin-top:auto;}
.dd-footer-top{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr 1.2fr;gap:32px;margin-bottom:40px;}
.dd-footer-lorem{font-size:12px;color:#94a3b8;line-height:1.6;margin-bottom:16px;}
.dd-social-row{display:flex;gap:10px;}
.dd-social-btn{width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.1);color:#fff;border:none;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;}
.dd-social-btn:hover{background:#667eea;}
.dd-footer-logo-wrap{display:flex;align-items:center;gap:10px;margin-top:16px;}
.dd-footer-col-title{font-size:13px;font-weight:600;margin-bottom:16px;color:#fff;}
.dd-footer-list{list-style:none;padding:0;margin:0;}
.dd-footer-list li{margin-bottom:10px;}
.dd-footer-link{color:#94a3b8;text-decoration:none;font-size:12px;}
.dd-footer-link:hover{color:#fff;}
.dd-footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:20px;display:flex;justify-content:space-between;align-items:center;}
.dd-footer-copy{font-size:12px;color:#64748b;}
.dd-footer-bottom-links{display:flex;gap:12px;align-items:center;}
.dd-footer-divider{color:#94a3b8;font-size:12px;}
.dd-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;z-index:200;}
.dd-modal{background:#fff;border-radius:16px;padding:32px;min-width:300px;box-shadow:0 20px 60px rgba(0,0,0,.2);}
.dd-modal h3{margin-bottom:16px;color:#1e293b;font-size:16px;}
.dd-date-input{width:100%;padding:10px 14px;border:1px solid #cbd5e1;border-radius:10px;font-size:14px;font-family:'Poppins',sans-serif;outline:none;margin-bottom:16px;}
.dd-date-input:focus{border-color:#667eea;}
.dd-modal-buttons{display:flex;gap:12px;justify-content:flex-end;}
@media(max-width:768px){
  .dd-header{padding:12px 20px;}
  .dd-nav{display:none;}
  .dd-main{padding:20px 16px;}
  .dd-grid{grid-template-columns:1fr;}
  .dd-footer-top{grid-template-columns:1fr 1fr;}
  .dd-schedule-grid{grid-template-columns:1fr;}
  .dd-footer-bottom{flex-direction:column;gap:10px;text-align:center;}
}
@media(max-width:480px){.dd-footer-top{grid-template-columns:1fr;}}
`;

function Dot({ color = "green" }) {
  return <span className={`dd-dot dd-dot-${color}`} />;
}

function PencilIcon({ size = 13, stroke = "white" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="2.5" strokeLinecap="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#667eea" strokeWidth="2" strokeLinecap="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function DoctorDashboard() {
  const [activeNav, setActiveNav] = useState("Home");
  const [editingEmergency, setEditingEmergency] = useState(false);
  const [contacts, setContacts] = useState(doctorData.emergency);
  const [showAbsentModal, setShowAbsentModal] = useState(false);

  useEffect(() => {
    const tag = document.createElement("style");
    tag.innerHTML = css;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  const handleContactChange = (i, value) => {
    const updated = [...contacts];
    updated[i] = { ...updated[i], value };
    setContacts(updated);
  };

  return (
    <div className="dd-page">

      {/* HEADER */}
      <header className="dd-header">
        <div className="dd-logo">
          <LogoIcon size={32} />
          <span className="dd-logo-text">Channel<span>4</span>Me</span>
        </div>
        <nav className="dd-nav">
          {NAV_LINKS.map((link) => (
            <button key={link}
              className={`dd-nav-link ${activeNav === link ? "active" : ""}`}
              onClick={() => setActiveNav(link)}>
              {link}
            </button>
          ))}
        </nav>
        <div className="dd-avatar-wrap">
          <img src={doctorData.image} alt="avatar" className="dd-avatar" />
        </div>
      </header>

      {/* MAIN */}
      <main className="dd-main">
        <div className="dd-grid">

          {/* Doctor Profile */}
          <div className="dd-card">
            <div className="dd-doc-img-wrap">
              <img src={doctorData.image} alt="Doctor" className="dd-doc-img" />
            </div>
            <h2 className="dd-doc-name">{doctorData.name}</h2>
            <p className="dd-doc-age">Age {doctorData.age}</p>
            <div className="dd-loc-row">
              <PinIcon />
              <span className="dd-loc-text">{doctorData.location}</span>
            </div>
            <button className="dd-btn"><PencilIcon /> Edit</button>
          </div>

          {/* Right Column */}
          <div className="dd-right-col">

            {/* Emergency Contact */}
            <div className="dd-card">
              <div className="dd-card-header">
                <h3 className="dd-card-title">Emergency Contact</h3>
                <button className="dd-btn-sm"
                  onClick={() => setEditingEmergency(!editingEmergency)}>
                  <PencilIcon size={12} /> Edit
                </button>
              </div>
              <div className="dd-contact-list">
                {contacts.map((c, i) => (
                  <div key={i} className="dd-contact-row">
                    <Dot color="green" />
                    <span className="dd-contact-label">{c.label} :</span>
                    {editingEmergency
                      ? <input className="dd-contact-input" value={c.value}
                        onChange={(e) => handleContactChange(i, e.target.value)} />
                      : <span className="dd-contact-value">{c.value}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Appointments */}
            <div className="dd-card">
              <div className="dd-card-header">
                <h3 className="dd-card-title">Up-coming appointments</h3>
              </div>
              <div className="dd-apt-list">
                {doctorData.appointments.map((apt, i) => (
                  <div key={i} className="dd-apt-row">
                    <Dot color="purple" />
                    <span className="dd-apt-text">
                      <strong>{apt.time}</strong> at {apt.hospital}.{" "}
                      <span className="muted">{apt.patient}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Schedule */}
        <div className="dd-card dd-schedule-card">
          <div className="dd-card-header">
            <h3 className="dd-card-title">Working days and times</h3>
            <button className="dd-btn-absent" onClick={() => setShowAbsentModal(true)}>
              Absent Date
            </button>
          </div>
          <div className="dd-schedule-grid">
            {doctorData.schedule.map((s, i) => (
              <div key={i} className="dd-schedule-row">
                <Dot color="green" />
                <span className="dd-schedule-text">
                  <strong>{s.day}</strong> - {s.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="dd-footer">
        <div className="dd-footer-top">
          <div>
            <p className="dd-footer-lorem">
              Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
            </p>
            <div className="dd-social-row">
              {["f", "𝕏", "in", "▶"].map((ic, i) => (
                <button key={i} className="dd-social-btn">{ic}</button>
              ))}
            </div>
            <div className="dd-footer-logo-wrap">
              <LogoIcon size={24} />
              <span className="dd-logo-text">Channel<span>4</span>Me</span>
            </div>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Case Studies", "Reviews", "Updates"], patientLink: true },
            { title: "Company", links: ["About", "Contact us", "Careers", "Culture", "Blog"] },
            { title: "Support", links: ["Getting started", "Help center", "Server status", "Report a bug", "Chat support"] },
            { title: "Contacts us", links: ["contact@company.com", "(206) 687 - 5892", "794 Mcallister St, SF 94102"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="dd-footer-col-title">{col.title}</h4>
              <ul className="dd-footer-list">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="dd-footer-link">{l}</a></li>
                ))}
                {col.patientLink && (
                  <li>
                    <Link to="/" className="dd-footer-link" style={{ color: "#a78bfa", fontWeight: 600 }}>
                      👤 Patient Profile
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="dd-footer-bottom">
          <span className="dd-footer-copy">Copyright © 2022</span>
          <div className="dd-footer-bottom-links">
            <a href="#" className="dd-footer-link">Terms and Conditions</a>
            <span className="dd-footer-divider">|</span>
            <a href="#" className="dd-footer-link">Privacy Policy</a>
          </div>
          <span className="dd-footer-copy">All Rights Reserved</span>
        </div>
      </footer>

      {/* ABSENT DATE MODAL */}
      {showAbsentModal && (
        <div className="dd-modal-overlay" onClick={() => setShowAbsentModal(false)}>
          <div className="dd-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Mark Absent Date</h3>
            <input type="date" className="dd-date-input" />
            <div className="dd-modal-buttons">
              <button className="dd-btn-cancel" onClick={() => setShowAbsentModal(false)}>
                Cancel
              </button>
              <button className="dd-btn" onClick={() => setShowAbsentModal(false)}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
