import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Helper to return only safe user info (no password)
const toSafeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  userType: user.userType,
  address: user.address,
  phone: user.phone,
});

// --- Signup Controller ---
export const signup = async (req, res) => {
  try {
    console.log("🔐 Signup request received:", req.body);

    const { name, email, password, userType, phone, address } = req.body;

    // Basic validation
    if (!name || !email || !password || !userType || !phone || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Optional: Validate userType
    const validUserTypes = ['owner', 'renter'];
    if (!validUserTypes.includes(userType)) {
      return res.status(400).json({ message: "Invalid user type" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      userType,
      phone,
      address
    });

    await user.save();

    // Prepare safe response
    const safeUser = toSafeUser(user);

    console.log("✅ User created successfully:", safeUser);
    return res.status(201).json({ user: safeUser });

  } catch (error) {
    console.error("❌ Signup error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// --- Login Controller ---
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials (email not found)" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials (wrong password)" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const safeUser = toSafeUser(user);

    return res.json({ token, user: safeUser });

  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
