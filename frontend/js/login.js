document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageBox = document.getElementById('loginMessage');

    // 1. Frontend validation
    if (!email.endsWith('.edu')) {
        updateMessage("Invalid domain. Please use your .edu email.", "red");
        return;
    }

    updateMessage("Authenticating...", "blue");

    try {
        // 2. REAL BACKEND CALL
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // 3. Store the REAL JWT and User Data
            // We use 'token' to match the key sent by your server.js
            localStorage.setItem('nexus_token', data.token);
            localStorage.setItem('user_role', data.user.role);
            localStorage.setItem('regId', data.user.id);

            updateMessage("Login successful! Redirecting...", "green");

            // 4. Role-Based Redirection
            setTimeout(() => {
                const role = data.user.role;
                if (role === 'admin') {
                    window.location.href = 'admin-dashboard.html';
                } else if (role === 'alumni') {
                    window.location.href = 'alumni-portal.html';
                } else {
                    window.location.href = 'student-home.html';
                }
            }, 1500);

        } else {
            // Show the error message from the server (e.g., "Invalid Credentials")
            updateMessage(data.message || "Login failed", "red");
        }

    } catch (error) {
        console.error("Login Error:", error);
        updateMessage("Server is offline. Please start server.js", "red");
    }
});

function updateMessage(text, color) {
    const box = document.getElementById('loginMessage');
    
    // Simple color mapping
    const colors = {
        red: "#ef4444",
        green: "#22c55e",
        blue: "#2563eb"
    };

    box.style.color = colors[color] || "#000";
    box.style.textAlign = "center";
    box.style.marginTop = "1rem";
    box.style.fontWeight = "600";
    box.innerText = text;
}