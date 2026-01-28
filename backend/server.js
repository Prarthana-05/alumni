const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

/* ---------------- Middleware ---------------- */
app.use(express.json());
app.use(cors());

/* ---------------- Routes (TOP LEVEL CALL) ---------------- */
const authRoutes = require('./routes/auth'); // Points to auth.js
// later you can add more:
// const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);

/* ---------------- Config ---------------- */
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/alumniNexus';

/* ---------------- MongoDB Connection ---------------- */
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('------------------------------------');
    console.log('✅ DATABASE STATUS: Connected Successfully');
    console.log(`📡 MongoDB URI: ${MONGO_URI}`);
    console.log('------------------------------------');
  })
  .catch((err) => {
    console.error('❌ DATABASE CONNECTION FAILED');
    console.error(err.message);
    process.exit(1);
  });

/* ---------------- Test Route ---------------- */
app.get('/', (req, res) => {
  res.send('Alumni Nexus Backend Running 🚀');
});

/* ---------------- Start Server ---------------- */
app.listen(PORT, () => {
  console.log('\n====================================');
  console.log('🚀 SERVER STATUS: RUNNING');
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log('====================================');
});
