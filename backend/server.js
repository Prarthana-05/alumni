const express = require('express');
const http = require('http'); 
const { Server } = require('socket.io'); 
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Message = require('./models/Message');
const messageRoutes = require('./routes/messages');

const app = express();
const server = http.createServer(app); 

const io = new Server(server, {
    cors: { origin: "*" } 
});

app.use(express.json());
app.use(cors());

app.set('socketio', io);

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/alumniNexus')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/events', require('./routes/events'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/messages', messageRoutes);

// --- Socket.io Real-time Logic ---
io.on('connection', (socket) => {
    console.log('User connected to chat:', socket.id);

    // 1. Join private room
    socket.on('joinChat', (applicationId) => {
        socket.join(applicationId);
        console.log(`User joined room: ${applicationId}`);
    });

    // 2. Handle sending a message
    socket.on('sendMessage', async (data) => {
        console.log("Socket received data:", data); 
        const { applicationId, senderId, text } = data;
        
        try {
            // Check if all data is present before saving
            if(!applicationId || !senderId || !text) {
                throw new Error("Missing required fields: applicationId, senderId, or text");
            }

            const newMessage = new Message({ applicationId, senderId, text });
            const saved = await newMessage.save();
            console.log("✅ Message saved to DB:", saved._id);

            // Broadcast to the specific room
            io.to(applicationId).emit('receiveMessage', {
                applicationId: saved.applicationId,
                senderId: saved.senderId,
                text: saved.text,
                timestamp: saved.timestamp
            });
        } catch (err) {
            console.error("❌ DATABASE SAVE ERROR:", err.message);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Use server.listen instead of app.listen
const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Real-time Server on port ${PORT}`));