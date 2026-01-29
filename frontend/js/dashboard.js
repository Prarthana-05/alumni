// 1. Establish Connection
const socket = io('http://localhost:5000');

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('nexus_token');
    if (!token) { window.location.href = 'login.html'; return; }

    // Initial load of existing jobs
    fetch('http://localhost:5000/api/jobs/all')
        .then(res => res.json())
        .then(jobs => renderJobs(jobs));
});

// 2. Real-Time Listener
socket.on('newJobPosted', (job) => {
    console.log("New job received!", job);
    const jobFeed = document.getElementById('jobFeed');
    
    // Create new job HTML
    const jobHtml = `
        <div class="job-card" style="border-left: 5px solid #22c55e; animation: slideIn 0.5s ease;">
            <h3>${job.title} <span style="font-size: 0.7rem; background: #22c55e; color: white; padding: 2px 5px; border-radius: 4px;">NEW</span></h3>
            <p><strong>${job.company}</strong></p>
            <p>Posted by: ${job.postedBy}</p>
            <button class="apply-btn">Apply Now</button>
        </div>
    `;
    
    // Add to top of list
    jobFeed.insertAdjacentHTML('afterbegin', jobHtml);
});

function renderJobs(jobs) {
    const jobFeed = document.getElementById('jobFeed');
    jobFeed.innerHTML = jobs.map(job => `
        <div class="job-card">
            <h3>${job.title}</h3>
            <p><strong>${job.company}</strong></p>
            <p>Posted by: ${job.postedBy}</p>
            <button class="apply-btn">Apply Now</button>
        </div>
    `).join('');
}