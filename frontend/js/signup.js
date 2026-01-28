// Toggle UI based on selected role
function handleRoleUI() {
    const role = document.getElementById('role').value;
    const adminField = document.getElementById('adminField');
    const idLabel = document.getElementById('idLabel');
    const regIdInput = document.getElementById('regId');

    if (role === 'admin') {
        adminField.style.display = 'block';
        idLabel.innerText = "Employee / Faculty ID";
        regIdInput.placeholder = "e.g. FAC882";
    } else {
        adminField.style.display = 'none';
        idLabel.innerText = "Institutional ID / Roll No";
        regIdInput.placeholder = "e.g. 2021CS101";
    }
}

document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const regId = document.getElementById('regId').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    const adminKey = document.getElementById('adminKey') ? document.getElementById('adminKey').value : null;

    // 1. Frontend Domain Check (Instant feedback)
    if (!email.endsWith('.edu')) {
        showMessage("Only official .edu emails are allowed.", "red");
        return;
    }

    showMessage("Sending registration request...", "blue");

    try {
        // 2. REAL BACKEND CALL
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                regId,
                email,
                password,
                role,
                adminKey
            })
        });

        const data = await response.json();

        if (response.ok) {
            // 3. SUCCESSFUL REGISTRATION
            showMessage("Registration successful! Redirecting to login...", "green");
            
            // Wait 2 seconds so user can read the success message
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);

        } else {
            // 4. SERVER-SIDE ERROR (e.g. User already exists, Invalid Admin Key)
            showMessage(data.message || "Registration failed", "red");
        }

    } catch (error) {
        console.error("Signup Error:", error);
        showMessage("Connection failed. Is the server.js running?", "red");
    }
});

function showMessage(text, color) {
    const messageBox = document.getElementById('messageBox');
    
    // Color Palette
    const colors = {
        red: { text: "#ef4444", bg: "#fef2f2" },
        green: { text: "#22c55e", bg: "#f0fdf4" },
        blue: { text: "#2563eb", bg: "#eff6ff" }
    };

    const theme = colors[color] || colors.blue;

    messageBox.style.color = theme.text;
    messageBox.style.background = theme.bg;
    messageBox.style.padding = "10px";
    messageBox.style.borderRadius = "8px";
    messageBox.style.marginTop = "1rem";
    messageBox.style.fontWeight = "600";
    messageBox.style.textAlign = "center";
    messageBox.innerText = text;
}