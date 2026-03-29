import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/publiclayout';
import '../../styles/doctor-booking/DoctorPage.css';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  stars: number[];
  image: string;
}

interface StarRatingProps {
  stars: number[];
}

const fallbackDoctors: Doctor[] = [
  { id: 1, name: 'Dr. Sonali Perera', specialty: 'Cardiologist', rating: 4.8, reviews: 245, stars: [1, 1, 1, 1, 0.5], image: require('../../assets/doctor-booking images/Doctorimage1.jpeg') },
  { id: 2, name: 'Dr. Amal Fernando', specialty: 'Neurologist', rating: 5.0, reviews: 189, stars: [1, 1, 1, 1, 1], image: require('../../assets/doctor-booking images/Doctorimage2.jpeg') },
  { id: 3, name: 'Dr. Isuri Anupama', specialty: 'Pediatrician', rating: 5.0, reviews: 312, stars: [1, 1, 1, 1, 1], image: require('../../assets/doctor-booking images/Doctorimage3.jpeg') },
  { id: 4, name: 'Dr. Kasun Ranaweera', specialty: 'Physician', rating: 4.7, reviews: 198, stars: [1, 1, 1, 1, 0.5], image: require('../../assets/doctor-booking images/Doctorimage4.jpeg') },
  { id: 5, name: 'Dr. Mihiri Ranathunga', specialty: 'Cardiologist', rating: 4.5, reviews: 174, stars: [1, 1, 1, 1, 0.5], image: require('../../assets/doctor-booking images/Doctorimage5.jpeg') },
  { id: 6, name: 'Dr. Ann Perera', specialty: 'Eye Surgeon', rating: 4.9, reviews: 261, stars: [1, 1, 1, 1, 1], image: require('../../assets/doctor-booking images/Doctorimage6.jpeg') },
  { id: 7, name: 'Dr. Chinthaka Silva', specialty: 'Neurologist', rating: 4.3, reviews: 143, stars: [1, 1, 1, 1, 0.5], image: require('../../assets/doctor-booking images/Doctorimage7.jpeg') },
  { id: 8, name: 'Dr. Malith Jayasinghe', specialty: 'Cardiologist', rating: 4.6, reviews: 209, stars: [1, 1, 1, 1, 0.5], image: require('../../assets/doctor-booking images/Doctorimage8.jpeg') },
  { id: 9, name: 'Dr. Monali Jayarathna', specialty: 'Psychiatrist', rating: 4.8, reviews: 287, stars: [1, 1, 1, 1, 1], image: require('../../assets/doctor-booking images/Doctorimage9.jpeg') },
  { id: 10, name: 'Dr. Sehansa Gamage', specialty: 'Dermatologist', rating: 4.4, reviews: 156, stars: [1, 1, 1, 1, 0.5], image: require('../../assets/doctor-booking images/Doctorimage10.jpeg') },
  { id: 11, name: 'Dr. Nuwan Gunasekara', specialty: 'Physician', rating: 4.3, reviews: 132, stars: [1, 1, 1, 1, 0.5], image: require('../../assets/doctor-booking images/Doctorimage11.jpeg') },
  { id: 12, name: 'Dr. Vinu Jayawardena', specialty: 'Dentist', rating: 5.0, reviews: 340, stars: [1, 1, 1, 1, 1], image: require('../../assets/doctor-booking images/Doctorimage12.jpeg') },
];

const StarRating: React.FC<StarRatingProps> = ({ stars }) => (
  <div className="doc-rating">
    {stars.map((s, i) => (s === 1 ? <i key={i} className="fas fa-star"></i> : <i key={i} className="fas fa-star-half-alt"></i>))}
  </div>
);

const DoctorPage: React.FC = () => {
  const navigate = useNavigate();
  const [filterName, setFilterName] = useState<string>('');
  const [filterSpecialty, setFilterSpecialty] = useState<string>('All');

  const handleBack = (): void => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/');
  };

  const specialties: string[] = ['All', ...new Set(fallbackDoctors.map((d) => d.specialty))];
  const filteredDoctors = fallbackDoctors.filter((doc) => {
    const matchesName = doc.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'All' || doc.specialty === filterSpecialty;
    return matchesName && matchesSpecialty;
  });

  return (
    <PublicLayout>
      <main className="doctors-wrapper">
        <div className="container">
          <button type="button" className="page-back-button" onClick={handleBack} aria-label="Go back">
            <i className="fas fa-arrow-left"></i>
            <span>Back</span>
          </button>

          <div className="page-heading">
            <h2 className="page-title">
              Featured <span className="gradient-text">Doctors</span>
            </h2>
            <p className="page-subtitle">Top-rated specialists available now - book your appointment instantly</p>
          </div>

          <div className="filters-bar">
            <div className="filter-box">
              <i className="fas fa-user-md filter-box-icon"></i>
              <input
                type="text"
                className="filter-input"
                placeholder="Doctor - Max 20 Characters"
                maxLength={20}
                value={filterName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterName(e.target.value)}
              />
            </div>

            <div className="filter-box">
              <i className="fas fa-stethoscope filter-box-icon"></i>
              <select
                className="filter-select"
                value={filterSpecialty}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterSpecialty(e.target.value)}
              >
                {specialties.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'Any Specialization' : s}
                  </option>
                ))}
              </select>
              <i className="fas fa-chevron-down select-chevron"></i>
            </div>
          </div>

          <div className="doctors-grid">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc) => (
                <div className="doc-card" key={doc.id}>
                  <div className="doc-image">
                    <img src={doc.image} alt={doc.name} />
                  </div>
                  <div className="doc-info">
                    <h3 className="doc-name">{doc.name}</h3>
                    <span className="doc-specialty">{doc.specialty}</span>
                    <div className="doc-rating">
                      <StarRating stars={doc.stars} />
                      <span>
                        {doc.rating} ({doc.reviews} reviews)
                      </span>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => navigate(`/doctor-booking/doctor/${doc.id}/profile`)}>
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <i className="fas fa-user-md"></i>
                <p>No doctors found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </PublicLayout>
  );
};

export default DoctorPage;
