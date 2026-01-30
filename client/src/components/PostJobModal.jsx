import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postJob } from '../services/api';

const PostJobModal = ({ onClose, onJobPosted }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        company: user?.organization || '',
        category: 'Software',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await postJob({ ...formData, postedBy: user.userId });
            alert('Job Posted Successfully!');
            if (onJobPosted) onJobPosted();
            onClose();
        } catch (err) {
            alert('Error posting job: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>Post a Job Referral</h2>
                <p>Share an opportunity from your company.</p>
                <hr />

                <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                    <div className="form-group">
                        <label>Job Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Frontend Engineer"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Company</label>
                        <input
                            type="text"
                            placeholder="e.g. Google"
                            value={formData.company}
                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Software">Software</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Product">Product</option>
                            <option value="Design">Design</option>
                            <option value="Finance">Finance</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description & Requirements</label>
                        <textarea
                            rows="4"
                            placeholder="Enter job details, eligibility, and referral process..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Posting...' : 'Post Opportunity'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostJobModal;
