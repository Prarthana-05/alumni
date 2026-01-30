import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ setView }) => {
    const { logout, user } = useAuth();
    const location = useLocation();

    // Determine base route based on role
    const baseRoute = user?.role === 'alumni' ? '/alumni' : '/student';

    return (
        <nav className="sidebar">
            <div className="logo">
                <h2>Nexus<span>.</span></h2>
            </div>
            <ul>
                <li onClick={() => setView && setView('home')}>
                    <Link to={baseRoute}><i className="fas fa-home"></i> Home</Link>
                </li>
                <li onClick={() => setView && setView('home')}>
                    <Link to={baseRoute}><i className="fas fa-briefcase"></i> Jobs & Referrals</Link>
                </li>
                <li onClick={() => setView && setView('applications')}>
                    <Link to={baseRoute}><i className="fas fa-envelope-open-text"></i> My Applications</Link>
                </li>
                <li onClick={() => setView && setView('events')}>
                    <Link to={baseRoute}><i className="fas fa-calendar-alt"></i> Events</Link>
                </li>
                <li>
                    <Link to="/experiences"><i className="fas fa-book-reader"></i> Interview Exp.</Link>
                </li>
                <li>
                    <a href="#"><i className="fas fa-user-circle"></i> Profile</a>
                </li>
            </ul>
            <button onClick={logout} className="logout-btn">
                <i className="fas fa-sign-out-alt"></i> Logout
            </button>
        </nav>
    );
};

export default Sidebar;
