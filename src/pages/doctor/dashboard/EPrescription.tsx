import React, { useState } from 'react';
import '../../../styles/doctor/dashboard/EPrescription.css';
import { useNavigate } from 'react-router-dom';

const EPrescription: React.FC = () => {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [patientID, setPatientID] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [medications, setMedications] = useState([{ name: '', dosage: '', frequency: '', duration: '' }]);
  const [notes, setNotes] = useState('');

  const handleAddMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const handleMedicationChange = (index: number, field: string, value: string) => {
    const updatedMeds = [...medications];
    updatedMeds[index] = { ...updatedMeds[index], [field]: value };
    setMedications(updatedMeds);
  };

  const handleRemoveMedication = (index: number) => {
    const updatedMeds = medications.filter((_, i) => i !== index);
    setMedications(updatedMeds);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('E-Prescription saved and sent to patient successfully!');
    // Real implementation would save to DB here
  };

  return (
    <div className="eprescription-layout">
      {/* Sidebar - Reusing standard layout visually if desired, or simple back navigation */}
      <aside className="sidebar">
        <span className="nav-label">Main Menu</span>
        <a
          className="nav-item"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/doctor/dashboard');
          }}
        >
          <span className="nav-icon">🏠</span> Dashboard
        </a>
        <a
          className="nav-item"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/doctor/dashboard/appointments');
          }}
        >
          <span className="nav-icon">📅</span> Appointments
        </a>
        <a
          className="nav-item"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/doctor/dashboard/patients');
          }}
        >
          <span className="nav-icon">👥</span> My Patients
        </a>
        <a className="nav-item active" href="#">
          <span className="nav-icon">📝</span> E-Prescription
        </a>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <h1>Issue E-Prescription</h1>
          <p>Create and send digital prescriptions to your patients securely.</p>
        </header>

        <section className="prescription-form-container">
          <form className="prescription-form" onSubmit={handleSubmit}>

            <div className="section-title">Patient Details</div>
            <div className="form-row">
              <div className="form-group">
                <label>Patient Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 34"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Patient ID</label>
                <input
                  type="text"
                  value={patientID}
                  onChange={(e) => setPatientID(e.target.value)}
                  placeholder="e.g. ID1"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="section-title">Medications</div>

            {medications.map((med, index) => (
              <div className="medication-row" key={index}>
                <div className="med-input-group name-group">
                  <label>Drug Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Amoxicillin"
                    value={med.name}
                    onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="med-input-group">
                  <label>Dosage</label>
                  <input
                    type="text"
                    placeholder="e.g. 500mg"
                    value={med.dosage}
                    onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                    required
                  />
                </div>
                <div className="med-input-group">
                  <label>Frequency</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 times a day"
                    value={med.frequency}
                    onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                    required
                  />
                </div>
                <div className="med-input-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 days"
                    value={med.duration}
                    onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                    required
                  />
                </div>
                {medications.length > 1 && (
                  <button type="button" className="remove-med-btn" onClick={() => handleRemoveMedication(index)}>
                    ✖
                  </button>
                )}
              </div>
            ))}

            <button type="button" className="add-med-btn" onClick={handleAddMedication}>
              + Add Medication
            </button>

            <div className="section-title">Additional Notes / Instructions</div>
            <div className="form-group full-width">
              <textarea
                rows={4}
                placeholder="E.g. Take after meals, avoid cold water..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="button" className="action-btn cancel" onClick={() => navigate('/doctor/dashboard')}>Cancel</button>
              <button type="submit" className="action-btn submit">Generate Prescription</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default EPrescription;
