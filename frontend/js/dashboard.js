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
                showView('eventsView'); // Or eventsView if you have a separate div
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

    container.innerHTML = apps.map(app => {
        // Determine color based on status
        let statusColor = "#6b7280"; // Default Gray (Applied)
        if (app.status === 'referred') statusColor = "#10b981"; // Green
        if (app.status === 'rejected') statusColor = "#ef4444"; // Red

        return `
            <div class="job-card" style="border-left: 5px solid ${statusColor}">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h3>${app.jobId?.title || 'Referral Request'}</h3>
                    <span class="status-badge" style="background: ${statusColor}; color: white; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                        ${app.status}
                    </span>
                </div>
                <p>Company: <strong>${app.jobId?.company || 'N/A'}</strong></p>
                <p style="font-size: 0.9rem; color: #666;">Applied on: ${new Date(app.appliedAt).toLocaleDateString()}</p>
                
                <div style="margin-top: 15px; display: flex; gap: 10px;">
                    <button class="apply-btn" onclick="openChat('${app._id}')" style="background:#10b981; flex: 1;">
                        <i class="fas fa-comments"></i> Chat with Alumni
                    </button>
                    ${app.status === 'referred' ? `
                        <div style="color: #10b981; font-weight: bold; display: flex; align-items: center; gap: 5px;">
                            <i class="fas fa-check-circle"></i> Referred!
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function showView(viewId) {
    document.querySelectorAll('.view-section').forEach(v => v.style.display = 'none');
    const target = document.getElementById(viewId);
    if (target) target.style.display = 'block';
}

async function openJobModal(jobId, title, company, alumniId) {
    const studentId = localStorage.getItem('userId');
    const modal = document.getElementById('jobModal');
    const form = document.getElementById('applyForm');
    
    // 1. Basic Modal Setup
    modal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalCompany').innerText = company;
    
    // 2. Set default data attributes
    form.dataset.jobId = jobId;
    form.dataset.alumniId = alumniId;
    form.dataset.applicationId = ""; // Reset for every new open

    // 3. CHECK IF ALREADY APPLIED
    try {
        const res = await fetch(`http://localhost:5000/api/applications/check?jobId=${jobId}&studentId=${studentId}`);
        const data = await res.json();

        if (data.exists) {
            console.log("Existing application found:", data.applicationId);
            // Save the ID so sendReferralRequest knows to just CHAT
            form.dataset.applicationId = data.applicationId;
            currentApplicationId = data.applicationId; 
            
            // Join the socket room and load messages
            socket.emit('joinChat', data.applicationId);
            loadModalChatHistory(data.applicationId);
        } else {
            // New application: clear the chat box
            document.getElementById('chatBoxInModal').innerHTML = 
                '<p class="text-center">No conversation yet. Send a message to start!</p>';
        }
    } catch (err) {
        console.error("Error checking application status:", err);
    }
}

// Helper to load history into the modal specifically
async function loadModalChatHistory(appId) {
    const chatBox = document.getElementById('chatBoxInModal');
    chatBox.innerHTML = '<p class="text-center">Loading history...</p>';
    
    try {
        const res = await fetch(`http://localhost:5000/api/messages/${appId}`);
        const history = await res.json();
        chatBox.innerHTML = '';
        history.forEach(msg => appendChatMessage(msg)); // Reuses your existing append function
    } catch (err) {
        chatBox.innerHTML = '<p>Error loading messages.</p>';
    }
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


async function sendReferralRequest() {
    const studentId = localStorage.getItem('userId') || localStorage.getItem('regId');
    const messageText = document.getElementById('refMessage').value.trim();
    const form = document.getElementById('applyForm');
    
    // Check if we already stored an Application ID in the modal from a previous check
    const existingAppId = form.dataset.applicationId; 

    if (!messageText) {
        alert("Please enter a message.");
        return;
    }

    if (existingAppId) {
        // --- SCENARIO A: ALREADY APPLIED (Chat Only) ---
        socket.emit('sendMessage', {
            applicationId: existingAppId,
            senderId: studentId,
            text: messageText
        });
        
        // Clear input and show feedback
        document.getElementById('refMessage').value = "";
        console.log("Chat message sent to existing application.");
    } else {
        // --- SCENARIO B: FIRST TIME (Apply + Chat) ---
        const formData = {
            jobId: form.dataset.jobId,
            alumniId: form.dataset.alumniId,
            studentId: studentId,
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

            if (res.ok) {
                // Save the new ID to the form so subsequent clicks follow Scenario A
                form.dataset.applicationId = data.application._id;

                socket.emit('sendMessage', {
                    applicationId: data.application._id,
                    senderId: studentId,
                    text: `[NEW REQUEST]: ${messageText}`
                });

                alert("Application submitted successfully!");
                updateAppStats(); // Refresh the counter on home page
            } else {
                alert(data.message || "Error submitting application");
            }
        } catch (err) {
            console.error("Critical Error:", err);
        }
    }
}


async function updateAppStats() {
    const studentId = localStorage.getItem('userId');
    try {
        const res = await fetch(`http://localhost:5000/api/applications/student/${studentId}`);
        const apps = await res.json();
        
        // Update the number in the H3 tag
        document.getElementById('totalApps').innerText = apps.length;
    } catch (err) {
        console.error("Error updating stats:", err);
    }
}

// Call this when the dashboard loads
updateAppStats();


async function fetchEvents() {
    try {
        const res = await fetch('http://localhost:5000/api/events/all');
        const events = await res.json();
        
        const container = document.getElementById('eventFeed');
        if (!container) return; // Safety check

        if (!events || events.length === 0) {
            container.innerHTML = '<p>No upcoming events at the moment.</p>';
            return;
        }

        container.innerHTML = events.map(event => `
            <div class="job-card" style="border-left: 5px solid #8b5cf6">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <h3>${event.title}</h3>
                    <span style="background: #ede9fe; color: #8b5cf6; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">EVENT</span>
                </div>
                <p style="color: #6b7280; margin: 8px 0;">
                    <i class="fas fa-calendar-day"></i> <strong>${event.date}</strong>
                </p>
                <p>${event.description || 'No description provided.'}</p>
                ${event.link ? `
                    <a href="${event.link}" target="_blank" class="apply-btn" style="background:#8b5cf6; display:inline-block; text-align:center; text-decoration:none; margin-top: 10px;">
                        Register / Join Link
                    </a>` : ''}
            </div>
        `).join('');
    } catch (err) {
        console.error("Error fetching events:", err);
        document.getElementById('eventFeed').innerHTML = '<p>Error loading events. Please try again later.</p>';
    }
}