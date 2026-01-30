import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp, 
  Briefcase, 
  MessageSquare, 
  Award,
  ChevronDown,
  Search,
  Filter,
  Download,
  BarChart3,
  Activity,
  Building2,
  GraduationCap,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Megaphone,
  BookOpen,
  Mail,
  Calendar,
  Target,
  Lightbulb
} from 'lucide-react';

const ImprovedAdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    // State management
    const [activeTab, setActiveTab] = useState('overview');
    const [pendingUsers, setPendingUsers] = useState([]);
    const [verifiedAlumni, setVerifiedAlumni] = useState([]);
    const [students, setStudents] = useState([]);
    const [opportunities, setOpportunities] = useState([]);
    const [mentorshipRequests, setMentorshipRequests] = useState([]);
    const [referralRequests, setReferralRequests] = useState([]);
    const [interviewExperiences, setInterviewExperiences] = useState([]);
    const [visibilityRequests, setVisibilityRequests] = useState([]);
    const [analytics, setAnalytics] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (user?.role !== 'admin') {
            navigate('/login');
            return;
        }
        fetchAllData();
    }, [user]);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            // Fetch all necessary data
            await Promise.all([
                fetchPendingVerifications(),
                fetchVerifiedAlumni(),
                fetchStudents(),
                fetchOpportunities(),
                fetchMentorshipRequests(),
                fetchReferralRequests(),
                fetchInterviewExperiences(),
                fetchVisibilityRequests(),
                fetchAnalytics()
            ]);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            setLoading(false);
        }
    };

    const fetchPendingVerifications = async () => {
        try {
            const res = await fetch('/api/users/admin/pending');
            const data = await res.json();
            setPendingUsers(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchVerifiedAlumni = async () => {
        try {
            const res = await fetch('/api/users/admin/alumni');
            const data = await res.json();
            setVerifiedAlumni(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchStudents = async () => {
        try {
            const res = await fetch('/api/users/admin/students');
            const data = await res.json();
            setStudents(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchOpportunities = async () => {
        try {
            const res = await fetch('/api/opportunities/admin');
            const data = await res.json();
            setOpportunities(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMentorshipRequests = async () => {
        try {
            const res = await fetch('/api/applications/admin/requests');
            const data = await res.json();
            setMentorshipRequests(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchReferralRequests = async () => {
        try {
            const res = await fetch('/api/referrals/admin/requests');
            const data = await res.json();
            setReferralRequests(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchInterviewExperiences = async () => {
        try {
            const res = await fetch('/api/experiences/admin/pending');
            const data = await res.json();
            setInterviewExperiences(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchVisibilityRequests = async () => {
        try {
            const res = await fetch('/api/visibility/admin/pending');
            const data = await res.json();
            setVisibilityRequests(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchAnalytics = async () => {
        try {
            const res = await fetch('/api/users/admin/analytics');
            const data = await res.json();
            setAnalytics(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleVerificationAction = async (id, status) => {
        try {
            const res = await fetch(`/api/users/admin/verify/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                setPendingUsers(pendingUsers.filter(u => u._id !== id));
                if (status === 'verified') {
                    fetchVerifiedAlumni();
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleVisibilityAction = async (id, status) => {
        try {
            const res = await fetch(`/api/visibility/admin/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                fetchVisibilityRequests();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleExperienceModeration = async (id, status) => {
        try {
            const res = await fetch(`/api/experiences/admin/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                fetchInterviewExperiences();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const exportAnalytics = (format) => {
        // Export analytics data in CSV or Excel format
        const endpoint = `/api/analytics/export?format=${format}`;
        window.open(endpoint, '_blank');
    };

    // Stat Card Component
    const StatCard = ({ icon: Icon, title, value, change, color }) => (
        <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.08)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.04)';
        }}>
            <div style={{ 
                position: 'absolute', 
                top: '-50%', 
                right: '-20%', 
                width: '200px', 
                height: '200px', 
                background: color,
                borderRadius: '50%',
                opacity: '0.05',
                filter: 'blur(40px)'
            }}></div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                <div>
                    <div style={{ 
                        color: '#64748b', 
                        fontSize: '13px', 
                        fontWeight: '600', 
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        marginBottom: '12px'
                    }}>{title}</div>
                    <div style={{ 
                        fontSize: '36px', 
                        fontWeight: '700', 
                        color: '#0f172a',
                        lineHeight: '1',
                        marginBottom: '8px'
                    }}>{value}</div>
                    {change !== undefined && (
                        <div style={{ 
                            fontSize: '13px', 
                            color: change > 0 ? '#10b981' : '#ef4444',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <TrendingUp size={14} />
                            {change > 0 ? '+' : ''}{change}% from last month
                        </div>
                    )}
                </div>
                <div style={{ 
                    background: color,
                    borderRadius: '16px',
                    padding: '14px',
                    boxShadow: `0 4px 16px ${color}40`
                }}>
                    <Icon size={24} color="white" strokeWidth={2.5} />
                </div>
            </div>
        </div>
    );

    // Tab Button Component
    const TabButton = ({ id, icon: Icon, label, count }) => (
        <button
            onClick={() => setActiveTab(id)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 24px',
                background: activeTab === id ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                color: activeTab === id ? 'white' : '#64748b',
                border: 'none',
                borderRadius: '14px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
                if (activeTab !== id) {
                    e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                    e.currentTarget.style.color = '#667eea';
                }
            }}
            onMouseLeave={(e) => {
                if (activeTab !== id) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#64748b';
                }
            }}
        >
            <Icon size={18} strokeWidth={2.5} />
            <span>{label}</span>
            {count > 0 && (
                <div style={{
                    background: activeTab === id ? 'rgba(255,255,255,0.25)' : '#667eea',
                    color: activeTab === id ? 'white' : 'white',
                    borderRadius: '12px',
                    padding: '2px 10px',
                    fontSize: '12px',
                    fontWeight: '700',
                    minWidth: '24px',
                    textAlign: 'center'
                }}>
                    {count}
                </div>
            )}
        </button>
    );

    // User Card Component for Verifications
    const UserVerificationCard = ({ user }) => (
        <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.04)';
        }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '28px',
                    fontWeight: '700',
                    flexShrink: 0,
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
                }}>
                    {user.name?.charAt(0) || 'A'}
                </div>
                
                <div style={{ flex: 1 }}>
                    <h3 style={{ 
                        margin: '0 0 16px 0', 
                        fontSize: '20px', 
                        fontWeight: '700',
                        color: '#0f172a'
                    }}>{user.name || "Alumni Applicant"}</h3>
                    
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '12px',
                        marginBottom: '20px'
                    }}>
                        <InfoRow icon={Mail} label="Email" value={user.email} />
                        <InfoRow icon={GraduationCap} label="Graduation Year" value={user.graduationYear} />
                        <InfoRow icon={Briefcase} label="Current Role" value={user.currentRole} />
                        <InfoRow icon={Building2} label="Organization" value={user.organization} />
                        <InfoRow icon={Target} label="Industry" value={user.industry || 'N/A'} />
                    </div>

                    {user.linkedinLink && (
                        <a 
                            href={user.linkedinLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: '#667eea',
                                textDecoration: 'none',
                                fontSize: '14px',
                                fontWeight: '600',
                                marginBottom: '20px'
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            View LinkedIn Profile
                        </a>
                    )}

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <ActionButton
                            onClick={() => handleVerificationAction(user._id, 'verified')}
                            color="#10b981"
                            icon={CheckCircle}
                            label="Approve"
                        />
                        <ActionButton
                            onClick={() => handleVerificationAction(user._id, 'rejected')}
                            color="#ef4444"
                            icon={XCircle}
                            label="Reject"
                        />
                        <ActionButton
                            onClick={() => setSelectedUser(user)}
                            color="#667eea"
                            icon={Eye}
                            label="View Details"
                            outlined
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    // Info Row Component
    const InfoRow = ({ icon: Icon, label, value }) => (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Icon size={16} color="#64748b" strokeWidth={2} />
            <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>{label}:</span>
            <span style={{ color: '#0f172a', fontSize: '14px', fontWeight: '500' }}>{value}</span>
        </div>
    );

    // Action Button Component
    const ActionButton = ({ onClick, color, icon: Icon, label, outlined = false }) => (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: outlined ? 'transparent' : color,
                color: outlined ? color : 'white',
                border: outlined ? `2px solid ${color}` : 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: outlined ? 'none' : `0 4px 16px ${color}40`
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = outlined ? `0 4px 16px ${color}20` : `0 8px 24px ${color}60`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = outlined ? 'none' : `0 4px 16px ${color}40`;
            }}
        >
            <Icon size={18} strokeWidth={2.5} />
            {label}
        </button>
    );

    // Overview Dashboard
    const OverviewDashboard = () => (
        <div style={{ display: 'grid', gap: '24px' }}>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <StatCard 
                    icon={Users} 
                    title="Total Alumni" 
                    value={analytics.totalAlumni || 0} 
                    color="#667eea"
                />
                <StatCard 
                    icon={GraduationCap} 
                    title="Active Students" 
                    value={analytics.activeStudents || 0} 
                    color="#f59e0b"
                />
                <StatCard 
                    icon={UserCheck} 
                    title="Pending Verifications" 
                    value={pendingUsers.length} 
                    color="#ef4444"
                />
                <StatCard 
                    icon={Briefcase} 
                    title="Active Opportunities" 
                    value={analytics.activeOpportunities || 0} 
                    color="#10b981"
                />
                <StatCard 
                    icon={MessageSquare} 
                    title="Mentorship Requests" 
                    value={analytics.mentorshipRequests || 0} 
                    color="#8b5cf6"
                />
                <StatCard 
                    icon={Activity} 
                    title="Alumni-Student Interactions" 
                    value={analytics.totalInteractions || 0} 
                    color="#ec4899"
                />
            </div>

            {/* Charts and Analytics */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '32px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.04)'
                }}>
                    <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                        Alumni Participation Trends
                    </h3>
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                        <BarChart3 size={48} strokeWidth={1.5} />
                        <p style={{ marginLeft: '16px' }}>Chart visualization would go here</p>
                    </div>
                </div>

                <div style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '32px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.04)'
                }}>
                    <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                        Top Industries
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {(analytics.topIndustries || []).slice(0, 5).map((industry, idx) => (
                            <div key={idx}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{industry.name}</span>
                                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#667eea' }}>{industry.count}</span>
                                </div>
                                <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ 
                                        height: '100%', 
                                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                                        width: `${(industry.count / analytics.totalAlumni) * 100}%`,
                                        transition: 'width 0.5s ease'
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Export Analytics */}
            <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                        Export Analytics Reports
                    </h3>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                        Download comprehensive analytics data in your preferred format
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <ActionButton
                        onClick={() => exportAnalytics('csv')}
                        color="#10b981"
                        icon={Download}
                        label="Export as CSV"
                    />
                    <ActionButton
                        onClick={() => exportAnalytics('excel')}
                        color="#667eea"
                        icon={Download}
                        label="Export as Excel"
                    />
                </div>
            </div>
        </div>
    );

    // Pending Verifications Tab
    const PendingVerificationsTab = () => (
        <div style={{ display: 'grid', gap: '24px' }}>
            <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '24px 32px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>
                    Pending Alumni Verifications ({pendingUsers.length})
                </h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                        <input
                            type="text"
                            placeholder="Search applicants..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                padding: '12px 16px 12px 48px',
                                borderRadius: '12px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                fontSize: '14px',
                                width: '280px',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>
            </div>

            {pendingUsers.length === 0 ? (
                <div style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '80px 32px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    textAlign: 'center'
                }}>
                    <UserCheck size={64} color="#cbd5e1" strokeWidth={1.5} style={{ margin: '0 auto 24px' }} />
                    <h3 style={{ color: '#0f172a', fontSize: '20px', fontWeight: '700', margin: '0 0 12px 0' }}>
                        All Caught Up!
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                        There are no pending alumni verifications at the moment.
                    </p>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '20px' }}>
                    {pendingUsers.map(u => (
                        <UserVerificationCard key={u._id} user={u} />
                    ))}
                </div>
            )}
        </div>
    );

    // Visibility Requests Tab
    const VisibilityRequestsTab = () => (
        <div style={{ display: 'grid', gap: '24px' }}>
            <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '24px 32px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)'
            }}>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>
                    Alumni Visibility Requests ({visibilityRequests.length})
                </h2>
                <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                    Review and approve requests for funding, promotions, or announcements
                </p>
            </div>

            {visibilityRequests.length === 0 ? (
                <div style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '80px 32px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    textAlign: 'center'
                }}>
                    <Megaphone size={64} color="#cbd5e1" strokeWidth={1.5} style={{ margin: '0 auto 24px' }} />
                    <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                        No pending visibility requests
                    </p>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '20px' }}>
                    {visibilityRequests.map(request => (
                        <div key={request._id} style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '28px',
                            border: '1px solid rgba(0,0,0,0.06)',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.04)'
                        }}>
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                                            {request.title}
                                        </h3>
                                        <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                                            by {request.alumniName} • {request.category}
                                        </p>
                                    </div>
                                    <div style={{
                                        padding: '6px 16px',
                                        background: request.type === 'funding' ? '#fef3c7' : request.type === 'promotion' ? '#ddd6fe' : '#dbeafe',
                                        color: request.type === 'funding' ? '#d97706' : request.type === 'promotion' ? '#7c3aed' : '#2563eb',
                                        borderRadius: '8px',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        textTransform: 'uppercase'
                                    }}>
                                        {request.type}
                                    </div>
                                </div>
                                <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                                    {request.description}
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <ActionButton
                                    onClick={() => handleVisibilityAction(request._id, 'approved')}
                                    color="#10b981"
                                    icon={CheckCircle}
                                    label="Approve"
                                />
                                <ActionButton
                                    onClick={() => handleVisibilityAction(request._id, 'rejected')}
                                    color="#ef4444"
                                    icon={XCircle}
                                    label="Reject"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // Interview Experiences Moderation Tab
    const ExperiencesTab = () => (
        <div style={{ display: 'grid', gap: '24px' }}>
            <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '24px 32px',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)'
            }}>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>
                    Interview Experiences Moderation ({interviewExperiences.length})
                </h2>
                <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                    Review and moderate submitted interview experiences before publication
                </p>
            </div>

            {interviewExperiences.length === 0 ? (
                <div style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '80px 32px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    textAlign: 'center'
                }}>
                    <BookOpen size={64} color="#cbd5e1" strokeWidth={1.5} style={{ margin: '0 auto 24px' }} />
                    <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                        No pending interview experiences to review
                    </p>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '20px' }}>
                    {interviewExperiences.map(exp => (
                        <div key={exp._id} style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '28px',
                            border: '1px solid rgba(0,0,0,0.06)',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.04)'
                        }}>
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                                            {exp.company} - {exp.role}
                                        </h3>
                                        <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                                            by {exp.authorName} • {exp.domain}
                                        </p>
                                    </div>
                                    <div style={{
                                        padding: '6px 16px',
                                        background: exp.difficulty === 'Easy' ? '#d1fae5' : exp.difficulty === 'Medium' ? '#fef3c7' : '#fee2e2',
                                        color: exp.difficulty === 'Easy' ? '#059669' : exp.difficulty === 'Medium' ? '#d97706' : '#dc2626',
                                        borderRadius: '8px',
                                        fontSize: '12px',
                                        fontWeight: '700'
                                    }}>
                                        {exp.difficulty}
                                    </div>
                                </div>
                                <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                                    {exp.content?.substring(0, 300)}...
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <ActionButton
                                    onClick={() => handleExperienceModeration(exp._id, 'approved')}
                                    color="#10b981"
                                    icon={CheckCircle}
                                    label="Approve & Publish"
                                />
                                <ActionButton
                                    onClick={() => handleExperienceModeration(exp._id, 'rejected')}
                                    color="#ef4444"
                                    icon={XCircle}
                                    label="Reject"
                                />
                                <ActionButton
                                    onClick={() => setSelectedUser(exp)}
                                    color="#667eea"
                                    icon={Eye}
                                    label="Read Full"
                                    outlined
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // Render Content Based on Active Tab
    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewDashboard />;
            case 'verifications':
                return <PendingVerificationsTab />;
            case 'visibility':
                return <VisibilityRequestsTab />;
            case 'experiences':
                return <ExperiencesTab />;
            default:
                return <OverviewDashboard />;
        }
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(255,255,255,0.3)',
                        borderTop: '4px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 20px'
                    }}></div>
                    <p style={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                * {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                }
            `}</style>
            
            <div style={{
                display: 'flex',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
                position: 'relative'
            }}>
                {/* Sidebar */}
                <aside style={{
                    width: '280px',
                    background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                    padding: '32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '4px 0 24px rgba(0,0,0,0.1)',
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    overflowY: 'auto'
                }}>
                    <div style={{ marginBottom: '48px' }}>
                        <h1 style={{
                            margin: '0 0 8px 0',
                            fontSize: '28px',
                            fontWeight: '800',
                            color: 'white',
                            letterSpacing: '-0.5px'
                        }}>
                            Alumni Portal
                        </h1>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: '500' }}>
                            Admin Dashboard
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'auto' }}>
                        <TabButton id="overview" icon={BarChart3} label="Overview" count={0} />
                        <TabButton id="verifications" icon={UserCheck} label="Verifications" count={pendingUsers.length} />
                        <TabButton id="visibility" icon={Megaphone} label="Visibility Requests" count={visibilityRequests.length} />
                        <TabButton id="experiences" icon={BookOpen} label="Experiences" count={interviewExperiences.length} />
                    </div>

                    <div style={{
                        padding: '20px',
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)',
                        marginTop: '24px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '18px',
                                fontWeight: '700'
                            }}>
                                {user?.name?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <div style={{ color: 'white', fontSize: '14px', fontWeight: '700', marginBottom: '2px' }}>
                                    {user?.name || 'Admin'}
                                </div>
                                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: '500' }}>
                                    Administrator
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(239, 68, 68, 0.9)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '14px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#dc2626';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.9)';
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main style={{
                    flex: 1,
                    padding: '48px',
                    overflowY: 'auto'
                }}>
                    {renderContent()}
                </main>
            </div>
        </>
    );
};

export default ImprovedAdminDashboard;