const API_URL = '/api';

export const fetchJobs = async () => {
    const res = await fetch(`${API_URL}/jobs/all`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return res.json();
};

export const fetchEvents = async () => {
    const res = await fetch(`${API_URL}/events/all`);
    if (!res.ok) throw new Error('Failed to fetch events');
    return res.json();
};

export const fetchUserApplications = async (studentId) => {
    const res = await fetch(`${API_URL}/applications/student/${studentId}`);
    if (!res.ok) throw new Error('Failed to fetch applications');
    return res.json();
};

export const applyForJob = async (applicationData) => {
    const res = await fetch(`${API_URL}/applications/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to apply');
    }
    return res.json();
};

export const checkApplicationStatus = async (jobId, studentId) => {
    const res = await fetch(`${API_URL}/applications/check?jobId=${jobId}&studentId=${studentId}`);
    if (!res.ok) throw new Error('Failed to check status');
    return res.json();
};

export const fetchChatHistory = async (applicationId) => {
    const res = await fetch(`${API_URL}/messages/${applicationId}`);
    if (!res.ok) return [];
    return res.json();
};

export const postJob = async (jobData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/jobs/post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        },
        body: JSON.stringify(jobData)
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to post job');
    }
    return res.json();
};
