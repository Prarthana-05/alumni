import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../services/api';

const EventFeed = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const data = await fetchEvents();
            setEvents(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading events...</p>;
    if (events.length === 0) return <p>No upcoming events.</p>;

    return (
        <div className="job-list">
            {events.map(event => (
                <div key={event._id} className="job-card" style={{ borderLeft: '5px solid #8b5cf6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <h3>{event.title}</h3>
                        <span style={{ background: '#ede9fe', color: '#8b5cf6', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>EVENT</span>
                    </div>
                    <p style={{ color: '#6b7280', margin: '8px 0' }}>
                        <i className="fas fa-calendar-day"></i> <strong>{event.date}</strong>
                    </p>
                    <p>{event.description}</p>
                    {event.link && (
                        <a href={event.link} target="_blank" rel="noreferrer" className="apply-btn" style={{ background: '#8b5cf6', display: 'inline-block', textAlign: 'center', textDecoration: 'none', marginTop: '10px' }}>
                            Register / Join Link
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
};

export default EventFeed;
