import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/publiclayout';
import '../../styles/doctor-booking/DoctorPage.css';
import { getDoctors, ApiDoctor } from '../../services/doctorService';

// ─── Types ───────────────────────────────────────────────────────────────────
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

// ─── Local fallback Doctor Data ──────────────────────────────────────────────
// Used when the backend returns no doctors (e.g., empty DB during development)
const fallbackDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sonali Perera',
    specialty: 'Cardiologist',
    rating: 4.8,
    reviews: 245,
    stars: [1, 1, 1, 1, 0.5],
    image: require('../../assets/doctor-booking images/Doctorimage1.jpeg'),
  },
  {
    id: 2,
    name: 'Dr. Amal Fernando',
    specialty: 'Neurologist',
    rating: 5.0,
    reviews: 189,
    stars: [1, 1, 1, 1, 1],
    image: require('../../assets/doctor-booking images/Doctorimage2.jpeg'),
  },
  {
    id: 3,
    name: 'Dr. Isuri Anupama',
    specialty: 'Pediatrician',
    rating: 5.0,
    reviews: 312,
    stars: [1, 1, 1, 1, 1],
    image: require('../../assets/doctor-booking images/Doctorimage3.jpeg'),
  },
  {
    id: 4,
    name: 'Dr. Kasun Ranaweera',
    specialty: 'Physician',
    rating: 4.7,
    reviews: 198,
    stars: [1, 1, 1, 1, 0.5],
    image: require('../../assets/doctor-booking images/Doctorimage4.jpeg'),
  },
  {
    id: 5,
    name: 'Dr. Mihiri Ranathunga',
    specialty: 'Cardiologist',
    rating: 4.5,
    reviews: 174,
    stars: [1, 1, 1, 1, 0.5],
    image: require('../../assets/doctor-booking images/Doctorimage5.jpeg'),
  },
  {
    id: 6,
    name: 'Dr. Ann Perera',
    specialty: 'Eye Surgeon',
    rating: 4.9,
    reviews: 261,
    stars: [1, 1, 1, 1, 1],
    image: require('../../assets/doctor-booking images/Doctorimage6.jpeg'),
  },
  {
    id: 7,
    name: 'Dr. Chinthaka Silva',
    specialty: 'Neurologist',
    rating: 4.3,
    reviews: 143,
    stars: [1, 1, 1, 1, 0.5],
    image: require('../../assets/doctor-booking images/Doctorimage7.jpeg'),
  },
  {
    id: 8,
    name: 'Dr. Malith Jayasinghe',
    specialty: 'Cardiologist',
    rating: 4.6,
    reviews: 209,
    stars: [1, 1, 1, 1, 0.5],
    image: require('../../assets/doctor-booking images/Doctorimage8.jpeg'),
  },
  {
    id: 9,
    name: 'Dr. Monali Jayarathna',
    specialty: 'Psychiatrist',
    rating: 4.8,
    reviews: 287,
    stars: [1, 1, 1, 1, 1],
    image: require('../../assets/doctor-booking images/Doctorimage9.jpeg'),
  },
  {
    id: 10,
    name: 'Dr. Sehansa Gamage',
    specialty: 'Dermatologist',
    rating: 4.4,
    reviews: 156,
    stars: [1, 1, 1, 1, 0.5],
    image: require('../../assets/doctor-booking images/Doctorimage10.jpeg'),
  },
  {
    id: 11,
    name: 'Dr. Nuwan Gunasekara',
    specialty: 'Physician',
    rating: 4.3,
    reviews: 132,
    stars: [1, 1, 1, 1, 0.5],
    image: require('../../assets/doctor-booking images/Doctorimage11.jpeg'),
  },
  {
    id: 12,
    name: 'Dr. Vinu Jayawardena',
    specialty: 'Dentist',
    rating: 5.0,
    reviews: 340,
    stars: [1, 1, 1, 1, 1],
    image: require('../../assets/doctor-booking images/Doctorimage12.jpeg'),
  },
];

// ─── Helper: map an API doctor to the card shape ──────────────────────────────
const mapApiDoctor = (doc: ApiDoctor, index: number): Doctor => ({
  id: index + 1,
  name: doc.fullName,
  specialty: doc.specialization,
  rating: 4.5,
  reviews: 0,
  stars: [1, 1, 1, 1, 0.5],
  // Fall back to a local image by cycling through the 12 available assets
  image: fallbackDoctors[(index % 12)].image,
});

// ─── StarRating Component ─────────────────────────────────────────────────────
const StarRating: React.FC<StarRatingProps> = ({ stars }) => {
  return (
    <div className="doc-rating">
      {stars.map((s, i) =>
        s === 1 ? (
          <i key={i} className="fas fa-star"></i>
        ) : (
          <i key={i} className="fas fa-star-half-alt"></i>
        )
      )}
    </div>
  );
};

// ─── DoctorPage Component ─────────────────────────────────────────────────────
const DoctorPage: React.FC = () => {
  const navigate = useNavigate();
  const [filterName, setFilterName] = useState<string>('');
  const [filterSpecialty, setFilterSpecialty] = useState<string>('All');
  const [doctors, setDoctors] = useState<Doctor[]>(fallbackDoctors);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string>('');

  // Fetch doctors from the backend on mount; fall back to local data on error
  useEffect(() => {
    let cancelled = false;

    const fetchDoctors = async () => {
      try {
        const apiDoctors = await getDoctors();
        if (!cancelled) {
          if (apiDoctors.length > 0) {
            setDoctors(apiDoctors.map(mapApiDoctor));
          }
          // If empty, keep the fallback doctors already in state
        }
      } catch {
        if (!cancelled) {
          setApiError('Showing locally available doctors (backend offline).');
          // fallbackDoctors already set as initial state — no action needed
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDoctors();
    return () => { cancelled = true; };
  }, []);

  // Build specialty list dynamically from whichever doctors are shown
  const specialties: string[] = ['All', ...new Set(doctors.map((d) => d.specialty))];

  const filteredDoctors: Doctor[] = doctors.filter((doc) => {
    const matchesName = doc.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'All' || doc.specialty === filterSpecialty;
    return matchesName && matchesSpecialty;
  });

  return (
    <PublicLayout>
      <main className="doctors-wrapper">
        <div className="container">

          <div className="page-heading">
            <h2 className="page-title">
              Featured <span className="gradient-text">Doctors</span>
            </h2>
            <p className="page-subtitle">
              Top-rated specialists available now — book your appointment instantly
            </p>
            {apiError && (
              <p style={{ color: '#f59e0b', fontSize: '0.8rem', marginTop: '4px' }}>
                ⚠ {apiError}
              </p>
            )}
          </div>

          {/* FILTER BAR */}
          <div className="filters-bar">
            <div className="filter-box">
              <i className="fas fa-user-md filter-box-icon"></i>
              <input
                type="text"
                className="filter-input"
                placeholder="Doctor - Max 20 Characters"
                maxLength={20}
                value={filterName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFilterName(e.target.value)
                }
              />
            </div>

            <div className="filter-box">
              <i className="fas fa-stethoscope filter-box-icon"></i>
              <select
                className="filter-select"
                value={filterSpecialty}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFilterSpecialty(e.target.value)
                }
              >
                {specialties.map((s) => (
                  <option key={s} value={s === 'All' ? 'All' : s}>
                    {s === 'All' ? 'Any Specialization' : s}
                  </option>
                ))}
              </select>
              <i className="fas fa-chevron-down select-chevron"></i>
            </div>
          </div>

          {/* LOADING STATE */}
          {loading ? (
            <div className="no-results" style={{ opacity: 0.6 }}>
              <i className="fas fa-spinner fa-spin"></i>
              <p>Loading doctors…</p>
            </div>
          ) : (
            /* DOCTORS GRID */
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
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate(`/doctor-booking/doctor/${doc.id}/profile`)}
                      >
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
          )}

        </div>
      </main>
    </PublicLayout>
  );
};

export default DoctorPage;
