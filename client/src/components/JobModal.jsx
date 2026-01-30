import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { applyForJob, checkApplicationStatus, fetchChatHistory } from '../services/api';

const JobModal = ({ job, onClose }) => {
    const { user } = useAuth();
    const socket = useSocket();
    const [activeTab, setActiveTab] = useState('apply');
    const [formData, setFormData] = useState({
        studentName: user?.name || '',
        branch: '',
        cgpa: '',
        resumeLink: ''
    });
    const [existingApp, setExistingApp] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState('');

    // Load initial state when modal opens
    useEffect(() => {
        if (job && user) {
            checkStatus();
        }
    }, [job, user]);

    // Socket Listener for incoming messages
    useEffect(() => {
        if (!socket || !existingApp) return;

        // Join room
        socket.emit('joinChat', existingApp.applicationId);

        // Listen
        socket.on('receiveMessage', (msg) => {
            // Only append if it matches current chat
            if (msg.applicationId === existingApp.applicationId) {
                setChatHistory((prev) => [...prev, msg]);
            }
        });

        // Cleanup listener
        return () => socket.off('receiveMessage');
    }, [socket, existingApp]);

    const checkStatus = async () => {
        try {
            const data = await checkApplicationStatus(job._id, user.userId);
            if (data.exists) {
                setExistingApp(data);
                loadChat(data.applicationId);
                setActiveTab('referral'); // Auto-switch to chat/referral if applied
            }
        } catch (err) {
            console.error(err);
        }
    };

    const loadChat = async (appId) => {
        try {
            const history = await fetchChatHistory(appId);
            setChatHistory(history);
        } catch (err) {
            console.error(err);
        }
    };

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                jobId: job._id,
                alumniId: job.postedBy,
                studentId: user.userId,
                ...formData,
                status: 'applied'
            };
            const res = await applyForJob(payload);
            setExistingApp({ applicationId: res.application._id });
            setActiveTab('referral');
            alert('Application submitted successfully!');

            // Auto-send initial message via socket if possible, or just let user chat
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSendMessage = () => {
        if (!message.trim() || !existingApp) return;

        const msgData = {
            applicationId: existingApp.applicationId,
            senderId: user.userId,
            text: message.trim()
        };

        socket.emit('sendMessage', msgData);
        setMessage('');
    };

    if (!job) return null;

    return (
        <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>{job.title}</h2>
                <p>{job.company}</p>
                <hr />

                <div className="modal-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'apply' ? 'active' : ''}`}
                        onClick={() => setActiveTab('apply')}
                    >
                        Quick Apply
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'referral' ? 'active' : ''}`}
                        onClick={() => setActiveTab('referral')}
                    >
                        Request Referral / Chat
                    </button>
                </div>

                {activeTab === 'apply' && (
                    <div className="tab-content">
                        {existingApp ? (
                            <p style={{ color: 'green', fontWeight: 'bold', textAlign: 'center' }}>
                                <i className="fas fa-check-circle"></i> You have already applied!
                            </p>
                        ) : (
                            <form onSubmit={handleApply}>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={formData.studentName}
                                    onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Branch"
                                    value={formData.branch}
                                    onChange={e => setFormData({ ...formData, branch: e.target.value })}
                                    required
                                />
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Current CGPA"
                                    value={formData.cgpa}
                                    onChange={e => setFormData({ ...formData, cgpa: e.target.value })}
                                    required
                                />
                                <input
                                    type="url"
                                    placeholder="Resume Link"
                                    value={formData.resumeLink}
                                    onChange={e => setFormData({ ...formData, resumeLink: e.target.value })}
                                    required
                                />
                                <button type="submit" className="apply-btn">Submit Application</button>
                            </form>
                        )}
                    </div>
                )}

                {activeTab === 'referral' && (
                    <div className="tab-content">
                        <p>Message the Alumni to introduce yourself.</p>

                        <div style={{ height: '200px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '8px', background: '#f9f9f9', display: 'flex', flexDirection: 'column' }}>
                            {chatHistory.length === 0 ? (
                                <p style={{ textAlign: 'center', color: '#999' }}>No messages yet.</p>
                            ) : (
                                chatHistory.map((msg, idx) => (
                                    <div key={idx} style={{
                                        alignSelf: msg.senderId === user.userId ? 'flex-end' : 'flex-start',
                                        background: msg.senderId === user.userId ? '#2563eb' : '#e5e7eb',
                                        color: msg.senderId === user.userId ? 'white' : 'black',
                                        padding: '8px 12px',
                                        borderRadius: '12px',
                                        margin: '4px',
                                        maxWidth: '70%'
                                    }}>
                                        {msg.text}
                                    </div>
                                ))
                            )}
                        </div>

                        <textarea
                            placeholder="Hi, I am interested in this role..."
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                        <button
                            type="button"
                            className="apply-btn"
                            style={{ background: '#8b5cf6' }}
                            onClick={handleSendMessage}
                            disabled={!existingApp}
                        >
                            {existingApp ? "Send Message" : "Apply First to Chat"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobModal;
