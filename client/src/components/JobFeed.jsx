import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../services/api';

const JobFeed = ({ onApplyClick }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            const data = await fetchJobs();
            setJobs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading opportunities...</p>;
    if (jobs.length === 0) return <p>No jobs available.</p>;

    return (
        <div className="job-list">
            {jobs.map(job => (
                <div key={job._id} className="job-card" style={{ borderLeft: '5px solid #2563eb' }}>
                    <h3>{job.title}</h3>
                    <p><strong>{job.company}</strong></p>
                    <p>{job.description}</p>
                    <button
                        className="apply-btn"
                        onClick={() => onApplyClick(job)}
                    >
                        Apply / View Info
                    </button>
                </div>
            ))}
        </div>
    );
};

export default JobFeed;
