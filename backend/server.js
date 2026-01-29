const express = require('express');
const http = require('http'); // 1. Added
const { Server } = require('socket.io'); // 2. Added
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app); // 3. Wrap App

// 4. Configure Socket.io
const io = new Server(server, {
    cors: { origin: "*" } // Allows frontend to connect
});

app.use(express.json());
app.use(cors());

// 5. Make 'io' accessible in routes
app.set('socketio', io);

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/alumniNexus')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/events', require('./routes/events'));



// 6. Use server.listen instead of app.listen
const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Real-time Server on port ${PORT}`));