const mongoose = require('mongoose');
const Job = require('./models/Jobs'); // Ensure path is correct
require('dotenv').config();

const dummyJobs = [
    {
        title: "Full Stack Engineer",
        company: "Google",
        category: "Web Dev",
        description: "Focus on React and Node.js.",
        postedBy: "Rahul (Class of '22)"
    },
    {
        title: "AI Researcher",
        company: "OpenAI",
        category: "Machine Learning",
        description: "Working on LLM fine-tuning.",
        postedBy: "Sneha (Class of '21)"
    }
];

async function seedDB() {
    try {
        // 1. Connect to DB
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/alumniNexus');
        console.log("📡 Connected to MongoDB for seeding...");

        // 2. Insert Data
        await Job.insertMany(dummyJobs);
        console.log("✅ Successfully added dummy jobs to Database!");

        // 3. Close Connection
        mongoose.connection.close();
        console.log("🔌 Connection closed.");
    } catch (err) {
        console.error("❌ Seeding Error:", err);
        process.exit(1);
    }
}

seedDB();