console.log("🔥 AUTH CONTROLLER FILE IS BEING USED 🔥");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        if (!user.isVerified) {
           return res.status(403).json({
        message: "Your account is pending admin approval"
    });
}

        const payload = {
            id: user._id,
            role: user.role,
            verified: user.isVerified
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        _id: user._id,
                        id: user.regId,
                        role: user.role,
                        verified: user.isVerified
                    }
                });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.register = async (req, res) => {
    try {
        const {
            regId, email, password, role, year, graduationYear, branch,
            currentRole, organization, industry, linkedinLink, isOpenToMentorship
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { regId }] });
        if (existingUser) {
            return res.status(400).json({ message: "User with this Email or Roll No already exists" });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            regId,
            email,
            password: hashedPassword, // Save the hashed version
            role,
            branch: role !== 'admin' ? branch : undefined,
            year: role === 'student' ? year : undefined,
            graduationYear: role === 'alumni' ? graduationYear : undefined,
            // New PBST Fields
            currentRole: role === 'alumni' ? currentRole : undefined,
            organization: role === 'alumni' ? organization : undefined,
            industry: role === 'alumni' ? industry : undefined,
            linkedinLink,
            isOpenToMentorship: role === 'alumni' ? isOpenToMentorship : false
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // TEMP DEBUG — do NOT panic, this is intentional
  console.log("REQ:", email, password);
  console.log("ENV:", process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

  if (
    email.trim() === String(process.env.ADMIN_EMAIL).trim() &&
    password.trim() === String(process.env.ADMIN_PASSWORD).trim()
  ) {
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      user: { role: "admin", email }
    });
  }

  return res.status(401).json({ message: "Invalid admin credentials" });
};
