# Channel4Me Healthcare Platform

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [User Roles](#user-roles)
- [Sustainable Development Goals](#sustainable-development-goals)
- [Team Members](#team-members)
- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Current Status](#current-status)
- [License](#license)
- [Contact](#contact)

---

## 🏥 Project Overview

**Channel4Me** is a comprehensive digital healthcare platform designed to bridge the gap between patients and healthcare providers in Sri Lanka. The platform leverages artificial intelligence and modern web technologies to make healthcare more accessible, efficient, and patient-centered.

---

## 🌟 Key Features

|   | Feature | Description |
|---|---------|-------------|
| 1 | **AI-Powered Symptom Checker** | Patients input symptoms and receive AI analysis with potential conditions and specialist recommendations |
| 2 | **Location-Based Doctor Matching** | Find nearby doctors based on specialty, ratings, availability, and distance |
| 3 | **Online Appointment Booking** | Book appointments with real-time availability and integrated payment processing |
| 4 | **Digital Medical Records** | Secure storage and management of patient health history and prescriptions |
| 5 | **Verified Patient Reviews** | Authentic feedback system where only patients with completed appointments can rate doctors |

---

## 👥 User Roles

- **Patients**  
  Check symptoms, find doctors, book appointments, manage medical records, and leave reviews.

- **Doctors**  
  Manage profiles, set availability, view appointments, update patient records, and generate e-prescriptions.

- **Administrators**  
  Verify doctors, manage users, moderate content, and view system analytics.

---

## 🎯 Sustainable Development Goals

Channel4Me contributes to the following UN Sustainable Development Goals:

| SDG | Contribution |
|-----|-------------|
| **SDG 3: Good Health and Well-being** | Making healthcare accessible to all through digital platforms and AI-powered guidance |
| **SDG 9: Industry, Innovation and Infrastructure** | Using AI technology to create innovative healthcare solutions and digital infrastructure |

---

## 👨‍💻 Team Members

| IIT ID | UoW ID | Student Name | Role |
|--------|--------|--------------|------|
| 20231426 | w2153527 | H.L.G.P. Malshan | Team Lead / Full Stack Developer |
| 20232933 | w2120631 | G.S. Rishi | Full Stack Developer |
| 20241442 | w21846560 | A.M.P. Manuji Amarakoon | Full Stack Developer |
| 20231412 | w2153528 | K.B.S.R. Perera | Full Stack Developer |
| 20232451 | w2120630 | W.A. Dinuka Viduranga | Full Stack Developer |
| 20231833 | w2153492 | M.H. Muhammadh | Full Stack Developer |


---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | Web application framework |
| Bootstrap / Tailwind CSS | Styling and responsive design |
| Axios | HTTP client for API calls |
| React Router | Navigation and routing |
| Chart.js | Analytics dashboards |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication |
| Bcrypt | Password encryption |

### External Services
| Service | Purpose |
|---------|---------|
| Stripe / PayPal | Payment processing |
| Twilio | SMS notifications |
| SendGrid / Nodemailer | Email notifications |
| Google Maps API | Location-based search |
| OpenAI / Infermedica | AI symptom analysis |

### Development Tools
- Git & GitHub – Version control
- Postman – API testing
- VS Code – Code editor
- MongoDB Compass – Database management

---

## 📂 Repository Structure

```
channel4me/
├── backend/                    # Node.js backend server
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── models/             # Database models
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Auth, validation
│   │   ├── services/           # Business logic
│   │   └── utils/              # Helper functions
│   ├── tests/                  # Backend tests
│   ├── .env.example            # Environment variables template
│   ├── package.json
│   └── server.js
│
├── frontend/                   # React web application
│   ├── public/
│   └── src/
│       ├── pages/              # All web pages
│       │   ├── public/         # Home, About, Contact
│       │   ├── auth/           # Login, Register
│       │   ├── patient/        # Patient dashboard
│       │   ├── doctor/         # Doctor dashboard
│       │   └── admin/          # Admin panel
│       ├── components/         # Reusable UI components
│       ├── services/           # API integration
│       ├── utils/              # Helpers
│       ├── App.js
│       └── index.js
│
├── docs/                        # Project documentation
│   ├── diagrams/                # UML diagrams
│   ├── requirements/            # SRS documents
│   └── presentations/           # Project presentations
│
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation Steps

#### 1. Clone the repository
```bash
git clone https://github.com/your-org/channel4me.git
cd channel4me
```

#### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials and API keys
npm start
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

#### 4. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/api-docs

---

## 📊 Current Status

### ✅ Completed
- System Requirements Specification
- Use Case Diagrams (10 use cases)
- Class Diagrams (9 core classes)
- System Architecture Design
- SLEP Analysis
- Database Schema Design

### 🔄 In Progress
- Backend API Development
- Frontend Page Development
- Payment Integration
- AI Symptom Checker Integration

### 📅 Next Milestones
- Complete MVP by [Insert Date]
- User Testing
- Deployment
- Final Presentation

---

## 📝 License

This project is developed for educational purposes as part of the Software Development Group Project module at IIT.

---

## 📧 Contact

For any inquiries, please contact the team lead:
- **Pasidu Malshan** – [pasindu.20231426@iit.ac.lk](mailto:pasindu.20231426@iit.ac.lk)

---

**Channel4Me - Your Health, Our Priority** ❤️
