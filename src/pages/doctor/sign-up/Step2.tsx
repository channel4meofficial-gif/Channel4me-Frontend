import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDoctorRegistration } from '../../../context/doctorRegistrationContext';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import '../../../styles/register/RegistrationType.css';      // global registration styles
import '../../../styles/doctor/sign-up/Step2.css';
import StepIndicator from '../../../components/ui/common/StepIndicator';

// Update FileData interface to match what the context expects
interface FileData {
    name: string;
    size: number;
    type: string;
    file: File;
}

interface FormData {
    license: string;
    specialization: string;
    experience: string;
    qualifications: string;
    hospital: string;
    fee: string;
    bio: string;
}

const DoctorRegisterStep2: React.FC = () => {
    const navigate = useNavigate();
    const { registrationData, updateProfessionalData } = useDoctorRegistration();
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    
    const [formData, setFormData] = useState<FormData>({
        license: '',
        specialization: '',
        experience: '',
        qualifications: '',
        hospital: '',
        fee: '',
        bio: ''
    });
    
    const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Specialties list
    const specialties = [
        { value: 'cardiology', label: 'Cardiology' },
        { value: 'neurology', label: 'Neurology' },
        { value: 'pediatrics', label: 'Pediatrics' },
        { value: 'orthopedics', label: 'Orthopedics' },
        { value: 'dermatology', label: 'Dermatology' },
        { value: 'gynecology', label: 'Gynecology' },
        { value: 'psychiatry', label: 'Psychiatry' },
        { value: 'surgery', label: 'Surgery' },
        { value: 'other', label: 'Other' }
    ];

    // Experience options
    const experienceOptions = [
        { value: '', label: 'Select Experience', disabled: true },
        { value: '1-3', label: '1-3 years' },
        { value: '4-7', label: '4-7 years' },
        { value: '8-12', label: '8-12 years' },
        { value: '13-20', label: '13-20 years' },
        { value: '20+', label: '20+ years' }
    ];

    useEffect(() => {
        // Load saved data from localStorage
        const saved = localStorage.getItem('doctorProfessionalData');
        if (saved) {
            try {
                const parsedData = JSON.parse(saved);
                setFormData(prev => ({ 
                    ...prev, 
                    license: parsedData.license || '',
                    specialization: parsedData.specialization || '',
                    experience: parsedData.experience || '',
                    qualifications: Array.isArray(parsedData.qualifications) ? parsedData.qualifications.join(', ') : '',
                    hospital: parsedData.hospital || '',
                    fee: parsedData.fee ? parsedData.fee.toString() : '',
                    bio: parsedData.bio || ''
                }));
            } catch (error) {
                console.error('Error loading saved data:', error);
            }
        }
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSpecializationClick = (value: string) => {
        setFormData(prev => ({ ...prev, specialization: value }));
        if (errors.specialization) {
            setErrors(prev => ({ ...prev, specialization: '' }));
        }
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFiles: FileData[] = [];

        Array.from(files).forEach(file => {
            // Check file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert(`File ${file.name} is too large. Maximum size is 5MB.`);
                return;
            }

            // Check file type
            const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                alert(`File ${file.name} is not a supported format. Please upload PDF, JPG, or PNG files.`);
                return;
            }

            newFiles.push({
                name: file.name,
                size: file.size,
                type: file.type,
                file: file
            });
        });

        setUploadedFiles(prev => [...prev, ...newFiles]);
        e.target.value = ''; // Reset file input
    };

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.license.trim()) {
            newErrors.license = 'Medical license number is required';
        } else if (!/^[A-Za-z0-9]{6,20}$/.test(formData.license)) {
            newErrors.license = 'Please enter a valid medical license number (6-20 alphanumeric characters)';
        }

        if (!formData.specialization) {
            newErrors.specialization = 'Primary specialization is required';
        }

        if (!formData.experience) {
            newErrors.experience = 'Years of experience is required';
        }

        if (!formData.qualifications.trim()) {
            newErrors.qualifications = 'Medical qualifications are required';
        }

        if (!formData.hospital.trim()) {
            newErrors.hospital = 'Current hospital/clinic is required';
        }

        if (!formData.fee) {
            newErrors.fee = 'Consultation fee is required';
        } else if (parseFloat(formData.fee) < 0) {
            newErrors.fee = 'Consultation fee must be positive';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsLoading(true);
        setSubmitError('');

        try {
            // ── Prepare professional data for context ─────────────────────────
            const professionalData = {
                license: formData.license,
                specialization: formData.specialization,
                experience: formData.experience,
                qualifications: formData.qualifications.split(',').map(q => q.trim()),
                hospital: formData.hospital,
                fee: parseFloat(formData.fee),
                bio: formData.bio,
                documents: uploadedFiles.map(f => f.file),
                documentsCount: uploadedFiles.length
            };
            updateProfessionalData(professionalData);

            // ── Convert experience range string to first integer ───────────────
            // e.g. '4-7' → 4,  '20+' → 20
            const expStr = formData.experience.replace('+', '').split('-')[0];
            const yearsOfExperience = parseInt(expStr, 10) || 0;

            // ── Build multipart/form-data payload ─────────────────────────────
            const fd = new FormData();
            // Personal fields from context
            fd.append('fullName',        registrationData?.personal?.fullName        || '');
            fd.append('email',           registrationData?.personal?.email           || '');
            fd.append('mobile',          registrationData?.personal?.mobile          || '');
            fd.append('dateOfBirth',     registrationData?.personal?.dob             || '');
            fd.append('gender',          registrationData?.personal?.gender          || '');
            fd.append('password',        registrationData?.personal?.password        || '');
            fd.append('confirmPassword', registrationData?.personal?.confirmPassword || '');
            // Professional fields
            fd.append('licenseNumber',    formData.license);
            fd.append('specialization',   formData.specialization);
            fd.append('yearsOfExperience', String(yearsOfExperience));
            // Qualifications: send as comma-separated string (backend accepts string or array)
            fd.append('qualifications',  formData.qualifications);
            fd.append('hospital',        formData.hospital);
            // consultationFee must be digits-only string
            fd.append('consultationFee', formData.fee.replace(/[^0-9]/g, ''));
            if (formData.bio) fd.append('biography', formData.bio);
            // Uploaded files
            uploadedFiles.forEach(f => fd.append('documents', f.file));

            // ── POST to backend ───────────────────────────────────────────────
            const res = await fetch('http://localhost:5000/api/doctor/register', {
                method: 'POST',
                body: fd,
                // No Content-Type header — browser sets it with boundary for multipart
            });
            const result = await res.json();

            if (!res.ok || !result.success) {
                const errMsg = result.errors
                    ? result.errors.join(' • ')
                    : (result.message || 'Registration failed. Please try again.');
                setSubmitError(errMsg);
                return;
            }

            // Success — clear form and localStorage, navigate to Step 3
            setFormData({
                license: '',
                specialization: '',
                experience: '',
                qualifications: '',
                hospital: '',
                fee: '',
                bio: ''
            });
            setUploadedFiles([]);
            localStorage.removeItem('doctorProfessionalData');
            navigate('/doctor/register/step3');

        } catch (error) {
            console.error('Doctor registration error:', error);
            setSubmitError('Cannot connect to the server. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        if (window.confirm('Go back to personal information? Your current data will be saved.')) {
            const storageData = {
                license: formData.license,
                specialization: formData.specialization,
                experience: formData.experience,
                qualifications: formData.qualifications.split(',').map(q => q.trim()),
                hospital: formData.hospital,
                fee: parseFloat(formData.fee) || 0,
                bio: formData.bio,
                documents: uploadedFiles.map(f => ({
                    name: f.name,
                    size: f.size,
                    type: f.type
                })),
                documentsCount: uploadedFiles.length
            };
            localStorage.setItem('doctorProfessionalData', JSON.stringify(storageData));
            navigate('/doctor/register/step1');
        }
    };

    return (
        <PublicLayout>
            <main className="main-content-register">
                <div className="container">
                    <div className="registration-wrapper-steps" style={{maxWidth: '800px'}}>
                        
                        {/* Steps Indicator */}
                        <StepIndicator 
                            currentStep={2} 
                            steps={[
                                { number: 1, label: 'Personal Info' },
                                { number: 2, label: 'Professional Info' },
                                { number: 3, label: 'Verification' }
                            ]} 
                        />
                        
                        {/* Form Container */}
                        <div className="registration-form-container">
                            <div className="form-header">
                                <h1>Professional Information</h1>
                                <p>Provide your medical qualifications and details</p>
                            </div>
                            
                            <form id="professionalForm" onSubmit={handleSubmit}>
                                {/* API Error Banner */}
                                {submitError && (
                                    <div style={{
                                        background: '#fef2f2',
                                        border: '1px solid #fecaca',
                                        color: '#dc2626',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        marginBottom: '20px',
                                        fontSize: '14px'
                                    }}>
                                        ⚠️ {submitError}
                                    </div>
                                )}
                                {/* Medical License Number */}
                                <div className="form-group">
                                    <label htmlFor="license" className="form-label">Medical License Number</label>
                                    <input 
                                        type="text" 
                                        id="license" 
                                        name="license"
                                        value={formData.license}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Enter your medical license number" 
                                    />
                                    <span className="form-helper">As issued by the medical council</span>
                                    {errors.license && <span className="error-message">{errors.license}</span>}
                                </div>
                                
                                {/* Specialization */}
                                <div className="form-group">
                                    <label className="form-label">Primary Specialization</label>
                                    <div className="specialties-grid">
                                        {specialties.map(specialty => (
                                            <div 
                                                key={specialty.value}
                                                className={`specialty-option ${formData.specialization === specialty.value ? 'selected' : ''}`}
                                                onClick={() => handleSpecializationClick(specialty.value)}
                                            >
                                                {specialty.label}
                                            </div>
                                        ))}
                                    </div>
                                    {errors.specialization && <span className="error-message">{errors.specialization}</span>}
                                </div>
                                
                                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                                    {/* Years of Experience */}
                                    <div className="form-group">
                                        <label htmlFor="experience" className="form-label">Years of Experience</label>
                                        <select 
                                            id="experience" 
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        >
                                            {experienceOptions.map(option => (
                                                <option key={option.value} value={option.value} disabled={option.disabled}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.experience && <span className="error-message">{errors.experience}</span>}
                                    </div>
                                    
                                    {/* Consultation Fee */}
                                    <div className="form-group">
                                        <label htmlFor="fee" className="form-label">Consultation Fee (LKR)</label>
                                        <input 
                                            type="number" 
                                            id="fee" 
                                            name="fee"
                                            value={formData.fee}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            placeholder="Enter fee" 
                                            min="0"
                                        />
                                        {errors.fee && <span className="error-message">{errors.fee}</span>}
                                    </div>
                                </div>
                                
                                {/* Qualifications */}
                                <div className="form-group">
                                    <label htmlFor="qualifications" className="form-label">Medical Qualifications</label>
                                    <textarea 
                                        id="qualifications" 
                                        name="qualifications"
                                        value={formData.qualifications}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        rows={3} 
                                        placeholder="MBBS, MD, MS, etc. (Separate with commas)"
                                    />
                                    <span className="form-helper">List all your medical degrees and certifications</span>
                                    {errors.qualifications && <span className="error-message">{errors.qualifications}</span>}
                                </div>
                                
                                {/* Hospital/Clinic */}
                                <div className="form-group">
                                    <label htmlFor="hospital" className="form-label">Current Hospital/Clinic</label>
                                    <input 
                                        type="text" 
                                        id="hospital" 
                                        name="hospital"
                                        value={formData.hospital}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Name of your current workplace"
                                    />
                                    {errors.hospital && <span className="error-message">{errors.hospital}</span>}
                                </div>
                                
                                {/* Upload Documents */}
                                <div className="form-group">
                                    <label className="form-label">Upload Documents</label>
                                    <div 
                                        className="file-upload" 
                                        onClick={() => document.getElementById('fileInput')?.click()}
                                        style={{ 
                                            border: '2px dashed #e2e8f0', 
                                            borderRadius: '12px', 
                                            padding: '30px', 
                                            textAlign: 'center', 
                                            cursor: 'pointer',
                                            background: '#f8fafc',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        <i className="fas fa-cloud-upload-alt" style={{ fontSize: '32px', color: '#667eea', marginBottom: '10px' }}></i>
                                        <p style={{marginBottom: '5px', color: '#475569', fontWeight: '500'}}>Click to upload documents</p>
                                        <p style={{fontSize: '12px', color: '#94a3b8'}}>Medical License • ID Proof • Certificates</p>
                                        <input 
                                            type="file" 
                                            id="fileInput" 
                                            style={{ display: 'none' }}
                                            multiple 
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={handleFileUpload}
                                        />
                                    </div>
                                    <div className="file-list" style={{ marginTop: '15px' }}>
                                        {uploadedFiles.map((file, index) => (
                                            <div key={index} className="file-item" style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center',
                                                padding: '10px 15px',
                                                background: '#f1f5f9',
                                                borderRadius: '8px',
                                                marginBottom: '8px',
                                                fontSize: '13px'
                                            }}>
                                                <span className="file-name" style={{ color: '#475569' }}>
                                                    {file.name} ({formatFileSize(file.size)})
                                                </span>
                                                <span 
                                                    className="file-remove" 
                                                    onClick={() => removeFile(index)}
                                                    style={{ color: '#ef4444', cursor: 'pointer' }}
                                                >
                                                    <i className="fas fa-times"></i>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <span className="form-helper">Max 5MB each. PDF, JPG, PNG only.</span>
                                </div>
                                
                                {/* Biography */}
                                <div className="form-group">
                                    <label htmlFor="bio" className="form-label">Professional Biography (Optional)</label>
                                    <textarea 
                                        id="bio" 
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        className="form-control" 
                                        rows={4} 
                                        placeholder="Briefly describe your professional background and approach..."
                                    />
                                </div>
                                
                                {/* Form Navigation */}
                                <div className="register-form-navigation">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary btn-back" 
                                        onClick={handleBack}
                                        disabled={isLoading}
                                    >
                                        <i className="fas fa-arrow-left"></i> Back
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-next"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin"></i> Saving...
                                            </>
                                        ) : (
                                            <>
                                                Continue <i className="fas fa-arrow-right"></i>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
};

export default DoctorRegisterStep2;