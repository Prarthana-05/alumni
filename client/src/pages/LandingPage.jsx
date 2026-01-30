import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    ArrowRight, 
    Users, 
    Briefcase, 
    MessageSquare, 
    Award,
    TrendingUp,
    Shield,
    Sparkles,
    GraduationCap,
    Building2,
    Calendar,
    BookOpen,
    CheckCircle,
    Star,
    Menu,
    X,
    ChevronRight,
    Zap,
    Target,
    Heart,
    Globe
} from 'lucide-react';

const ImprovedLandingPage = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('student');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

                html {
                    scroll-behavior: smooth;
                }

                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
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

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                .gradient-text {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .scale-in {
                    animation: scaleIn 0.6s ease-out forwards;
                }

                .feature-card {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .feature-card:hover {
                    transform: translateY(-12px);
                }

                .stat-card {
                    transition: all 0.3s ease;
                }

                .stat-card:hover {
                    transform: scale(1.05);
                }

                .role-tab {
                    transition: all 0.3s ease;
                }

                .testimonial-card {
                    transition: all 0.3s ease;
                }

                .testimonial-card:hover {
                    transform: translateY(-8px);
                }

                .floating {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>

            {/* Navigation */}
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
                transition: 'all 0.3s ease',
                boxShadow: isScrolled ? '0 4px 24px rgba(0, 0, 0, 0.06)' : 'none'
            }}>
                <div style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                    padding: '20px 40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)'
                        }}>
                            <GraduationCap size={24} color="white" strokeWidth={2.5} />
                        </div>
                        <span style={{
                            fontSize: '24px',
                            fontWeight: '900',
                            color: '#0f172a',
                            letterSpacing: '-0.5px'
                        }}>
                            Alumni<span className="gradient-text">Connect</span>
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div style={{
                        display: 'flex',
                        gap: '32px',
                        alignItems: 'center'
                    }}>
                        <a href="#features" style={{
                            color: '#64748b',
                            fontSize: '15px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#667eea'}
                        onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                            Features
                        </a>
                        <a href="#roles" style={{
                            color: '#64748b',
                            fontSize: '15px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#667eea'}
                        onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                            How It Works
                        </a>
                        <a href="#testimonials" style={{
                            color: '#64748b',
                            fontSize: '15px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#667eea'}
                        onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                            Success Stories
                        </a>
                        
                        <div style={{ display: 'flex', gap: '12px', marginLeft: '20px' }}>
                            <Link to="/login" style={{
                                padding: '10px 24px',
                                fontSize: '15px',
                                fontWeight: '700',
                                color: '#667eea',
                                background: 'white',
                                border: '2px solid #667eea',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                display: 'inline-block'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(102, 126, 234, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'white';
                            }}>
                                Log In
                            </Link>
                            <Link to="/signup" style={{
                                padding: '10px 24px',
                                fontSize: '15px',
                                fontWeight: '700',
                                color: 'white',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 16px rgba(102, 126, 234, 0.4)';
                            }}>
                                Sign Up
                                <ArrowRight size={16} strokeWidth={2.5} />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe)',
                backgroundSize: '400% 400%',
                animation: 'gradient-shift 15s ease infinite',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '80px'
            }}>
                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    right: '10%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    filter: 'blur(60px)'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    filter: 'blur(60px)'
                }}></div>

                <div style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                    padding: '0 40px',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 10
                }}>
                    {/* Badge */}
                    <div className="fade-in-up" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 24px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '50px',
                        marginBottom: '32px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        animationDelay: '0.1s'
                    }}>
                        <Sparkles size={18} color="white" strokeWidth={2.5} />
                        <span style={{ color: 'white', fontSize: '14px', fontWeight: '700', letterSpacing: '0.5px' }}>
                            OFFICIAL ALUMNI NETWORK PLATFORM
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="fade-in-up" style={{
                        fontSize: '72px',
                        fontWeight: '900',
                        color: 'white',
                        lineHeight: '1.1',
                        marginBottom: '24px',
                        letterSpacing: '-2px',
                        animationDelay: '0.2s'
                    }}>
                        Connect. Mentor.<br />
                        <span style={{
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Grow Together.
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="fade-in-up" style={{
                        fontSize: '20px',
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: '1.7',
                        maxWidth: '700px',
                        margin: '0 auto 48px',
                        fontWeight: '500',
                        animationDelay: '0.3s'
                    }}>
                        Bridge the gap between campus and career. Get verified mentorship, 
                        exclusive job referrals, and real interview insights from alumni worldwide.
                    </p>

                    {/* CTA Buttons */}
                    <div className="fade-in-up" style={{
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'center',
                        marginBottom: '64px',
                        animationDelay: '0.4s'
                    }}>
                        <Link to="/signup" style={{
                            padding: '18px 36px',
                            fontSize: '17px',
                            fontWeight: '700',
                            color: '#667eea',
                            background: 'white',
                            border: 'none',
                            borderRadius: '16px',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-4px)';
                            e.target.style.boxShadow = '0 16px 48px rgba(255, 255, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.3)';
                        }}>
                            Join the Network
                            <ArrowRight size={20} strokeWidth={2.5} />
                        </Link>
                        <a href="#features" style={{
                            padding: '18px 36px',
                            fontSize: '17px',
                            fontWeight: '700',
                            color: 'white',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '16px',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                            e.target.style.transform = 'translateY(-4px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                            e.target.style.transform = 'translateY(0)';
                        }}>
                            Learn More
                            <ChevronRight size={20} strokeWidth={2.5} />
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="fade-in-up" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '32px',
                        maxWidth: '800px',
                        margin: '0 auto',
                        animationDelay: '0.5s'
                    }}>
                        <div className="stat-card" style={{
                            padding: '24px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <div style={{ fontSize: '40px', fontWeight: '900', color: 'white', marginBottom: '8px' }}>
                                10K+
                            </div>
                            <div style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.9)', fontWeight: '600' }}>
                                Alumni Members
                            </div>
                        </div>
                        <div className="stat-card" style={{
                            padding: '24px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <div style={{ fontSize: '40px', fontWeight: '900', color: 'white', marginBottom: '8px' }}>
                                5K+
                            </div>
                            <div style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.9)', fontWeight: '600' }}>
                                Job Referrals
                            </div>
                        </div>
                        <div className="stat-card" style={{
                            padding: '24px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <div style={{ fontSize: '40px', fontWeight: '900', color: 'white', marginBottom: '8px' }}>
                                98%
                            </div>
                            <div style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.9)', fontWeight: '600' }}>
                                Success Rate
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" style={{
                padding: '120px 40px',
                background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    {/* Section Header */}
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 20px',
                            background: 'rgba(102, 126, 234, 0.1)',
                            borderRadius: '50px',
                            marginBottom: '24px'
                        }}>
                            <Zap size={16} color="#667eea" strokeWidth={2.5} />
                            <span style={{ color: '#667eea', fontSize: '13px', fontWeight: '700', letterSpacing: '0.5px' }}>
                                POWERFUL FEATURES
                            </span>
                        </div>
                        <h2 style={{
                            fontSize: '48px',
                            fontWeight: '900',
                            color: '#0f172a',
                            marginBottom: '16px',
                            letterSpacing: '-1px'
                        }}>
                            Everything You Need to Succeed
                        </h2>
                        <p style={{
                            fontSize: '18px',
                            color: '#64748b',
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: '1.7'
                        }}>
                            Comprehensive platform designed to bridge the gap between campus and career
                        </p>
                    </div>

                    {/* Feature Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '32px'
                    }}>
                        <div className="feature-card" style={{
                            padding: '40px',
                            background: 'white',
                            borderRadius: '24px',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)'
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '24px',
                                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
                            }}>
                                <Users size={32} color="white" strokeWidth={2} />
                            </div>
                            <h3 style={{
                                fontSize: '22px',
                                fontWeight: '700',
                                color: '#0f172a',
                                marginBottom: '12px'
                            }}>
                                Verified Alumni Network
                            </h3>
                            <p style={{
                                fontSize: '15px',
                                color: '#64748b',
                                lineHeight: '1.7',
                                margin: 0
                            }}>
                                Connect with verified alumni from top companies. Get authentic mentorship from professionals who've walked your path.
                            </p>
                        </div>

                        <div className="feature-card" style={{
                            padding: '40px',
                            background: 'white',
                            borderRadius: '24px',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)'
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '24px',
                                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.3)'
                            }}>
                                <Briefcase size={32} color="white" strokeWidth={2} />
                            </div>
                            <h3 style={{
                                fontSize: '22px',
                                fontWeight: '700',
                                color: '#0f172a',
                                marginBottom: '12px'
                            }}>
                                Exclusive Job Referrals
                            </h3>
                            <p style={{
                                fontSize: '15px',
                                color: '#64748b',
                                lineHeight: '1.7',
                                margin: 0
                            }}>
                                Direct referral requests to alumni at your dream companies. Structured approval system to maximize your chances.
                            </p>
                        </div>

                        <div className="feature-card" style={{
                            padding: '40px',
                            background: 'white',
                            borderRadius: '24px',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)'
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '24px',
                                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
                            }}>
                                <MessageSquare size={32} color="white" strokeWidth={2} />
                            </div>
                            <h3 style={{
                                fontSize: '22px',
                                fontWeight: '700',
                                color: '#0f172a',
                                marginBottom: '12px'
                            }}>
                                1-on-1 Mentorship
                            </h3>
                            <p style={{
                                fontSize: '15px',
                                color: '#64748b',
                                lineHeight: '1.7',
                                margin: 0
                            }}>
                                Request personalized career guidance from experienced alumni. Get insights on career paths, higher studies, and entrepreneurship.
                            </p>
                        </div>

                        <div className="feature-card" style={{
                            padding: '40px',
                            background: 'white',
                            borderRadius: '24px',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)'
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '24px',
                                boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)'
                            }}>
                                <BookOpen size={32} color="white" strokeWidth={2} />
                            </div>
                            <h3 style={{
                                fontSize: '22px',
                                fontWeight: '700',
                                color: '#0f172a',
                                marginBottom: '12px'
                            }}>
                                Interview Experiences
                            </h3>
                            <p style={{
                                fontSize: '15px',
                                color: '#64748b',
                                lineHeight: '1.7',
                                margin: 0
                            }}>
                                Curated repository of real interview experiences. Filter by company, role, and difficulty to prepare effectively.
                            </p>
                        </div>

                        <div className="feature-card" style={{
                            padding: '40px',
                            background: 'white',
                            borderRadius: '24px',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)'
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '24px',
                                boxShadow: '0 8px 24px rgba(236, 72, 153, 0.3)'
                            }}>
                                <Calendar size={32} color="white" strokeWidth={2} />
                            </div>
                            <h3 style={{
                                fontSize: '22px',
                                fontWeight: '700',
                                color: '#0f172a',
                                marginBottom: '12px'
                            }}>
                                Events & Webinars
                            </h3>
                            <p style={{
                                fontSize: '15px',
                                color: '#64748b',
                                lineHeight: '1.7',
                                margin: 0
                            }}>
                                Stay updated with alumni meetups, tech talks, and career workshops. Network with professionals across industries.
                            </p>
                        </div>

                        <div className="feature-card" style={{
                            padding: '40px',
                            background: 'white',
                            borderRadius: '24px',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)'
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '24px',
                                boxShadow: '0 8px 24px rgba(6, 182, 212, 0.3)'
                            }}>
                                <TrendingUp size={32} color="white" strokeWidth={2} />
                            </div>
                            <h3 style={{
                                fontSize: '22px',
                                fontWeight: '700',
                                color: '#0f172a',
                                marginBottom: '12px'
                            }}>
                                Opportunity Tracker
                            </h3>
                            <p style={{
                                fontSize: '15px',
                                color: '#64748b',
                                lineHeight: '1.7',
                                margin: 0
                            }}>
                                Track job postings, internships, and startup opportunities shared by alumni. Never miss a great opportunity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roles Section */}
            <section id="roles" style={{
                padding: '120px 40px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative blur */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    right: '-10%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    filter: 'blur(80px)'
                }}></div>

                <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                    {/* Section Header */}
                    <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <h2 style={{
                            fontSize: '48px',
                            fontWeight: '900',
                            color: 'white',
                            marginBottom: '16px',
                            letterSpacing: '-1px'
                        }}>
                            How It Works
                        </h2>
                        <p style={{
                            fontSize: '18px',
                            color: 'rgba(255, 255, 255, 0.9)',
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: '1.7'
                        }}>
                            Role-based access control ensures secure and meaningful interactions
                        </p>
                    </div>

                    {/* Role Tabs */}
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'center',
                        marginBottom: '48px'
                    }}>
                        {['student', 'alumni', 'admin'].map((role) => (
                            <button
                                key={role}
                                onClick={() => setActiveTab(role)}
                                className="role-tab"
                                style={{
                                    padding: '16px 32px',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    color: activeTab === role ? '#667eea' : 'white',
                                    background: activeTab === role ? 'white' : 'rgba(255, 255, 255, 0.15)',
                                    border: activeTab === role ? 'none' : '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(10px)',
                                    textTransform: 'capitalize',
                                    boxShadow: activeTab === role ? '0 8px 24px rgba(0, 0, 0, 0.15)' : 'none'
                                }}
                            >
                                {role}
                            </button>
                        ))}
                    </div>

                    {/* Role Content */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '32px',
                        padding: '64px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        {activeTab === 'student' && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
                                <div>
                                    <div style={{
                                        width: '72px',
                                        height: '72px',
                                        borderRadius: '18px',
                                        background: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '24px',
                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                                    }}>
                                        <GraduationCap size={36} color="#667eea" strokeWidth={2.5} />
                                    </div>
                                    <h3 style={{
                                        fontSize: '32px',
                                        fontWeight: '900',
                                        color: 'white',
                                        marginBottom: '20px',
                                        letterSpacing: '-0.5px'
                                    }}>
                                        Student Access
                                    </h3>
                                    <p style={{
                                        fontSize: '17px',
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        lineHeight: '1.7',
                                        marginBottom: '32px'
                                    }}>
                                        Get the support you need to succeed in your career journey
                                    </p>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {[
                                            'Access career guidance and mentorship',
                                            'Apply for job referrals and internships',
                                            'Read interview experiences from alumni',
                                            'Register for events and webinars',
                                            'Connect with alumni in your field'
                                        ].map((item, idx) => (
                                            <li key={idx} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                marginBottom: '16px',
                                                fontSize: '15px',
                                                color: 'rgba(255, 255, 255, 0.95)',
                                                fontWeight: '500'
                                            }}>
                                                <CheckCircle size={20} color="white" strokeWidth={2.5} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="floating" style={{
                                    width: '100%',
                                    height: '400px',
                                    borderRadius: '24px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: '2px solid rgba(255, 255, 255, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Target size={120} color="rgba(255, 255, 255, 0.5)" strokeWidth={1.5} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'alumni' && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
                                <div>
                                    <div style={{
                                        width: '72px',
                                        height: '72px',
                                        borderRadius: '18px',
                                        background: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '24px',
                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                                    }}>
                                        <Users size={36} color="#667eea" strokeWidth={2.5} />
                                    </div>
                                    <h3 style={{
                                        fontSize: '32px',
                                        fontWeight: '900',
                                        color: 'white',
                                        marginBottom: '20px',
                                        letterSpacing: '-0.5px'
                                    }}>
                                        Alumni Privileges
                                    </h3>
                                    <p style={{
                                        fontSize: '17px',
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        lineHeight: '1.7',
                                        marginBottom: '32px'
                                    }}>
                                        Give back to your alma mater and grow your professional network
                                    </p>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {[
                                            'Post job opportunities and internships',
                                            'Offer mentorship to current students',
                                            'Share interview experiences and insights',
                                            'Request visibility for projects or startups',
                                            'Update career milestones and achievements'
                                        ].map((item, idx) => (
                                            <li key={idx} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                marginBottom: '16px',
                                                fontSize: '15px',
                                                color: 'rgba(255, 255, 255, 0.95)',
                                                fontWeight: '500'
                                            }}>
                                                <CheckCircle size={20} color="white" strokeWidth={2.5} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="floating" style={{
                                    width: '100%',
                                    height: '400px',
                                    borderRadius: '24px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: '2px solid rgba(255, 255, 255, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Heart size={120} color="rgba(255, 255, 255, 0.5)" strokeWidth={1.5} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'admin' && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
                                <div>
                                    <div style={{
                                        width: '72px',
                                        height: '72px',
                                        borderRadius: '18px',
                                        background: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '24px',
                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                                    }}>
                                        <Shield size={36} color="#667eea" strokeWidth={2.5} />
                                    </div>
                                    <h3 style={{
                                        fontSize: '32px',
                                        fontWeight: '900',
                                        color: 'white',
                                        marginBottom: '20px',
                                        letterSpacing: '-0.5px'
                                    }}>
                                        Admin Control
                                    </h3>
                                    <p style={{
                                        fontSize: '17px',
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        lineHeight: '1.7',
                                        marginBottom: '32px'
                                    }}>
                                        Complete oversight and management of the alumni network
                                    </p>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {[
                                            'Verify and approve alumni registrations',
                                            'Moderate visibility requests and content',
                                            'View comprehensive analytics dashboard',
                                            'Manage interview experience submissions',
                                            'Export reports in CSV and Excel formats'
                                        ].map((item, idx) => (
                                            <li key={idx} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                marginBottom: '16px',
                                                fontSize: '15px',
                                                color: 'rgba(255, 255, 255, 0.95)',
                                                fontWeight: '500'
                                            }}>
                                                <CheckCircle size={20} color="white" strokeWidth={2.5} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="floating" style={{
                                    width: '100%',
                                    height: '400px',
                                    borderRadius: '24px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: '2px solid rgba(255, 255, 255, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Globe size={120} color="rgba(255, 255, 255, 0.5)" strokeWidth={1.5} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" style={{
                padding: '120px 40px',
                background: 'white'
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    {/* Section Header */}
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 20px',
                            background: 'rgba(102, 126, 234, 0.1)',
                            borderRadius: '50px',
                            marginBottom: '24px'
                        }}>
                            <Star size={16} color="#667eea" strokeWidth={2.5} />
                            <span style={{ color: '#667eea', fontSize: '13px', fontWeight: '700', letterSpacing: '0.5px' }}>
                                SUCCESS STORIES
                            </span>
                        </div>
                        <h2 style={{
                            fontSize: '48px',
                            fontWeight: '900',
                            color: '#0f172a',
                            marginBottom: '16px',
                            letterSpacing: '-1px'
                        }}>
                            What Our Community Says
                        </h2>
                        <p style={{
                            fontSize: '18px',
                            color: '#64748b',
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: '1.7'
                        }}>
                            Real stories from students and alumni who found success through our platform
                        </p>
                    </div>

                    {/* Testimonials Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '32px'
                    }}>
                        <div className="testimonial-card" style={{
                            padding: '40px',
                            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                            borderRadius: '24px',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)'
                        }}>
                            <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="#fbbf24" color="#fbbf24" />
                                ))}
                            </div>
                            <p style={{
                                fontSize: '16px',
                                color: '#334155',
                                lineHeight: '1.7',
                                marginBottom: '24px',
                                fontStyle: 'italic'
                            }}>
                                "Got my dream job at Google through a referral from a senior alumni. The platform made it so easy to connect and the mentorship I received was invaluable!"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '18px',
                                    fontWeight: '700'
                                }}>
                                    P
                                </div>
                                <div>
                                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                                        Priya Sharma
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                                        CS Graduate, Class of 2023
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card" style={{
                            padding: '40px',
                            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                            borderRadius: '24px',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)'
                        }}>
                            <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="#fbbf24" color="#fbbf24" />
                                ))}
                            </div>
                            <p style={{
                                fontSize: '16px',
                                color: '#334155',
                                lineHeight: '1.7',
                                marginBottom: '24px',
                                fontStyle: 'italic'
                            }}>
                                "As an alumni, I love being able to give back to juniors. The platform is well-designed and makes mentorship feel meaningful and organized."
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '18px',
                                    fontWeight: '700'
                                }}>
                                    R
                                </div>
                                <div>
                                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                                        Rahul Verma
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                                        SDE at Microsoft, Class of 2020
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card" style={{
                            padding: '40px',
                            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                            borderRadius: '24px',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)'
                        }}>
                            <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="#fbbf24" color="#fbbf24" />
                                ))}
                            </div>
                            <p style={{
                                fontSize: '16px',
                                color: '#334155',
                                lineHeight: '1.7',
                                marginBottom: '24px',
                                fontStyle: 'italic'
                            }}>
                                "The interview experiences section helped me prepare for my Amazon interviews. Reading real experiences from alumni who cleared it was a game-changer!"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '18px',
                                    fontWeight: '700'
                                }}>
                                    A
                                </div>
                                <div>
                                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                                        Ananya Patel
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                                        Final Year Student, ECE
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '120px 40px',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '800px',
                    height: '800px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)'
                }}></div>

                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
                    <h2 style={{
                        fontSize: '56px',
                        fontWeight: '900',
                        color: 'white',
                        marginBottom: '24px',
                        letterSpacing: '-1px',
                        lineHeight: '1.1'
                    }}>
                        Ready to Transform<br />Your Career Journey?
                    </h2>
                    <p style={{
                        fontSize: '20px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        marginBottom: '48px',
                        lineHeight: '1.7'
                    }}>
                        Join thousands of students and alumni building meaningful connections today
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        <Link to="/signup" style={{
                            padding: '20px 40px',
                            fontSize: '18px',
                            fontWeight: '700',
                            color: '#0f172a',
                            background: 'white',
                            border: 'none',
                            borderRadius: '16px',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: '0 8px 32px rgba(255, 255, 255, 0.2)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-4px)';
                            e.target.style.boxShadow = '0 16px 48px rgba(255, 255, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.2)';
                        }}>
                            Get Started Free
                            <ArrowRight size={20} strokeWidth={2.5} />
                        </Link>
                        <Link to="/login" style={{
                            padding: '20px 40px',
                            fontSize: '18px',
                            fontWeight: '700',
                            color: 'white',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '16px',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.transform = 'translateY(-4px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.transform = 'translateY(0)';
                        }}>
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                padding: '60px 40px',
                background: '#0f172a',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <GraduationCap size={20} color="white" strokeWidth={2.5} />
                        </div>
                        <span style={{
                            fontSize: '20px',
                            fontWeight: '800',
                            color: 'white'
                        }}>
                            AlumniConnect
                        </span>
                    </div>
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '14px',
                        margin: 0
                    }}>
                        © {new Date().getFullYear()} AlumniConnect. All rights reserved. Built with ❤️ for the community.
                    </p>
                </div>
            </footer>
        </>
    );
};

export default ImprovedLandingPage;