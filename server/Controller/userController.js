const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // ✅ Add this
const Profile = require("../Model/userModel");

const JWT_SECRET = "your_secret_key"; // 👉 Replace this with a secure secret key or use environment variables



const Signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const userExists = await Profile.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Profile({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // ✅ Generate JWT token after saving the user
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1d" });

    // ✅ Return token and user info
    res.status(201).json({ 
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Signin request received:", req.body);

    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email and password are required",
        errors: {
          email: !email ? "Email is required" : undefined,
          password: !password ? "Password is required" : undefined
        }
      });
    }

    const user = await Profile.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: "Invalid credentials",
        errors: {
          email: "User not found"
        }
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        message: "Invalid credentials",
        errors: {
          password: "Incorrect password"
        }
      });
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ 
      message: "Login successful", 
      token, 
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      },
    });

  } catch (error) {
    console.error("Server error during signin:", error);
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
};

module.exports = { Signup, Signin };
