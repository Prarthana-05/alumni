


// const mongoose = require('mongoose');
// const Event = require('./models/Event'); // Ensure you created models/Event.js
// require('dotenv').config();

// const dummyEvents = [
//   {
//     "title": "Resume Building Workshop",
//     "date": "Feb 10, 2026 - 5:00 PM",
//     "description": "Learn how to beat the ATS and get shortlisted for top tech companies.",
//     "link": "https://zoom.us/j/workshop123"
//   },
//   {
//     "title": "Mock Interview Session",
//     "date": "Feb 15, 2026 - 10:00 AM",
//     "description": "1-on-1 mock interviews with alumni working at Google and Microsoft.",
//     "link": "Google Meet: nexus-meet-up"
//   },
//   {
//     "title": "Higher Studies in USA Webinar",
//     "date": "March 02, 2026 - 7:00 PM",
//     "description": "Guidance on GRE/TOEFL and the application process for Master's programs.",
//     "link": "https://webinar.link/higher-studies"
//   }
// ];

// async function seedEvents() {
//     try {
//         await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/alumniNexus');
//         console.log("📡 Connected to MongoDB...");

//         await Event.insertMany(dummyEvents);
//         console.log("✅ Successfully added 3 events to the Database!");

//         mongoose.connection.close();
//     } catch (err) {
//         console.error("❌ Error seeding events:", err);
//         process.exit(1);
//     }
// }

// seedEvents();



const mongoose = require('mongoose');
const Job = require('./models/Jobs'); // Ensure this path is correct

mongoose.connect('mongodb://localhost:27017/alumniNexus') // Matches your db name
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Connection error:", err));

const alumniId = "697adfa516b095ad2458afae"; // Your real Alumni ID

const dummyJobs = [
    {
        title: "Software Engineer Intern",
        company: "Google",
        category: "Software Development",
        description: "Looking for 2026 graduates. Strong DS/Algo required.",
        postedBy: new mongoose.Types.ObjectId(alumniId)
    },
    {
        title: "Data Analyst",
        company: "Microsoft",
        category: "Data Science",
        description: "Knowledge of Python and SQL is a must.",
        postedBy: new mongoose.Types.ObjectId(alumniId)
    },
    {
        title: "Full Stack Developer",
        company: "TCS",
        category: "Web Development",
        description: "MERN stack developers needed for digital wing.",
        postedBy: new mongoose.Types.ObjectId(alumniId)
    }
];

const seedDB = async () => {
    try {
        await Job.deleteMany({}); // Clears old data to avoid duplicates
        await Job.insertMany(dummyJobs);
        console.log("✅ Jobs seeded successfully with real Alumni ID!");
        process.exit();
    } catch (err) {
        console.error("❌ Seeding failed:", err.message);
        process.exit(1);
    }
};

seedDB();