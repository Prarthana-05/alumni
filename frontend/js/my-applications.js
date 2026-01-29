async function loadDetailedApplications() {

    const studentId = localStorage.getItem('userId');

    const response = await fetch(`http://localhost:5000/api/applications/student/${studentId}`);

    const apps = await response.json();



    const tableBody = document.getElementById('applicationsTable');

    tableBody.innerHTML = apps.map(app => `

        <tr>

            <td>${app.jobId.title}</td>

            <td>${app.jobId.company}</td>

            <td>${new Date(app.appliedAt).toLocaleDateString()}</td>

            <td><span class="status-${app.status}">${app.status}</span></td>

            <td><button onclick="openChat('${app._id}')">Chat</button></td>

        </tr>

    `).join('');

}

