import React, { useState } from 'react';
import '../../../styles/doctor/dashboard/EPrescription.css';
import { useNavigate } from 'react-router-dom';
import DoctorSidebar from './DoctorSidebar';
import Header from '../../../components/ui/header/header';
import Footer from '../../../components/ui/footer/footer';

const EPrescription: React.FC = () => {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [patientID, setPatientID] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [medications, setMedications] = useState([{ name: '', dosage: '', frequency: '', duration: '' }]);
  const [notes, setNotes] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !age || !patientID) {
      setErrorMessage('Please fill in required patient details.');
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const formData = new FormData();
      formData.append('patientId', patientID);
      formData.append('patientName', patientName);
      formData.append('patientAge', age);
      formData.append('date', date);
      formData.append('additionalFeedback', notes);
      const formattedMedicines = medications.map(med => ({
        drugName: med.name,
        dosageMg: parseInt(med.dosage.replace(/\D/g, '')) || 0,
        frequency: med.frequency,
        duration: med.duration
      }));

      formData.append('medicines', JSON.stringify(formattedMedicines));
      if (imageFile) {
        formData.append('medicationPicture', imageFile);
      }

      const response = await fetch('http://localhost:5000/api/v1/prescriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });

      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to successfully issue prescription.');
      }
      
      alert('E-Prescription saved and sent to patient successfully!');
      navigate('/doctor/dashboard');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="eprescription-layout">
        {/* Sidebar */}
        <DoctorSidebar />

        <main className="main-content">
          <header className="page-header">
            <h1>Issue E-Prescription</h1>
            <p>Create and send digital prescriptions to your patients securely.</p>
          </header>

          <section className="prescription-form-container">
            {errorMessage && <p style={{ color: '#dc2626', marginBottom: '16px' }}>{errorMessage}</p>}
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

              <div className="section-title">Medication Picture (Optional)</div>
              <div className="form-group full-width">
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleImageChange}
                  style={{ padding: '8px 0' }}
                />
                {imageFile && <p style={{ fontSize: '0.85rem', color: '#666' }}>Selected file: {imageFile.name}</p>}
              </div>

              <div className="form-actions">
                <button type="button" className="action-btn cancel" onClick={() => navigate('/doctor/dashboard')} disabled={isSubmitting}>Cancel</button>
                <button type="submit" className="action-btn submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Generate Prescription'}
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default EPrescription;
