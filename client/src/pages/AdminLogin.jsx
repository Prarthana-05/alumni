import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Lock, Mail, AlertCircle, ArrowRight, Shield, Eye, EyeOff } from 'lucide-react';

const ImprovedAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/admin/login",
        { email, password }
      );

      const { token, user } = res.data;
      adminLogin(user, token);

      // Success animation before navigation
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid admin credentials"
      );
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

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .animated-bg {
          background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          animation: float 20s ease-in-out infinite;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          bottom: 10%;
          left: 20%;
          animation-delay: 4s;
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .input-wrapper {
          position: relative;
          margin-bottom: 24px;
        }

        .input-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          transition: all 0.3s ease;
          z-index: 1;
        }

        .input-wrapper input:focus + .input-icon {
          color: #667eea;
        }

        .shimmer-button {
          background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        .error-shake {
          animation: shake 0.5s;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }} className="animated-bg">
        
        {/* Floating Background Shapes */}
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>

        {/* Login Card Container */}
        <div style={{
          width: '100%',
          maxWidth: '480px',
          padding: '20px',
          position: 'relative',
          zIndex: 10
        }} className="fade-in-up">
          
          {/* Main Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '56px 48px',
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            
            {/* Logo/Icon Section */}
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '40px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                transform: 'rotate(-5deg)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-5deg) scale(1)'}>
                <Shield size={40} color="white" strokeWidth={2.5} />
              </div>
              
              <h1 style={{
                fontSize: '32px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '8px',
                letterSpacing: '-0.5px'
              }}>
                Admin Portal
              </h1>
              
              <p style={{
                color: '#64748b',
                fontSize: '15px',
                fontWeight: '500',
                margin: 0
              }}>
                Secure access to alumni management system
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              
              {/* Email Input */}
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
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
                <Mail className="input-icon" size={20} strokeWidth={2} />
              </div>

              {/* Password Input */}
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
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
                <Lock className="input-icon" size={20} strokeWidth={2} />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
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
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 20px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '14px',
                  marginBottom: '24px'
                }}>
                  <AlertCircle size={20} color="#ef4444" strokeWidth={2} />
                  <p style={{ 
                    color: '#ef4444', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    margin: 0
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
                  opacity: loading ? 0.7 : 1
                }}
                className={loading ? '' : 'shimmer-button'}
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
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Login to Dashboard</span>
                    <ArrowRight size={20} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
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
                margin: 0
              }}>
                Protected by enterprise-grade security
              </p>
            </div>
          </div>

          {/* Additional Info Card */}
          <div style={{
            marginTop: '20px',
            padding: '20px 24px',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            textAlign: 'center'
          }}>
            <p style={{
              color: '#64748b',
              fontSize: '13px',
              fontWeight: '500',
              margin: 0
            }}>
              Having trouble logging in? Contact system administrator
            </p>
          </div>
        </div>

        {/* Spinner Animation */}
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
};

export default ImprovedAdminLogin;