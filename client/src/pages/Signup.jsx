import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    User, 
    Mail, 
    Lock, 
    GraduationCap, 
    Briefcase, 
    Building2, 
    Target,
    Linkedin,
    ArrowRight,
    ArrowLeft,
    Check,
    AlertCircle,
    Eye,
    EyeOff,
    IdCard,
    CheckCircle2,
    Users
} from 'lucide-react';

const ImprovedSignup = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        regId: '',
        email: '',
        password: '',
        role: 'student',
        year: '',
        graduationYear: '',
        branch: '',
        currentRole: '',
        organization: '',
        industry: '',
        linkedinLink: '',
        isOpenToMentorship: false
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleRoleChange = (role) => {
        setFormData({ ...formData, role });
        setError('');
    };

    const validateStep = (step) => {
        if (step === 1) {
            if (!formData.role) {
                setError('Please select a role');
                return false;
            }
            if (!formData.regId) {
                setError('Registration ID is required');
                return false;
            }
            if (!formData.email) {
                setError('Email is required');
                return false;
            }
            if (!formData.email.endsWith('.edu')) {
                setError('Please use your .edu email address');
                return false;
            }
            if (!formData.password || formData.password.length < 6) {
                setError('Password must be at least 6 characters');
                return false;
            }
        }
        
        if (step === 2) {
            if (!formData.branch) {
                setError('Branch is required');
                return false;
            }
            if (formData.role === 'student' && !formData.year) {
                setError('Year is required for students');
                return false;
            }
            if (formData.role === 'alumni' && !formData.graduationYear) {
                setError('Graduation year is required for alumni');
                return false;
            }
        }

        if (step === 3 && formData.role === 'alumni') {
            if (!formData.currentRole) {
                setError('Current role is required');
                return false;
            }
            if (!formData.organization) {
                setError('Organization is required');
                return false;
            }
        }
        
        return true;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setError('');
            if (formData.role === 'student' && currentStep === 2) {
                handleSubmit();
            } else {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
        setError('');
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        if (!validateStep(currentStep)) return;
        
        setError('');
        setLoading(true);

        try {
            await register(formData);
            setLoading(false);
            
            // Success message
            setTimeout(() => {
                navigate('/login', { 
                    state: { message: 'Registration successful! Please login.' }
                });
            }, 500);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const totalSteps = formData.role === 'alumni' ? 3 : 2;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                
                * {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                .gradient-bg {
                    background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe);
                    background-size: 400% 400%;
                    animation: gradient-shift 15s ease infinite;
                }

                .slide-in-right {
                    animation: slideInRight 0.5s ease-out forwards;
                }

                .slide-in-left {
                    animation: slideInLeft 0.5s ease-out forwards;
                }

                .fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }

                .error-shake {
                    animation: shake 0.5s;
                }

                .pulse {
                    animation: pulse 2s ease-in-out infinite;
                }

                .role-card {
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .role-card:hover {
                    transform: translateY(-8px);
                }

                .input-wrapper {
                    position: relative;
                    margin-bottom: 20px;
                }

                .input-icon-left {
                    position: absolute;
                    left: 18px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    transition: all 0.3s ease;
                    z-index: 1;
                }

                .input-wrapper input:focus + .input-icon-left,
                .input-wrapper select:focus + .input-icon-left {
                    color: #667eea;
                }

                .checkbox-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    padding: 16px 20px;
                    border-radius: 14px;
                    border: 2px solid #e2e8f0;
                    background: #f8fafc;
                    transition: all 0.3s ease;
                }

                .checkbox-wrapper:hover {
                    border-color: #667eea;
                    background: white;
                }

                .checkbox-wrapper input[type="checkbox"] {
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                    accent-color: #667eea;
                }
            `}</style>

            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 20px',
                position: 'relative',
                overflow: 'hidden'
            }} className="gradient-bg">

                {/* Main Container */}
                <div className="fade-in" style={{
                    width: '100%',
                    maxWidth: '900px',
                    position: 'relative',
                    zIndex: 10
                }}>
                    
                    {/* Progress Bar */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: '24px 32px',
                        marginBottom: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            {[...Array(totalSteps)].map((_, index) => (
                                <React.Fragment key={index}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        flex: index < totalSteps - 1 ? 1 : 'none'
                                    }}>
                                        <div style={{
                                            width: '44px',
                                            height: '44px',
                                            borderRadius: '50%',
                                            background: currentStep > index + 1 
                                                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                                : currentStep === index + 1 
                                                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                                    : '#e2e8f0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: '700',
                                            fontSize: '16px',
                                            color: currentStep >= index + 1 ? 'white' : '#94a3b8',
                                            boxShadow: currentStep === index + 1 ? '0 4px 16px rgba(102, 126, 234, 0.4)' : 'none',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            {currentStep > index + 1 ? <Check size={20} strokeWidth={3} /> : index + 1}
                                        </div>
                                        {index < totalSteps - 1 && (
                                            <div style={{
                                                flex: 1,
                                                height: '4px',
                                                background: currentStep > index + 1 ? '#10b981' : '#e2e8f0',
                                                borderRadius: '2px',
                                                transition: 'all 0.5s ease'
                                            }}></div>
                                        )}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: '#64748b',
                            fontSize: '13px',
                            fontWeight: '600'
                        }}>
                            <span style={{ color: currentStep === 1 ? '#667eea' : currentStep > 1 ? '#10b981' : '#94a3b8' }}>
                                Account Info
                            </span>
                            <span style={{ color: currentStep === 2 ? '#667eea' : currentStep > 2 ? '#10b981' : '#94a3b8' }}>
                                Academic Details
                            </span>
                            {formData.role === 'alumni' && (
                                <span style={{ color: currentStep === 3 ? '#667eea' : '#94a3b8' }}>
                                    Professional Info
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Main Card */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '32px',
                        padding: '48px',
                        boxShadow: '0 32px 96px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}>
                        
                        {/* Header */}
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <h1 style={{
                                fontSize: '32px',
                                fontWeight: '900',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '8px',
                                letterSpacing: '-0.5px'
                            }}>
                                {currentStep === 1 ? 'Create Your Account' : 
                                 currentStep === 2 ? 'Academic Information' : 
                                 'Professional Details'}
                            </h1>
                            <p style={{
                                color: '#64748b',
                                fontSize: '15px',
                                fontWeight: '500',
                                margin: 0
                            }}>
                                {currentStep === 1 ? 'Join the alumni network community' :
                                 currentStep === 2 ? 'Tell us about your academic background' :
                                 'Share your professional journey'}
                            </p>
                        </div>

                        {/* Step 1: Account Information */}
                        {currentStep === 1 && (
                            <div className="slide-in-right">
                                {/* Role Selection */}
                                <div style={{ marginBottom: '32px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '16px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        color: '#334155'
                                    }}>
                                        I am a
                                    </label>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div
                                            onClick={() => handleRoleChange('student')}
                                            className="role-card"
                                            style={{
                                                padding: '24px',
                                                borderRadius: '20px',
                                                border: formData.role === 'student' ? '3px solid #667eea' : '2px solid #e2e8f0',
                                                background: formData.role === 'student' ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)' : 'white',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                position: 'relative',
                                                boxShadow: formData.role === 'student' ? '0 8px 24px rgba(102, 126, 234, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.04)'
                                            }}
                                        >
                                            {formData.role === 'student' && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '12px',
                                                    right: '12px',
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '50%',
                                                    background: '#667eea',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Check size={16} color="white" strokeWidth={3} />
                                                </div>
                                            )}
                                            <GraduationCap size={32} color={formData.role === 'student' ? '#667eea' : '#94a3b8'} strokeWidth={2} style={{ marginBottom: '12px' }} />
                                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                                                Student
                                            </h3>
                                            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                                                Current student seeking opportunities
                                            </p>
                                        </div>

                                        <div
                                            onClick={() => handleRoleChange('alumni')}
                                            className="role-card"
                                            style={{
                                                padding: '24px',
                                                borderRadius: '20px',
                                                border: formData.role === 'alumni' ? '3px solid #667eea' : '2px solid #e2e8f0',
                                                background: formData.role === 'alumni' ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)' : 'white',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                position: 'relative',
                                                boxShadow: formData.role === 'alumni' ? '0 8px 24px rgba(102, 126, 234, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.04)'
                                            }}
                                        >
                                            {formData.role === 'alumni' && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '12px',
                                                    right: '12px',
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '50%',
                                                    background: '#667eea',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Check size={16} color="white" strokeWidth={3} />
                                                </div>
                                            )}
                                            <Users size={32} color={formData.role === 'alumni' ? '#667eea' : '#94a3b8'} strokeWidth={2} style={{ marginBottom: '12px' }} />
                                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                                                Alumni
                                            </h3>
                                            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                                                Graduate ready to give back
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Registration ID */}
                                <div className="input-wrapper">
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        color: '#334155'
                                    }}>
                                        {formData.role === 'student' ? 'Registration ID / Roll Number' : 'Alumni ID'}
                                    </label>
                                    <input
                                        type="text"
                                        name="regId"
                                        placeholder={formData.role === 'student' ? "e.g. 2022BTE..." : "Alumni ID"}
                                        value={formData.regId}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '16px 20px 16px 54px',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '14px',
                                            outline: 'none',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#f8fafc',
                                            color: '#0f172a'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#667eea';
                                            e.target.style.backgroundColor = 'white';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#e2e8f0';
                                            e.target.style.backgroundColor = '#f8fafc';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    <IdCard className="input-icon-left" size={20} strokeWidth={2} />
                                </div>

                                {/* Email */}
                                <div className="input-wrapper">
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        color: '#334155'
                                    }}>
                                        Official .edu Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="name@institute.edu"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '16px 20px 16px 54px',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '14px',
                                            outline: 'none',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#f8fafc',
                                            color: '#0f172a'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#667eea';
                                            e.target.style.backgroundColor = 'white';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#e2e8f0';
                                            e.target.style.backgroundColor = '#f8fafc';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    <Mail className="input-icon-left" size={20} strokeWidth={2} />
                                </div>

                                {/* Password */}
                                <div className="input-wrapper">
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        color: '#334155'
                                    }}>
                                        Password
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '16px 54px 16px 54px',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '14px',
                                            outline: 'none',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#f8fafc',
                                            color: '#0f172a'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#667eea';
                                            e.target.style.backgroundColor = 'white';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#e2e8f0';
                                            e.target.style.backgroundColor = '#f8fafc';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    <Lock className="input-icon-left" size={20} strokeWidth={2} />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '18px',
                                            top: '58%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#94a3b8',
                                            padding: '4px',
                                            display: 'flex',
                                            transition: 'color 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Academic Details */}
                        {currentStep === 2 && (
                            <div className="slide-in-right">
                                <div style={{ display: 'grid', gridTemplateColumns: formData.role === 'student' ? '1fr 1fr' : '1fr 1fr', gap: '20px' }}>
                                    {/* Branch */}
                                    <div className="input-wrapper">
                                        <label style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontSize: '14px',
                                            fontWeight: '700',
                                            color: '#334155'
                                        }}>
                                            Branch / Department
                                        </label>
                                        <input
                                            type="text"
                                            name="branch"
                                            placeholder="e.g. Computer Science"
                                            value={formData.branch}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '16px 20px 16px 54px',
                                                fontSize: '15px',
                                                fontWeight: '500',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '14px',
                                                outline: 'none',
                                                transition: 'all 0.3s ease',
                                                backgroundColor: '#f8fafc',
                                                color: '#0f172a'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = '#667eea';
                                                e.target.style.backgroundColor = 'white';
                                                e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = '#e2e8f0';
                                                e.target.style.backgroundColor = '#f8fafc';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                        <GraduationCap className="input-icon-left" size={20} strokeWidth={2} />
                                    </div>

                                    {/* Year or Grad Year */}
                                    {formData.role === 'student' ? (
                                        <div className="input-wrapper">
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                fontSize: '14px',
                                                fontWeight: '700',
                                                color: '#334155'
                                            }}>
                                                Current Year
                                            </label>
                                            <select
                                                name="year"
                                                value={formData.year}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '16px 20px 16px 54px',
                                                    fontSize: '15px',
                                                    fontWeight: '500',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '14px',
                                                    outline: 'none',
                                                    transition: 'all 0.3s ease',
                                                    backgroundColor: '#f8fafc',
                                                    color: '#0f172a',
                                                    cursor: 'pointer'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = '#667eea';
                                                    e.target.style.backgroundColor = 'white';
                                                    e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = '#e2e8f0';
                                                    e.target.style.backgroundColor = '#f8fafc';
                                                    e.target.style.boxShadow = 'none';
                                                }}
                                            >
                                                <option value="">Select year</option>
                                                <option value="1">1st Year</option>
                                                <option value="2">2nd Year</option>
                                                <option value="3">3rd Year</option>
                                                <option value="4">4th Year</option>
                                            </select>
                                            <User className="input-icon-left" size={20} strokeWidth={2} />
                                        </div>
                                    ) : (
                                        <div className="input-wrapper">
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                fontSize: '14px',
                                                fontWeight: '700',
                                                color: '#334155'
                                            }}>
                                                Graduation Year
                                            </label>
                                            <input
                                                type="number"
                                                name="graduationYear"
                                                placeholder="e.g. 2023"
                                                value={formData.graduationYear}
                                                onChange={handleChange}
                                                required
                                                min="1950"
                                                max={new Date().getFullYear()}
                                                style={{
                                                    width: '100%',
                                                    padding: '16px 20px 16px 54px',
                                                    fontSize: '15px',
                                                    fontWeight: '500',
                                                    border: '2px solid #e2e8f0',
                                                    borderRadius: '14px',
                                                    outline: 'none',
                                                    transition: 'all 0.3s ease',
                                                    backgroundColor: '#f8fafc',
                                                    color: '#0f172a'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = '#667eea';
                                                    e.target.style.backgroundColor = 'white';
                                                    e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = '#e2e8f0';
                                                    e.target.style.backgroundColor = '#f8fafc';
                                                    e.target.style.boxShadow = 'none';
                                                }}
                                            />
                                            <GraduationCap className="input-icon-left" size={20} strokeWidth={2} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Professional Info (Alumni Only) */}
                        {currentStep === 3 && formData.role === 'alumni' && (
                            <div className="slide-in-right">
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                    {/* Current Role */}
                                    <div className="input-wrapper">
                                        <label style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontSize: '14px',
                                            fontWeight: '700',
                                            color: '#334155'
                                        }}>
                                            Current Role
                                        </label>
                                        <input
                                            type="text"
                                            name="currentRole"
                                            placeholder="e.g. Software Engineer"
                                            value={formData.currentRole}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '16px 20px 16px 54px',
                                                fontSize: '15px',
                                                fontWeight: '500',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '14px',
                                                outline: 'none',
                                                transition: 'all 0.3s ease',
                                                backgroundColor: '#f8fafc',
                                                color: '#0f172a'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = '#667eea';
                                                e.target.style.backgroundColor = 'white';
                                                e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = '#e2e8f0';
                                                e.target.style.backgroundColor = '#f8fafc';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                        <Briefcase className="input-icon-left" size={20} strokeWidth={2} />
                                    </div>

                                    {/* Organization */}
                                    <div className="input-wrapper">
                                        <label style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontSize: '14px',
                                            fontWeight: '700',
                                            color: '#334155'
                                        }}>
                                            Organization
                                        </label>
                                        <input
                                            type="text"
                                            name="organization"
                                            placeholder="e.g. Google"
                                            value={formData.organization}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '16px 20px 16px 54px',
                                                fontSize: '15px',
                                                fontWeight: '500',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '14px',
                                                outline: 'none',
                                                transition: 'all 0.3s ease',
                                                backgroundColor: '#f8fafc',
                                                color: '#0f172a'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = '#667eea';
                                                e.target.style.backgroundColor = 'white';
                                                e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = '#e2e8f0';
                                                e.target.style.backgroundColor = '#f8fafc';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                        <Building2 className="input-icon-left" size={20} strokeWidth={2} />
                                    </div>
                                </div>

                                {/* Industry */}
                                <div className="input-wrapper">
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        color: '#334155'
                                    }}>
                                        Industry (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="industry"
                                        placeholder="e.g. Fintech, Healthcare, AI/ML"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '16px 20px 16px 54px',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '14px',
                                            outline: 'none',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#f8fafc',
                                            color: '#0f172a'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#667eea';
                                            e.target.style.backgroundColor = 'white';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#e2e8f0';
                                            e.target.style.backgroundColor = '#f8fafc';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    <Target className="input-icon-left" size={20} strokeWidth={2} />
                                </div>

                                {/* LinkedIn (Optional) */}
                                <div className="input-wrapper">
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        color: '#334155'
                                    }}>
                                        LinkedIn Profile (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        name="linkedinLink"
                                        placeholder="https://linkedin.com/in/yourprofile"
                                        value={formData.linkedinLink}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '16px 20px 16px 54px',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '14px',
                                            outline: 'none',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#f8fafc',
                                            color: '#0f172a'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#667eea';
                                            e.target.style.backgroundColor = 'white';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#e2e8f0';
                                            e.target.style.backgroundColor = '#f8fafc';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    <Linkedin className="input-icon-left" size={20} strokeWidth={2} />
                                </div>

                                {/* Mentorship Checkbox */}
                                <label className="checkbox-wrapper">
                                    <input
                                        type="checkbox"
                                        name="isOpenToMentorship"
                                        checked={formData.isOpenToMentorship}
                                        onChange={(e) => setFormData({ ...formData, isOpenToMentorship: e.target.checked })}
                                    />
                                    <div>
                                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '2px' }}>
                                            Open to Mentoring Students
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#64748b' }}>
                                            Help guide the next generation of alumni
                                        </div>
                                    </div>
                                </label>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="error-shake" style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px',
                                padding: '16px 20px',
                                background: 'rgba(239, 68, 68, 0.08)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '14px',
                                marginTop: '24px'
                            }}>
                                <AlertCircle size={20} color="#ef4444" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
                                <p style={{ 
                                    color: '#ef4444', 
                                    fontSize: '14px', 
                                    fontWeight: '600',
                                    margin: 0,
                                    lineHeight: '1.5'
                                }}>
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            marginTop: '32px'
                        }}>
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    style={{
                                        flex: '0 0 auto',
                                        padding: '16px 32px',
                                        fontSize: '15px',
                                        fontWeight: '700',
                                        color: '#667eea',
                                        background: 'white',
                                        border: '2px solid #667eea',
                                        borderRadius: '14px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'white';
                                    }}
                                >
                                    <ArrowLeft size={18} strokeWidth={2.5} />
                                    Back
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={currentStep === totalSteps ? handleSubmit : nextStep}
                                disabled={loading}
                                style={{
                                    flex: 1,
                                    padding: '16px',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    color: 'white',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    border: 'none',
                                    borderRadius: '14px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    opacity: loading ? 0.7 : 1
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading) {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!loading) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
                                    }
                                }}
                            >
                                {loading ? (
                                    <>
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            border: '3px solid rgba(255,255,255,0.3)',
                                            borderTop: '3px solid white',
                                            borderRadius: '50%',
                                            animation: 'spin 0.8s linear infinite'
                                        }}></div>
                                        <span>Creating Account...</span>
                                    </>
                                ) : currentStep === totalSteps ? (
                                    <>
                                        <span>Complete Registration</span>
                                        <CheckCircle2 size={20} strokeWidth={2.5} />
                                    </>
                                ) : (
                                    <>
                                        <span>Continue</span>
                                        <ArrowRight size={20} strokeWidth={2.5} />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Sign In Link */}
                        <div style={{
                            marginTop: '32px',
                            paddingTop: '24px',
                            borderTop: '1px solid #e2e8f0',
                            textAlign: 'center'
                        }}>
                            <p style={{
                                color: '#64748b',
                                fontSize: '14px',
                                fontWeight: '500',
                                margin: 0
                            }}>
                                Already have an account?{' '}
                                <Link 
                                    to="/login"
                                    style={{
                                        color: '#667eea',
                                        fontWeight: '700',
                                        textDecoration: 'none',
                                        transition: 'color 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.color = '#764ba2'}
                                    onMouseLeave={(e) => e.target.style.color = '#667eea'}
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImprovedSignup;