const socket = io('http://localhost:5000');

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Data Load
    fetchJobs();
    
    const navLinks = document.querySelectorAll('.sidebar ul li a');
    
    // 2. Sidebar Navigation Logic
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const text = link.innerText.trim();
            
            // UI Active State Toggle
            const activeLi = document.querySelector('.sidebar ul li.active');
            if (activeLi) activeLi.classList.remove('active');
            link.parentElement.classList.add('active');

            // View Switching
            if (text === "Home" || text === "Jobs & Referrals") {
                document.getElementById('homeView').style.display = 'block';
                document.getElementById('eventsView').style.display = 'none';
                document.getElementById('viewSubtitle').innerText = "Check out the latest opportunities.";
                fetchJobs(); // Refresh jobs
            } else if (text === "Events") {
                document.getElementById('homeView').style.display = 'none';
                document.getElementById('eventsView').style.display = 'block';
                document.getElementById('viewSubtitle').innerText = "Never miss an alumni meet or webinar.";
                fetchEvents(); // This is the function that was missing!
            }
        });
    });

    // 3. Socket Listeners (Real-Time)
    socket.on('newJobPosted', (job) => {
        appendItem('jobFeed', job, '#2563eb', 'NEW JOB');
    });

    socket.on('newEvent', (event) => {
        appendItem('eventFeed', event, '#8b5cf6', 'NEW EVENT');
    });


    // --- LOGOUT LOGIC ---
const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // 1. Remove all stored user data
        localStorage.removeItem('nexus_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('regId');

        // 2. Redirect to login page
        window.location.href = 'login.html';
    });
}

});

// --- API FETCH FUNCTIONS ---

async function fetchJobs() {
    try {
        const res = await fetch('http://localhost:5000/api/jobs/all');
        const jobs = await res.json();
        renderList('jobFeed', jobs, '#2563eb', 'JOB');
    } catch (err) {
        console.error("Error fetching jobs:", err);
    }
}

async function fetchEvents() {
    try {
        const res = await fetch('http://localhost:5000/api/events/all');
        const events = await res.json();
        renderList('eventFeed', events, '#2563eb', 'EVENT');
    } catch (err) {
        console.error("Error fetching events:", err);
    }
}

// --- UI HELPER FUNCTIONS ---

function renderList(targetId, data, color, type) {
    const container = document.getElementById(targetId);
    if (data.length === 0) {
        container.innerHTML = `<p>No ${type.toLowerCase()}s available right now.</p>`;
        return;
    }
    container.innerHTML = data.map(item => `
        <div class="job-card" style="border-left: 5px solid ${color}">
            <h3>${item.title}</h3>
            <p><strong>${item.company || item.date}</strong></p>
            <p>${item.description || ''}</p>
            <button class="apply-btn" style="background:${color}">View Info</button>
        </div>
    `).join('');
}

function appendItem(targetId, data, color, badge) {
    const container = document.getElementById(targetId);
    // Remove "Loading" or "No data" text if it exists
    if (container.querySelector('p')) container.innerHTML = '';

    const html = `
        <div class="job-card" style="border-left: 5px solid ${color}; animation: slideIn 0.5s;">
            <h3>${data.title} <span style="background:${color}; color:white; padding:2px 6px; border-radius:4px; font-size:10px;">${badge}</span></h3>
            <p><strong>${data.company || data.date}</strong></p>
            <button class="apply-btn" style="background:${color}">View Info</button>
        </div>
    `;
    container.insertAdjacentHTML('afterbegin', html);
}