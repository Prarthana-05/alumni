document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageBox = document.getElementById('loginMessage');

    if (!email.endsWith('.edu')) {
        updateMessage("Invalid domain. Please use your .edu email.", "red");
        return;
    }

    updateMessage("Authenticating...", "blue");

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // 1. SAVE TO LOCAL STORAGE
            localStorage.setItem('nexus_token', data.token);
            localStorage.setItem('user_role', data.user.role);
            localStorage.setItem('userName', data.user.name || "Student");

            // 2. THE ID FIX: Try all common paths for the MongoDB _id
            const mongoId = data.user._id || data.user.id || data.id;
            
            if (mongoId) {
                localStorage.setItem('userId', mongoId);
            } else {
                console.error("Critical: MongoDB ID not found in server response", data);
            }

            // 3. Keep roll number/regId if needed for display
            localStorage.setItem('regId', data.user.rollNo || data.user.id);

            updateMessage("Login successful! Redirecting...", "green");

            setTimeout(() => {
                const role = data.user.role;
                if (role === 'admin') window.location.href = 'admin-dashboard.html';
                else if (role === 'alumni') window.location.href = 'alumni-portal.html';
                else window.location.href = 'student-home.html';
            }, 1500);

        } else {
            updateMessage(data.message || "Login failed", "red");
        }

    } catch (error) {
        console.error("Login Error:", error);
        updateMessage("Server is offline. Please start server.js", "red");
    }
});

function updateMessage(text, color) {
    const box = document.getElementById('loginMessage');
    const colors = { red: "#ef4444", green: "#22c55e", blue: "#2563eb" };
    box.style.color = colors[color] || "#000";
    box.style.textAlign = "center";
    box.style.marginTop = "1rem";
    box.style.fontWeight = "600";
    box.innerText = text;
}