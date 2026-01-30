import React, { useEffect, useState } from 'react';
import { fetchUserApplications } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ApplicationFeed = () => {
    const { user } = useAuth();
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.userId) {
            loadApps();
        }
    }, [user]);

    const loadApps = async () => {
        try {
            const data = await fetchUserApplications(user.userId);
            setApps(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading your applications...</p>;
    if (apps.length === 0) return <p>You haven't applied for any referrals yet.</p>;

    return (
        <div className="job-list">
            {apps.map(app => {
                let statusColor = "#6b7280"; // Gray
                if (app.status === 'referred') statusColor = "#10b981"; // Green
                if (app.status === 'rejected') statusColor = "#ef4444"; // Red

                return (
                    <div key={app._id} className="job-card" style={{ borderLeft: `5px solid ${statusColor}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>{app.jobId?.title || 'Referral Request'}</h3>
                            <span className="status-badge" style={{ background: statusColor, color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                {app.status}
                            </span>
                        </div>
                        <p>Company: <strong>{app.jobId?.company || 'N/A'}</strong></p>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>
                            Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                        </p>

                        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                            <button className="apply-btn" style={{ background: '#10b981', flex: 1 }}>
                                <i className="fas fa-comments"></i> Chat with Alumni
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ApplicationFeed;
