import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDoctorRegistration } from '../../../context/doctorRegistrationContext';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import '../../../styles/register/doctor/Step2.css';

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
    const { updateProfessionalData } = useDoctorRegistration();
    const [isLoading, setIsLoading] = useState(false);
    
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
                    qualifications: parsedData.qualifications ? parsedData.qualifications.join(', ') : '',
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
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Prepare professional data - FIXED: documents should be an array of File objects
            const professionalData = {
                license: formData.license,
                specialization: formData.specialization,
                experience: formData.experience,
                qualifications: formData.qualifications.split(',').map(q => q.trim()),
                hospital: formData.hospital,
                fee: parseFloat(formData.fee),
                bio: formData.bio,
                documents: uploadedFiles.map(f => f.file), // CHANGED: Use File objects, not strings
                documentsCount: uploadedFiles.length
            };

            // Save to localStorage - BUT File objects can't be serialized to JSON
            // We need to save only the metadata, not the actual File objects
            const storageData = {
                ...professionalData,
                documents: uploadedFiles.map(f => ({
                    name: f.name,
                    size: f.size,
                    type: f.type
                    // Don't include the actual File object
                }))
            };
            
            localStorage.setItem('doctorProfessionalData', JSON.stringify(storageData));
            
            // Update context with File objects
            updateProfessionalData(professionalData);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // Navigate to step 3
            navigate('/doctor/register/step3');

        } catch (error) {
            console.error('Error saving professional data:', error);
            alert('An error occurred while saving your information. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        if (window.confirm('Go back to personal information? Your current data will be saved.')) {
            // Save current data before going back
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
            <main className="main-content">
                <div className="container">
                    <div className="registration-wrapper">
                        
                        {/* Steps Indicator */}
                        <div className="steps">
                            <div className="step completed">
                                <div className="step-number">1</div>
                                <div className="step-label">Personal Info</div>
                            </div>
                            <div className="step active">
                                <div className="step-number">2</div>
                                <div className="step-label">Professional Info</div>
                            </div>
                            <div className="step">
                                <div className="step-number">3</div>
                                <div className="step-label">Verification</div>
                            </div>
                        </div>
                        
                        {/* Form Container */}
                        <div className="form-container">
                            <div className="form-header">
                                <h1>Professional Information</h1>
                                <p>Step 2: Provide your medical qualifications and details</p>
                            </div>
                            
                            <form id="professionalForm" onSubmit={handleSubmit}>
                                {/* Medical License Number */}
                                <div className="form-group">
                                    <label htmlFor="license" className="form-label">Medical License Number</label>
                                    <input 
                                        type="text" 
                                        id="license" 
                                        name="license"
                                        value={formData.license}
                                        onChange={handleInputChange}
                                        className={`form-control ${errors.license ? 'error' : ''}`}
                                        placeholder="Enter your medical license number" 
                                    />
                                    <span className="form-helper">As issued by the medical council</span>
                                    {errors.license && <div className="error-text">{errors.license}</div>}
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
                                    <input 
                                        type="hidden" 
                                        id="specialization" 
                                        value={formData.specialization}
                                        readOnly
                                    />
                                    {errors.specialization && <div className="error-text">{errors.specialization}</div>}
                                </div>
                                
                                {/* Years of Experience */}
                                <div className="form-group">
                                    <label htmlFor="experience" className="form-label">Years of Experience</label>
                                    <select 
                                        id="experience" 
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        className={`form-control ${errors.experience ? 'error' : ''}`}
                                    >
                                        {experienceOptions.map(option => (
                                            <option 
                                                key={option.value} 
                                                value={option.value}
                                                disabled={option.disabled}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.experience && <div className="error-text">{errors.experience}</div>}
                                </div>
                                
                                {/* Qualifications */}
                                <div className="form-group">
                                    <label htmlFor="qualifications" className="form-label">Medical Qualifications</label>
                                    <textarea 
                                        id="qualifications" 
                                        name="qualifications"
                                        value={formData.qualifications}
                                        onChange={handleInputChange}
                                        className={`form-control ${errors.qualifications ? 'error' : ''}`}
                                        rows={3} 
                                        placeholder="MBBS, MD, MS, etc. (Separate with commas)"
                                    />
                                    <span className="form-helper">List all your medical degrees and certifications</span>
                                    {errors.qualifications && <div className="error-text">{errors.qualifications}</div>}
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
                                        className={`form-control ${errors.hospital ? 'error' : ''}`}
                                        placeholder="Name of your current workplace"
                                    />
                                    {errors.hospital && <div className="error-text">{errors.hospital}</div>}
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
                                        className={`form-control ${errors.fee ? 'error' : ''}`}
                                        placeholder="Enter your consultation fee" 
                                        min="0"
                                    />
                                    {errors.fee && <div className="error-text">{errors.fee}</div>}
                                </div>
                                
                                {/* Upload Documents */}
                                <div className="form-group">
                                    <label className="form-label">Upload Documents</label>
                                    <div 
                                        className="file-upload" 
                                        onClick={() => document.getElementById('fileInput')?.click()}
                                    >
                                        <i className="fas fa-cloud-upload-alt"></i>
                                        <p style={{marginBottom: '10px', color: '#475569'}}>Click to upload documents</p>
                                        <p style={{fontSize: '12px', color: '#94a3b8'}}>
                                            Medical License • Degree Certificates • ID Proof
                                        </p>
                                        <input 
                                            type="file" 
                                            id="fileInput" 
                                            className="file-input" 
                                            multiple 
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={handleFileUpload}
                                        />
                                    </div>
                                    <div className="file-list" id="fileList">
                                        {uploadedFiles.map((file, index) => (
                                            <div key={index} className="file-item">
                                                <span className="file-name">
                                                    {file.name} ({formatFileSize(file.size)})
                                                </span>
                                                <span 
                                                    className="file-remove" 
                                                    onClick={() => removeFile(index)}
                                                >
                                                    <i className="fas fa-times"></i>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <span className="form-helper">
                                        Maximum file size: 5MB each. Supported formats: PDF, JPG, PNG
                                    </span>
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
                                        placeholder="Briefly describe your professional background, achievements, and approach to patient care..."
                                    />
                                </div>
                                
                                {/* Form Navigation */}
                                <div className="form-navigation">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary" 
                                        onClick={handleBack}
                                        disabled={isLoading}
                                    >
                                        <i className="fas fa-arrow-left"></i> Back
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin"></i> Saving...
                                            </>
                                        ) : (
                                            <>
                                                Continue to Verification <i className="fas fa-arrow-right"></i>
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