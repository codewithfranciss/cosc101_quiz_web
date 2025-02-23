const db = require("../config/db");

const loginUser = async (req, res) => {
  try {
    const { matric_number, password } = req.body;

    if (!matric_number || !password) {
      return res.status(400).json({ message: "Matric Number and Password are required" });
    }

    // Query database
    const [results] = await db.query("SELECT * FROM users WHERE matric_number = ?", [matric_number]);

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { loginUser };
