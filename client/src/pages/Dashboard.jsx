import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserApplications } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { 
    Home, 
    Briefcase, 
    Users, 
    BookOpen, 
    Network, 
    FileText, 
    Inbox,
    LogOut,
    Search,
    MapPin,
    Calendar,
    Plus,
    CheckCircle,
    User,
    RotateCw,
    Save
} from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [view, setView] = useState('home');
    const [appsCount, setAppsCount] = useState(0);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showPostOpportunity, setShowPostOpportunity] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        if (user?.userId) {
            fetchUserApplications(user.userId).then(apps => {
                setAppsCount(apps.length);
            }).catch(console.error);
        }
    }, [user]);

    // Mock data for demonstration
    const opportunities = [
        {
            id: 1,
            type: 'job',
            company: 'Google',
            position: 'Software Engineer',
            postedBy: 'Rahul Sharma',
            postedByBatch: '2019',
            location: 'Bangalore',
            experience: '0-2 years',
            deadline: '2026-02-15',
            tags: ['React', 'Node.js', 'MongoDB']
        },
        {
            id: 2,
            type: 'internship',
            company: 'Microsoft',
            position: 'Product Management Intern',
            postedBy: 'Priya Patel',
            postedByBatch: '2020',
            location: 'Hyderabad',
            experience: 'Student',
            deadline: '2026-02-10',
            tags: ['Product', 'Strategy', 'Design']
        },
        {
            id: 3,
            type: 'mentorship',
            title: 'Career Guidance in Data Science',
            postedBy: 'Dr. Ananya Verma',
            postedByBatch: '2015',
            company: 'Amazon',
            expertise: 'Machine Learning, AI',
            availability: '2 slots available',
            tags: ['Data Science', 'ML', 'Career']
        }
    ];

    const interviewExperiences = [
        {
            id: 1,
            company: 'Google',
            role: 'SDE-1',
            author: 'Arjun Kumar',
            batch: '2021',
            difficulty: 'Hard',
            rounds: 5,
            date: '2026-01-20'
        },
        {
            id: 2,
            company: 'Amazon',
            role: 'SDE-2',
            author: 'Sneha Reddy',
            batch: '2019',
            difficulty: 'Medium',
            rounds: 4,
            date: '2026-01-18'
        }
    ];

    const mentorshipRequests = [
        {
            id: 1,
            student: 'Amit Singh',
            year: '3rd Year',
            department: 'CSE',
            topic: 'Career in AI/ML',
            status: 'pending',
            date: '2026-01-28'
        },
        {
            id: 2,
            student: 'Kavya Iyer',
            year: '2nd Year',
            department: 'ECE',
            topic: 'Internship Guidance',
            status: 'accepted',
            date: '2026-01-25'
        }
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                html {
                    scroll-behavior: smooth;
                }

                body {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    background: #f8fafc;
                    overflow-x: hidden;
                    margin: 0;
                    padding: 0;
                }

                .dashboard-container {
                    display: flex;
                    min-height: 100vh;
                    background: #f8fafc;
                    overflow-x: hidden;
                    width: 100%;
                    max-width: 100vw;
                }

                /* Sidebar */
                .sidebar {
                    background: white;
                    border-right: 1px solid rgba(0, 0, 0, 0.06);
                    padding: 2rem 0;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.02);
                    width: 280px;
                    flex-shrink: 0;
                    overflow-y: auto;
                }

                .sidebar-logo {
                    padding: 0 1.5rem;
                    margin-bottom: 3rem;
                }

                .logo-text {
                    font-size: 1.5rem;
                    font-weight: 900;
                    color: #0f172a;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    letter-spacing: -0.5px;
                }

                .logo-gradient {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .sidebar-nav {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .nav-item {
                    padding: 1rem 1.5rem;
                    color: #64748b;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-left: 3px solid transparent;
                    font-weight: 600;
                    font-size: 0.95rem;
                }

                .nav-item:hover {
                    color: #667eea;
                    background: rgba(102, 126, 234, 0.04);
                }

                .nav-item.active {
                    color: #667eea;
                    background: rgba(102, 126, 234, 0.08);
                    border-left-color: #667eea;
                }

                .nav-icon {
                    width: 20px;
                    height: 20px;
                }

                .sidebar-footer {
                    padding: 0 1.5rem;
                    margin-top: auto;
                }

                .user-profile {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(0, 0, 0, 0.06);
                }

                .user-profile:hover {
                    background: #f1f5f9;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                }

                .user-avatar {
                    width: 45px;
                    height: 45px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: white;
                }

                .user-info h4 {
                    color: #0f172a;
                    font-size: 0.95rem;
                    margin-bottom: 0.25rem;
                    font-weight: 700;
                }

                .user-info p {
                    color: #64748b;
                    font-size: 0.8rem;
                }

                .logout-section {
                    padding: 0 1.5rem;
                    margin-top: 1rem;
                }

                .btn-logout {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    border: 2px solid rgba(239, 68, 68, 0.2);
                    border-radius: 8px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    font-size: 0.9rem;
                }

                .btn-logout:hover {
                    background: rgba(239, 68, 68, 0.15);
                    border-color: #ef4444;
                    transform: translateY(-2px);
                }

                /* Main Content */
                .main-content {
                    flex: 1;
                    padding: 2rem 2rem;
                    overflow-y: auto;
                    overflow-x: hidden;
                    max-height: 100vh;
                    background: #f8fafc;
                    width: 100%;
                    box-sizing: border-box;
                }

                @media (min-width: 768px) {
                    .main-content {
                        padding: 2rem 3rem;
                    }
                }

                /* Header */
                .dashboard-header {
                    margin-bottom: 3rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .header-text h1 {
                    font-size: clamp(1.8rem, 5vw, 2.5rem);
                    color: #0f172a;
                    margin-bottom: 0.5rem;
                    font-weight: 900;
                    letter-spacing: -1px;
                }

                .header-text h1 span {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .header-text p {
                    color: #64748b;
                    font-size: 1.1rem;
                }

                .header-actions {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    flex-wrap: wrap;
                }

                .btn-post {
                    padding: 0.75rem 1.5rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
                    font-size: 0.95rem;
                }

                .btn-post:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
                }

                .status-badge {
                    padding: 0.75rem 1.25rem;
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                    border-radius: 50px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border: 2px solid rgba(16, 185, 129, 0.2);
                }

                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
                    gap: 1.5rem;
                    margin-bottom: 3rem;
                }

                .stat-card {
                    background: white;
                    border: 1px solid rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 2rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
                    position: relative;
                    overflow: hidden;
                    max-width: 100%;
                }

                .stat-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .stat-card:hover::before {
                    opacity: 1;
                }

                .stat-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.2);
                    border-color: rgba(102, 126, 234, 0.3);
                }

                .stat-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .stat-icon {
                    width: 45px;
                    height: 45px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
                }

                .stat-value {
                    font-size: 2.5rem;
                    font-weight: 900;
                    color: #0f172a;
                    margin-bottom: 0.5rem;
                }

                .stat-label {
                    color: #64748b;
                    font-size: 0.95rem;
                    font-weight: 600;
                }

                .stat-trend {
                    color: #10b981;
                    font-size: 0.85rem;
                    margin-top: 0.5rem;
                    font-weight: 600;
                }

                /* Search Bar */
                .search-bar {
                    margin-bottom: 2rem;
                }

                .search-input-wrapper {
                    position: relative;
                }

                .search-input {
                    width: 100%;
                    padding: 1.1rem 1.5rem 1.1rem 3.5rem;
                    background: white;
                    border: 2px solid rgba(0, 0, 0, 0.06);
                    border-radius: 16px;
                    color: #0f172a;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
                }

                .search-input:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
                    background: white;
                }

                .search-input::placeholder {
                    color: #94a3b8;
                }

                .search-icon {
                    position: absolute;
                    left: 1.25rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                }

                /* Opportunities Section */
                .opportunities-section {
                    margin-bottom: 3rem;
                    max-width: 100%;
                    overflow: hidden;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .section-title {
                    font-size: 2rem;
                    color: #0f172a;
                    font-weight: 900;
                    letter-spacing: -0.8px;
                    position: relative;
                    display: inline-block;
                }

                .view-all-btn {
                    color: #667eea;
                    background: none;
                    border: none;
                    font-weight: 700;
                    cursor: pointer;
                    transition: color 0.3s ease;
                    font-size: 0.95rem;
                }

                .view-all-btn:hover {
                    color: #764ba2;
                }

                .opportunities-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(min(100%, 350px), 1fr));
                    gap: 1.5rem;
                    width: 100%;
                }

                .opportunity-card {
                    background: white;
                    border: 1px solid rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 2rem;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
                    position: relative;
                    overflow: hidden;
                    max-width: 100%;
                    width: 100%;
                    box-sizing: border-box;
                    min-width: 0;
                }

                .opportunity-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .opportunity-card:hover::before {
                    opacity: 1;
                }

                .opportunity-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(102, 126, 234, 0.3);
                    box-shadow: 0 16px 40px rgba(102, 126, 234, 0.2);
                }

                .opportunity-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: start;
                    margin-bottom: 1rem;
                }

                .opportunity-type {
                    padding: 0.5rem 1rem;
                    background: rgba(102, 126, 234, 0.1);
                    color: #667eea;
                    border-radius: 8px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border: 2px solid rgba(102, 126, 234, 0.2);
                }

                .opportunity-type.mentorship {
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                    border-color: rgba(16, 185, 129, 0.2);
                }

                .opportunity-type.internship {
                    background: rgba(245, 158, 11, 0.1);
                    color: #f59e0b;
                    border-color: rgba(245, 158, 11, 0.2);
                }

                .opportunity-title {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 0.5rem;
                    word-break: break-word;
                    overflow-wrap: break-word;
                    hyphens: auto;
                }

                .opportunity-company {
                    color: #64748b;
                    font-size: 0.95rem;
                    margin-bottom: 1rem;
                    font-weight: 600;
                    word-break: break-word;
                    overflow-wrap: break-word;
                }

                .opportunity-posted {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    padding: 0.75rem;
                    background: #f8fafc;
                    border-radius: 8px;
                }

                .posted-avatar {
                    width: 35px;
                    height: 35px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: white;
                }

                .posted-info span {
                    display: block;
                    color: #0f172a;
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                .posted-info small {
                    color: #64748b;
                    font-size: 0.8rem;
                }

                .opportunity-meta {
                    display: flex;
                    gap: 1.5rem;
                    margin-bottom: 1rem;
                    flex-wrap: wrap;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #64748b;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .meta-icon {
                    color: #667eea;
                }

                .opportunity-tags {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    margin-bottom: 1rem;
                }

                .tag {
                    padding: 0.4rem 0.8rem;
                    background: #f1f5f9;
                    color: #475569;
                    border-radius: 6px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    border: 1px solid rgba(0, 0, 0, 0.06);
                }

                .opportunity-actions {
                    display: flex;
                    gap: 0.75rem;
                }

                .btn-apply {
                    flex: 1;
                    padding: 0.75rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
                }

                .btn-apply:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.35);
                }

                .btn-save {
                    padding: 0.75rem 1rem;
                    background: white;
                    color: #64748b;
                    border: 2px solid rgba(0, 0, 0, 0.06);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .btn-save:hover {
                    background: #f8fafc;
                    color: #667eea;
                    border-color: #667eea;
                }

                /* Interview Experiences */
                .experiences-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    max-width: 100%;
                    width: 100%;
                }

                .experience-card {
                    background: white;
                    border: 1px solid rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 2rem;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
                    position: relative;
                    overflow: hidden;
                    max-width: 100%;
                    width: 100%;
                    box-sizing: border-box;
                    min-width: 0;
                }

                .experience-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .experience-card:hover::before {
                    opacity: 1;
                }

                .experience-card:hover {
                    border-color: rgba(102, 126, 234, 0.3);
                    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.2);
                    transform: translateY(-5px);
                }

                .experience-info {
                    flex: 1;
                    min-width: 0;
                    overflow: hidden;
                }

                .experience-company {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 0.5rem;
                    word-break: break-word;
                    overflow-wrap: break-word;
                }

                .experience-role {
                    color: #64748b;
                    margin-bottom: 0.75rem;
                    font-weight: 600;
                    word-break: break-word;
                    overflow-wrap: break-word;
                }

                .experience-meta {
                    display: flex;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                }

                .difficulty-badge {
                    padding: 0.4rem 0.8rem;
                    border-radius: 6px;
                    font-size: 0.8rem;
                    font-weight: 700;
                }

                .difficulty-badge.hard {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                }

                .difficulty-badge.medium {
                    background: rgba(245, 158, 11, 0.1);
                    color: #f59e0b;
                }

                .difficulty-badge.easy {
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                }

                /* Mentorship Requests */
                .requests-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    max-width: 100%;
                    width: 100%;
                }

                .request-card {
                    background: white;
                    border: 1px solid rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
                    transition: all 0.3s ease;
                    max-width: 100%;
                }

                .request-card:hover {
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
                    transform: translateY(-3px);
                }

                .request-info {
                    flex: 1;
                    min-width: 0;
                    overflow: hidden;
                }

                .request-student {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 0.5rem;
                    word-break: break-word;
                    overflow-wrap: break-word;
                }

                .request-details {
                    color: #64748b;
                    margin-bottom: 0.75rem;
                    font-weight: 500;
                    word-break: break-word;
                    overflow-wrap: break-word;
                }

                .request-topic {
                    color: #667eea;
                    font-weight: 700;
                    word-break: break-word;
                    overflow-wrap: break-word;
                }

                .request-actions {
                    display: flex;
                    gap: 0.75rem;
                }

                .btn-accept {
                    padding: 0.5rem 1.25rem;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
                }

                .btn-accept:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
                }

                .btn-decline {
                    padding: 0.5rem 1.25rem;
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    border: none;
                    border-radius: 8px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-decline:hover {
                    background: rgba(239, 68, 68, 0.2);
                }

                .request-status {
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    font-size: 0.85rem;
                    font-weight: 700;
                }

                .request-status.pending {
                    background: rgba(245, 158, 11, 0.1);
                    color: #f59e0b;
                }

                .request-status.accepted {
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                }

                /* Empty State */
                .empty-state {
                    text-align: center;
                    padding: 4rem 2rem;
                }

                .empty-state h3 {
                    color: #0f172a;
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                    font-weight: 700;
                }

                .empty-state p {
                    color: #64748b;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .dashboard-container {
                        grid-template-columns: 1fr;
                    }

                    .sidebar {
                        display: none;
                    }

                    .main-content {
                        padding: 1.5rem 1rem;
                    }

                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem;
                    }

                    .opportunities-grid {
                        grid-template-columns: 1fr;
                    }

                    .dashboard-header {
                        flex-direction: column;
                        align-items: stretch;
                    }

                    .header-actions {
                        justify-content: flex-start;
                    }
                }

                @media (max-width: 640px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .opportunity-card,
                    .experience-card,
                    .request-card {
                        padding: 1.5rem;
                    }

                    .stat-card {
                        padding: 1.5rem;
                    }
                }
            `}</style>

            <div className="dashboard-container">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="sidebar-logo">
                        <div className="logo-text">
                            Alumni<span className="logo-gradient">Connect</span>
                        </div>
                    </div>

                    <nav className="sidebar-nav">
                        <div 
                            className={`nav-item ${view === 'home' ? 'active' : ''}`}
                            onClick={() => setView('home')}
                        >
                            <Home className="nav-icon" size={20} />
                            <span>Home</span>
                        </div>
                        <div 
                            className={`nav-item ${view === 'opportunities' ? 'active' : ''}`}
                            onClick={() => setView('opportunities')}
                        >
                            <Briefcase className="nav-icon" size={20} />
                            <span>Opportunities</span>
                        </div>
                        <div 
                            className={`nav-item ${view === 'mentorship' ? 'active' : ''}`}
                            onClick={() => setView('mentorship')}
                        >
                            <Users className="nav-icon" size={20} />
                            <span>Mentorship</span>
                        </div>
                        <div 
                            className={`nav-item ${view === 'interviews' ? 'active' : ''}`}
                            onClick={() => setView('interviews')}
                        >
                            <BookOpen className="nav-icon" size={20} />
                            <span>Interview Experiences</span>
                        </div>
                        <div 
                            className={`nav-item ${view === 'network' ? 'active' : ''}`}
                            onClick={() => setView('network')}
                        >
                            <Network className="nav-icon" size={20} />
                            <span>Alumni Network</span>
                        </div>
                        <div 
                            className={`nav-item ${view === 'applications' ? 'active' : ''}`}
                            onClick={() => setView('applications')}
                        >
                            <FileText className="nav-icon" size={20} />
                            <span>My Applications</span>
                        </div>
                        {user?.role === 'alumni' && (
                            <div 
                                className={`nav-item ${view === 'requests' ? 'active' : ''}`}
                                onClick={() => setView('requests')}
                            >
                                <Inbox className="nav-icon" size={20} />
                                <span>Requests</span>
                            </div>
                        )}
                    </nav>

                    <div className="sidebar-footer">
                        <div className="user-profile">
                            <div className="user-avatar">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="user-info">
                                <h4>{user?.name || 'User'}</h4>
                                <p>{user?.role === 'alumni' ? 'Alumni' : 'Student'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="logout-section">
                        <button className="btn-logout" onClick={handleLogout}>
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="main-content">
                    {/* Header */}
                    <div className="dashboard-header">
                        <div className="header-text">
                            <h1>Welcome back, <span>{user?.name?.split(' ')[0] || 'User'}</span>!</h1>
                            <p>
                                {view === 'home' && "Check out the latest opportunities from your alumni network"}
                                {view === 'opportunities' && "Browse all available opportunities"}
                                {view === 'mentorship' && "Connect with mentors in your field"}
                                {view === 'interviews' && "Learn from interview experiences"}
                                {view === 'network' && "Explore your alumni network"}
                                {view === 'applications' && "Track your referral requests"}
                                {view === 'requests' && "Manage mentorship requests"}
                            </p>
                        </div>
                        <div className="header-actions">
                            {user?.role === 'alumni' && (
                                <button className="btn-post" onClick={() => setShowPostOpportunity(true)}>
                                    <Plus size={18} />
                                    Post Opportunity
                                </button>
                            )}
                            <div className="status-badge">
                                <CheckCircle size={18} />
                                Verified {user?.role === 'alumni' ? 'Alumni' : 'Student'}
                            </div>
                        </div>
                    </div>

                    {/* Home View */}
                    {view === 'home' && (
                        <>
                            {/* Stats Grid */}
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-header">
                                        <div className="stat-icon"><FileText size={22} color="white" /></div>
                                    </div>
                                    <div className="stat-value">{appsCount}</div>
                                    <div className="stat-label">Applications</div>
                                    <div className="stat-trend">↑ 2 this week</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-header">
                                        <div className="stat-icon"><Briefcase size={22} color="white" /></div>
                                    </div>
                                    <div className="stat-value">12</div>
                                    <div className="stat-label">New Opportunities</div>
                                    <div className="stat-trend">↑ 5 today</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-header">
                                        <div className="stat-icon"><Users size={22} color="white" /></div>
                                    </div>
                                    <div className="stat-value">3</div>
                                    <div className="stat-label">Active Mentorships</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-header">
                                        <div className="stat-icon"><Network size={22} color="white" /></div>
                                    </div>
                                    <div className="stat-value">2.5K</div>
                                    <div className="stat-label">Alumni Network</div>
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="search-bar">
                                <div className="search-input-wrapper">
                                    <Search className="search-icon" size={20} />
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search opportunities, companies, or skills..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Latest Opportunities */}
                            <div className="opportunities-section">
                                <div className="section-header">
                                    <h2 className="section-title">Latest Opportunities</h2>
                                    <button className="view-all-btn" onClick={() => setView('opportunities')}>
                                        View All →
                                    </button>
                                </div>
                                <div className="opportunities-grid">
                                    {opportunities.map((opp) => (
                                        <div key={opp.id} className="opportunity-card">
                                            <div className="opportunity-header">
                                                <div>
                                                    <span className={`opportunity-type ${opp.type}`}>
                                                        {opp.type}
                                                    </span>
                                                </div>
                                            </div>
                                            <h3 className="opportunity-title">
                                                {opp.position || opp.title}
                                            </h3>
                                            {opp.company && (
                                                <div className="opportunity-company">{opp.company}</div>
                                            )}
                                            <div className="opportunity-posted">
                                                <div className="posted-avatar">
                                                    {opp.postedBy.charAt(0)}
                                                </div>
                                                <div className="posted-info">
                                                    <span>{opp.postedBy}</span>
                                                    <small>Batch of {opp.postedByBatch}</small>
                                                </div>
                                            </div>
                                            <div className="opportunity-meta">
                                                {opp.location && (
                                                    <div className="meta-item">
                                                        <MapPin className="meta-icon" size={16} />
                                                        {opp.location}
                                                    </div>
                                                )}
                                                {opp.experience && (
                                                    <div className="meta-item">
                                                        <Briefcase className="meta-icon" size={16} />
                                                        {opp.experience}
                                                    </div>
                                                )}
                                                {opp.deadline && (
                                                    <div className="meta-item">
                                                        <Calendar className="meta-icon" size={16} />
                                                        Due {new Date(opp.deadline).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </div>
                                            {opp.tags && (
                                                <div className="opportunity-tags">
                                                    {opp.tags.map((tag, idx) => (
                                                        <span key={idx} className="tag">{tag}</span>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="opportunity-actions">
                                                <button className="btn-apply">
                                                    {opp.type === 'mentorship' ? 'Request Mentorship' : 'Apply Now'}
                                                </button>
                                                <button className="btn-save">
                                                    <Save size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Interview Experiences */}
                            <div className="opportunities-section">
                                <div className="section-header">
                                    <h2 className="section-title">Recent Interview Experiences</h2>
                                    <button className="view-all-btn" onClick={() => setView('interviews')}>
                                        View All →
                                    </button>
                                </div>
                                <div className="experiences-list">
                                    {interviewExperiences.map((exp) => (
                                        <div key={exp.id} className="experience-card">
                                            <div className="experience-info">
                                                <h3 className="experience-company">{exp.company}</h3>
                                                <div className="experience-role">{exp.role}</div>
                                                <div className="experience-meta">
                                                    <div className="meta-item">
                                                        <User className="meta-icon" size={16} />
                                                        {exp.author} ({exp.batch})
                                                    </div>
                                                    <div className="meta-item">
                                                        <RotateCw className="meta-icon" size={16} />
                                                        {exp.rounds} rounds
                                                    </div>
                                                    <span className={`difficulty-badge ${exp.difficulty.toLowerCase()}`}>
                                                        {exp.difficulty}
                                                    </span>
                                                </div>
                                            </div>
                                            <button className="btn-apply" style={{ flex: '0 0 auto' }}>
                                                Read More →
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Mentorship Requests View (for Alumni) */}
                    {view === 'requests' && user?.role === 'alumni' && (
                        <div className="opportunities-section">
                            <div className="section-header">
                                <h2 className="section-title">Mentorship Requests</h2>
                            </div>
                            <div className="requests-list">
                                {mentorshipRequests.map((request) => (
                                    <div key={request.id} className="request-card">
                                        <div className="request-info">
                                            <h3 className="request-student">{request.student}</h3>
                                            <div className="request-details">
                                                {request.year} • {request.department}
                                            </div>
                                            <div className="request-topic">
                                                Topic: {request.topic}
                                            </div>
                                        </div>
                                        {request.status === 'pending' ? (
                                            <div className="request-actions">
                                                <button className="btn-accept">Accept</button>
                                                <button className="btn-decline">Decline</button>
                                            </div>
                                        ) : (
                                            <div className={`request-status ${request.status}`}>
                                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Other views */}
                    {view === 'opportunities' && (
                        <div className="opportunities-section">
                            <div className="section-header">
                                <h2 className="section-title">All Opportunities</h2>
                            </div>
                            <div className="opportunities-grid">
                                {opportunities.map((opp) => (
                                    <div key={opp.id} className="opportunity-card">
                                        <div className="opportunity-header">
                                            <div>
                                                <span className={`opportunity-type ${opp.type}`}>
                                                    {opp.type}
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="opportunity-title">
                                            {opp.position || opp.title}
                                        </h3>
                                        {opp.company && (
                                            <div className="opportunity-company">{opp.company}</div>
                                        )}
                                        <div className="opportunity-posted">
                                            <div className="posted-avatar">
                                                {opp.postedBy.charAt(0)}
                                            </div>
                                            <div className="posted-info">
                                                <span>{opp.postedBy}</span>
                                                <small>Batch of {opp.postedByBatch}</small>
                                            </div>
                                        </div>
                                        <div className="opportunity-meta">
                                            {opp.location && (
                                                <div className="meta-item">
                                                    <MapPin className="meta-icon" size={16} />
                                                    {opp.location}
                                                </div>
                                            )}
                                            {opp.experience && (
                                                <div className="meta-item">
                                                    <Briefcase className="meta-icon" size={16} />
                                                    {opp.experience}
                                                </div>
                                            )}
                                            {opp.deadline && (
                                                <div className="meta-item">
                                                    <Calendar className="meta-icon" size={16} />
                                                    Due {new Date(opp.deadline).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                        {opp.tags && (
                                            <div className="opportunity-tags">
                                                {opp.tags.map((tag, idx) => (
                                                    <span key={idx} className="tag">{tag}</span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="opportunity-actions">
                                            <button className="btn-apply">
                                                {opp.type === 'mentorship' ? 'Request Mentorship' : 'Apply Now'}
                                            </button>
                                            <button className="btn-save">
                                                <Save size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {view === 'interviews' && (
                        <div className="opportunities-section">
                            <div className="section-header">
                                <h2 className="section-title">Interview Experiences</h2>
                            </div>
                            <div className="experiences-list">
                                {interviewExperiences.map((exp) => (
                                    <div key={exp.id} className="experience-card">
                                        <div className="experience-info">
                                            <h3 className="experience-company">{exp.company}</h3>
                                            <div className="experience-role">{exp.role}</div>
                                            <div className="experience-meta">
                                                <div className="meta-item">
                                                    <User className="meta-icon" size={16} />
                                                    {exp.author} ({exp.batch})
                                                </div>
                                                <div className="meta-item">
                                                    <RotateCw className="meta-icon" size={16} />
                                                    {exp.rounds} rounds
                                                </div>
                                                <span className={`difficulty-badge ${exp.difficulty.toLowerCase()}`}>
                                                    {exp.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="btn-apply" style={{ flex: '0 0 auto' }}>
                                            Read More →
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default Dashboard;
