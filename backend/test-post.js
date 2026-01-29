// const mongoose = require('mongoose');
// const Job = require('./models/Jobs'); // Ensure path is correct
// require('dotenv').config();

// const dummyJobs = [
//     {
//         title: "Full Stack Engineer",
//         company: "Google",
//         category: "Web Dev",
//         description: "Focus on React and Node.js.",
//         postedBy: "Rahul (Class of '22)"
//     },
//     {
//         title: "AI Researcher",
//         company: "OpenAI",
//         category: "Machine Learning",
//         description: "Working on LLM fine-tuning.",
//         postedBy: "Sneha (Class of '21)"
//     }
// ];

// async function seedDB() {
//     try {
//         // 1. Connect to DB
//         await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/alumniNexus');
//         console.log("📡 Connected to MongoDB for seeding...");

//         // 2. Insert Data
//         await Job.insertMany(dummyJobs);
//         console.log("✅ Successfully added dummy jobs to Database!");

//         // 3. Close Connection
//         mongoose.connection.close();
//         console.log("🔌 Connection closed.");
//     } catch (err) {
//         console.error("❌ Seeding Error:", err);
//         process.exit(1);
//     }
// }

// seedDB();


const mongoose = require('mongoose');
const Event = require('./models/Event'); // Ensure you created models/Event.js
require('dotenv').config();

const dummyEvents = [
  {
    "title": "Resume Building Workshop",
    "date": "Feb 10, 2026 - 5:00 PM",
    "description": "Learn how to beat the ATS and get shortlisted for top tech companies.",
    "link": "https://zoom.us/j/workshop123"
  },
  {
    "title": "Mock Interview Session",
    "date": "Feb 15, 2026 - 10:00 AM",
    "description": "1-on-1 mock interviews with alumni working at Google and Microsoft.",
    "link": "Google Meet: nexus-meet-up"
  },
  {
    "title": "Higher Studies in USA Webinar",
    "date": "March 02, 2026 - 7:00 PM",
    "description": "Guidance on GRE/TOEFL and the application process for Master's programs.",
    "link": "https://webinar.link/higher-studies"
  }
];

async function seedEvents() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/alumniNexus');
        console.log("📡 Connected to MongoDB...");

        await Event.insertMany(dummyEvents);
        console.log("✅ Successfully added 3 events to the Database!");

        mongoose.connection.close();
    } catch (err) {
        console.error("❌ Error seeding events:", err);
        process.exit(1);
    }
}

seedEvents();