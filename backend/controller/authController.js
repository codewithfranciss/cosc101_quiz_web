const db = require("../config/db");

const loginUser = async (req, res) => {
  try {
    
    const { matric_number, password, lecturer, department } = req.body;

    if (!matric_number || !password || !lecturer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Query database for user with matching matric_number, password, and lecturer_name
    const [results] = await db.query(
      "SELECT * FROM users WHERE matric_number = ? AND lecturer = ?  AND password = ? AND department = ?",
      [matric_number, lecturer, password, department]
    );

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid login details" });
    }

    res.json({ message: "Login successful", user: results[0] });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { loginUser };
