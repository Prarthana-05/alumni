import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff, GraduationCap, Users, CheckCircle } from 'lucide-react';

const ImprovedLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.endsWith('.edu')) {
            setError("Invalid domain. Please use your .edu email.");
            return;
        }

        setLoading(true);

        try {
            const user = await login(email, password);
            
            // Success delay for smooth transition
            setTimeout(() => {
                // Redirect based on role
                if (user.role === 'admin') navigate('/admin');
                else if (user.role === 'alumni') navigate('/alumni');
                else navigate('/student');
            }, 500);
        } catch (err) {
            if (err.message && err.message.toLowerCase().includes("approval")) {
                setError("Your account is awaiting admin approval. Please check your email.");
            } else {
                setError(err.message || "Login failed");
            }
            setLoading(false);
        }
    };

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

                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-30px) translateX(20px); }
                }

                @keyframes float-slower {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(20px) translateX(-15px); }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
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

                .gradient-bg {
                    background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe, #43e97b);
                    background-size: 400% 400%;
                    animation: gradient-shift 15s ease infinite;
                }

                .card-float {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .input-wrapper {
                    position: relative;
                    margin-bottom: 24px;
                }

                .input-icon-left {
                    position: absolute;
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    transition: all 0.3s ease;
                    z-index: 1;
                }

                .input-wrapper input:focus + .input-icon-left {
                    color: #667eea;
                }

                .shimmer-btn {
                    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%);
                    background-size: 200% 100%;
                    animation: shimmer 3s linear infinite;
                }

                .error-shake {
                    animation: shake 0.5s;
                }

                .floating-element {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0.15;
                }

                .float-1 {
                    width: 400px;
                    height: 400px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    top: -10%;
                    right: -5%;
                    animation: float-slow 25s ease-in-out infinite;
                }

                .float-2 {
                    width: 300px;
                    height: 300px;
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    bottom: -5%;
                    left: -5%;
                    animation: float-slower 20s ease-in-out infinite;
                }

                .float-3 {
                    width: 200px;
                    height: 200px;
                    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                    top: 40%;
                    right: 10%;
                    animation: float-slow 30s ease-in-out infinite;
                }

                .benefit-card {
                    transition: all 0.3s ease;
                }

                .benefit-card:hover {
                    transform: translateY(-5px);
                }
            `}</style>

            <div style={{
                minHeight: '100vh',
                display: 'flex',
                position: 'relative',
                overflow: 'hidden'
            }} className="gradient-bg">
                
                {/* Floating Background Elements */}
                <div className="floating-element float-1"></div>
                <div className="floating-element float-2"></div>
                <div className="floating-element float-3"></div>

                {/* Left Side - Branding & Info */}
                <div style={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '80px',
                    position: 'relative',
                    zIndex: 10
                }}>
                    <div style={{ maxWidth: '560px' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 24px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '50px',
                            marginBottom: '32px',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <GraduationCap size={24} color="white" strokeWidth={2.5} />
                            <span style={{ color: 'white', fontSize: '14px', fontWeight: '700', letterSpacing: '0.5px' }}>
                                ALUMNI NETWORK PORTAL
                            </span>
                        </div>

                        <h1 style={{
                            fontSize: '56px',
                            fontWeight: '900',
                            color: 'white',
                            marginBottom: '24px',
                            lineHeight: '1.1',
                            letterSpacing: '-1px'
                        }}>
                            Connect, Grow,<br />
                            <span style={{ 
                                background: 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Succeed Together
                            </span>
                        </h1>

                        <p style={{
                            fontSize: '18px',
                            color: 'rgba(255, 255, 255, 0.9)',
                            lineHeight: '1.7',
                            marginBottom: '48px',
                            fontWeight: '500'
                        }}>
                            Join thousands of alumni and students building meaningful connections, 
                            sharing opportunities, and shaping the future together.
                        </p>

                        {/* Benefits Grid */}
                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div className="benefit-card" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '20px 24px',
                                background: 'rgba(255, 255, 255, 0.12)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Users size={24} color="white" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>
                                        Professional Networking
                                    </h4>
                                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: 0 }}>
                                        Connect with alumni across industries and roles
                                    </p>
                                </div>
                            </div>

                            <div className="benefit-card" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '20px 24px',
                                background: 'rgba(255, 255, 255, 0.12)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <CheckCircle size={24} color="white" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>
                                        Career Opportunities
                                    </h4>
                                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: 0 }}>
                                        Access exclusive jobs, internships, and mentorship
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div style={{
                    width: '100%',
                    maxWidth: '540px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px',
                    position: 'relative',
                    zIndex: 10
                }}>
                    
                    <div className="card-float" style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '32px',
                        padding: '56px 48px',
                        boxShadow: '0 32px 96px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}>
                        
                        {/* Header */}
                        <div style={{ marginBottom: '40px' }}>
                            <h2 style={{
                                fontSize: '32px',
                                fontWeight: '900',
                                color: '#0f172a',
                                marginBottom: '8px',
                                letterSpacing: '-0.5px'
                            }}>
                                Welcome Back
                            </h2>
                            <p style={{
                                color: '#64748b',
                                fontSize: '15px',
                                fontWeight: '500',
                                margin: 0
                            }}>
                                Login to your institutional portal
                            </p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit}>
                            
                            {/* Email Input */}
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
                                    placeholder="name@institute.edu"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError('');
                                    }}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '18px 20px 18px 56px',
                                        fontSize: '15px',
                                        fontWeight: '500',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: '16px',
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

                            {/* Password Input */}
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
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '18px 56px 18px 56px',
                                        fontSize: '15px',
                                        fontWeight: '500',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: '16px',
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
                                        right: '20px',
                                        top: '64%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#94a3b8',
                                        padding: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'color 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

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
                                    marginBottom: '24px'
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

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '18px',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '16px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    opacity: loading ? 0.7 : 1,
                                    marginBottom: '24px'
                                }}
                                className={loading ? '' : 'shimmer-btn'}
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
                                        <span>Logging in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Log In to Portal</span>
                                        <ArrowRight size={20} strokeWidth={2.5} />
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                marginBottom: '24px'
                            }}>
                                <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                                <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>OR</span>
                                <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                            </div>

                            {/* Sign Up Link */}
                            <div style={{ textAlign: 'center' }}>
                                <p style={{
                                    color: '#64748b',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    margin: 0
                                }}>
                                    Don't have an account?{' '}
                                    <Link 
                                        to="/signup"
                                        style={{
                                            color: '#667eea',
                                            fontWeight: '700',
                                            textDecoration: 'none',
                                            transition: 'color 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = '#764ba2'}
                                        onMouseLeave={(e) => e.target.style.color = '#667eea'}
                                    >
                                        Register here
                                    </Link>
                                </p>
                            </div>
                        </form>

                        {/* Footer Note */}
                        <div style={{
                            marginTop: '32px',
                            paddingTop: '24px',
                            borderTop: '1px solid #e2e8f0',
                            textAlign: 'center'
                        }}>
                            <p style={{
                                color: '#94a3b8',
                                fontSize: '13px',
                                fontWeight: '500',
                                margin: 0,
                                lineHeight: '1.6'
                            }}>
                                By logging in, you agree to our Terms of Service<br />
                                and Privacy Policy
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImprovedLogin;