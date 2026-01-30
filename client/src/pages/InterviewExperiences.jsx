import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const InterviewExperiences = () => {
    const { user } = useAuth();
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [newExp, setNewExp] = useState({
        company: '',
        role: '',
        difficulty: 'Medium',
        description: '',
        rounds: 1
    });

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const res = await fetch('/api/experiences');
            const data = await res.json();
            setExperiences(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('nexus_token');
            const res = await fetch('/api/experiences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(newExp)
            });
            const data = await res.json();
            if (res.ok) {
                setExperiences([data, ...experiences]); // Prepend new exp
                setShowForm(false);
                setNewExp({ company: '', role: '', difficulty: 'Medium', description: '', rounds: 1 });
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="main-content">
                <header style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1>Interview Experiences</h1>
                    {/* Only Alumni can post? Or maybe Students who got placed? PBST says Alumni-driven postings but students need to learn */}
                    {/* For now allowing anyone to post if logged in, but ideally we check user role if needed */}
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancel' : 'Share Experience'}
                    </button>
                </header>

                {showForm && (
                    <div style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <h3>Share your Interview Journey</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <input
                                    placeholder="Company (e.g. Amazon)"
                                    value={newExp.company}
                                    onChange={e => setNewExp({ ...newExp, company: e.target.value })}
                                    required
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                                <input
                                    placeholder="Role (e.g. SDE I)"
                                    value={newExp.role}
                                    onChange={e => setNewExp({ ...newExp, role: e.target.value })}
                                    required
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <select
                                    value={newExp.difficulty}
                                    onChange={e => setNewExp({ ...newExp, difficulty: e.target.value })}
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                >
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                </select>
                                <input
                                    placeholder="No. of Rounds"
                                    type="number"
                                    value={newExp.rounds}
                                    onChange={e => setNewExp({ ...newExp, rounds: e.target.value })}
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <textarea
                                placeholder="Describe the process, questions asked, and your tips..."
                                rows="5"
                                value={newExp.description}
                                onChange={e => setNewExp({ ...newExp, description: e.target.value })}
                                required
                                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
                            />
                            <button type="submit" className="btn btn-primary">Post Experience</button>
                        </form>
                    </div>
                )}

                <div className="experiences-list">
                    {experiences.map(exp => (
                        <div key={exp._id} style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '15px', borderLeft: `5px solid ${exp.difficulty === 'Hard' ? '#ef4444' : exp.difficulty === 'Medium' ? '#f59e0b' : '#22c55e'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <div>
                                    <h3 style={{ margin: 0 }}>{exp.company} - {exp.role}</h3>
                                    <small style={{ color: '#666' }}>By {exp.author?.name || 'Alumni'} • {new Date(exp.createdAt).toLocaleDateString()}</small>
                                </div>
                                <span style={{
                                    background: exp.difficulty === 'Hard' ? '#fee2e2' : exp.difficulty === 'Medium' ? '#fef3c7' : '#dcfce7',
                                    color: exp.difficulty === 'Hard' ? '#b91c1c' : exp.difficulty === 'Medium' ? '#b45309' : '#15803d',
                                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', height: 'fit-content'
                                }}>
                                    {exp.difficulty}
                                </span>
                            </div>
                            <p style={{ whiteSpace: 'pre-wrap', color: '#333' }}>{exp.description}</p>

                        </div>
                    ))}
                    {experiences.length === 0 && !loading && <p>No experiences shared yet.</p>}
                </div>
            </main>
        </div>
    );
};

export default InterviewExperiences;
