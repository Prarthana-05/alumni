const socket = io('http://localhost:5000');
let currentApplicationId = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Data Load
    fetchJobs();
    
    // 2. Sidebar Navigation Logic
    const navLinks = document.querySelectorAll('.sidebar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const text = link.innerText.trim();
            
            // UI Active State Toggle
            document.querySelectorAll('.sidebar ul li').forEach(li => li.classList.remove('active'));
            link.parentElement.classList.add('active');

            // View Switching
            if (text === "Home" || text === "Jobs & Referrals") {
                showView('homeView');
                document.getElementById('viewSubtitle').innerText = "Check out the latest opportunities.";
                fetchJobs();
            } else if (text === "Events") {
                showView('homeView'); // Or eventsView if you have a separate div
                document.getElementById('viewSubtitle').innerText = "Never miss an alumni meet or webinar.";
                fetchEvents();
            } else if (text === "My Applications") {
                showView('applicationsView');
                document.getElementById('viewSubtitle').innerText = "Track your referral requests.";
                fetchUserApplications();
            }
        });
    });

    // 3. Socket Listeners (Real-Time)
    socket.on('newJobPosted', (job) => {
        appendItem('jobFeed', job, '#2563eb', 'NEW JOB');
    });

    socket.on('receiveMessage', (msg) => {
        // Only show if the correct chat window is open
        if (msg.applicationId === currentApplicationId) {
            appendChatMessage(msg);
        }
    });

    // 4. Logout Logic
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear();
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

async function fetchUserApplications() {
    const studentId = localStorage.getItem('userId');
    try {
        const res = await fetch(`http://localhost:5000/api/applications/student/${studentId}`);
        const apps = await res.json();
        renderApplications(apps);
    } catch (err) {
        console.error("Error fetching apps:", err);
    }
}

// --- CHAT LOGIC ---

async function openChat(applicationId) {
    currentApplicationId = applicationId;
    document.getElementById('chatModal').style.display = 'flex';
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = '<p style="text-align:center">Loading chat history...</p>';

    // Join Socket Room
    socket.emit('joinChat', applicationId);

    // Load History
    try {
        const res = await fetch(`http://localhost:5000/api/messages/${applicationId}`);
        const history = await res.json();
        chatBox.innerHTML = '';
        history.forEach(msg => appendChatMessage(msg));
    } catch (err) {
        chatBox.innerHTML = '<p>Could not load history.</p>';
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text || !currentApplicationId) return;

    const msgData = {
        applicationId: currentApplicationId,
        senderId: localStorage.getItem('userId'),
        text: text
    };

    socket.emit('sendMessage', msgData);
    input.value = '';
}

function appendChatMessage(msg) {
    const chatBox = document.getElementById('chatBox');
    const isMe = msg.senderId === localStorage.getItem('userId');
    const msgHtml = `
        <div style="display: flex; justify-content: ${isMe ? 'flex-end' : 'flex-start'}; margin: 10px;">
            <div style="max-width: 70%; padding: 10px; border-radius: 12px; 
                background: ${isMe ? '#2563eb' : '#e5e7eb'}; 
                color: ${isMe ? 'white' : 'black'}">
                ${msg.text}
                <div style="font-size: 8px; margin-top: 4px; opacity: 0.7;">
                    ${new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
            </div>
        </div>
    `;
    chatBox.insertAdjacentHTML('beforeend', msgHtml);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// --- UI HELPERS ---

function renderList(targetId, data, color, type) {
    const container = document.getElementById(targetId);
    if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p>No ${type.toLowerCase()}s available.</p>`;
        return;
    }
    container.innerHTML = data.map(item => `
        <div class="job-card" style="border-left: 5px solid ${color}">
            <h3>${item.title}</h3>
            <p><strong>${item.company}</strong></p>
            <p>${item.description || ''}</p>
            <button class="apply-btn" style="background:${color}" 
                onclick="openJobModal('${item._id}', '${item.title}', '${item.company}', '${item.postedBy}')">
                Apply / View Info
            </button>
        </div>
    `).join('');
}

function renderApplications(apps) {
    const container = document.getElementById('applicationFeed');
    if (!apps.length) {
        container.innerHTML = '<p>You haven\'t applied for any referrals yet.</p>';
        return;
    }
    container.innerHTML = apps.map(app => `
        <div class="job-card" style="border-left: 5px solid #10b981">
            <h3>${app.jobId?.title || 'Referral Request'}</h3>
            <p>Company: ${app.jobId?.company || 'N/A'}</p>
            <p>Status: <span class="badge">${app.status}</span></p>
            <button class="apply-btn" onclick="openChat('${app._id}')" style="background:#10b981">
                Chat with Alumni
            </button>
        </div>
    `).join('');
}

function showView(viewId) {
    document.querySelectorAll('.view-section').forEach(v => v.style.display = 'none');
    const target = document.getElementById(viewId);
    if (target) target.style.display = 'block';
}

function openJobModal(jobId, title, company, alumniId) {
    document.getElementById('jobModal').style.display = 'flex';
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalCompany').innerText = company;
    // Store IDs in the form
    const form = document.getElementById('applyForm');
    form.dataset.jobId = jobId;
    form.dataset.alumniId = alumniId;
}

// Handle Application Form
document.getElementById('applyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const studentId = localStorage.getItem('userId');
    
    const formData = {
        jobId: e.target.dataset.jobId,
        alumniId: e.target.dataset.alumniId,
        studentId: studentId,
        studentName: e.target[0].value,
        branch: e.target[1].value,
        cgpa: e.target[2].value,
        resumeLink: e.target[3].value
    };

    try {
        const res = await fetch('http://localhost:5000/api/applications/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            alert("Application Sent Successfully!");
            document.getElementById('jobModal').style.display = 'none';
        }
    } catch (err) {
        alert("Failed to send application.");
    }
});


// This must be in the global scope so the HTML onclick can find it
function showTab(tabId) {
    // 1. Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });

    // 2. Remove 'active' class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 3. Show the specific tab clicked
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.style.display = 'block';
    }

    // 4. Add 'active' class to the button that was clicked
    // We use event.currentTarget to identify the button
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}


// Global scope function for the "Send Message" button in the Referral Tab
async function sendReferralRequest() {
    const studentId = localStorage.getItem('userId') || localStorage.getItem('regId');
    const messageText = document.getElementById('refMessage').value;
    
    // Safety check: Get IDs from the modal's data attributes
    const form = document.getElementById('applyForm');
    const jobId = form.dataset.jobId;
    const alumniId = form.dataset.alumniId;

    if (!messageText.trim()) {
        alert("Please enter a message.");
        return;
    }

    const formData = {
        jobId,
        alumniId,
        studentId,
        studentName: localStorage.getItem('userName') || "Student",
        branch: "Computer Engineering",
        cgpa: 0,
        resumeLink: "Pending",
        status: 'applied'
    };

    try {
        const res = await fetch('http://localhost:5000/api/applications/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        console.log("Response from server:", data); // <--- CHECK THIS IN BROWSER CONSOLE (F12)

        if (res.ok) {
            // FIX: Ensure we pick the ID correctly from your backend response
            // If your backend sends { application: { _id: ... } } use data.application._id
            const appId = data.application ? data.application._id : null;

            if (appId) {
                socket.emit('sendMessage', {
                    applicationId: appId,
                    senderId: studentId,
                    text: `[REFERRAL REQUEST]: ${messageText}`
                });
                alert("Referral request and message sent!");
            } else {
                console.error("Application ID missing in response data:", data);
                alert("Request sent, but chat failed to initialize.");
            }

            document.getElementById('jobModal').style.display = 'none';
        }
    } catch (err) {
        console.error("Referral Error:", err);
    }
}