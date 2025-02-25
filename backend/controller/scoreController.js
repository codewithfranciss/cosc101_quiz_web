const db = require("../config/db");

const calculateScore = async (req, res) => {
  try {
    const { matric_number, lecturer, department, full_name, answers } = req.body;

    if (!matric_number || !lecturer || !answers) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    // Fetch quiz questions
    const [rows] = await db.query("SELECT id, correct_answer FROM questions");

    if (!rows.length) {
      return res.status(400).json({ message: "No quiz questions found" });
    }

    const correctAnswers = rows.reduce((acc, question) => {
      acc[question.id] = question.correct_answer;
      return acc;
    }, {});

    let score = 0;
    Object.keys(answers).forEach((questionId) => {
      const userAnswer = answers[questionId] || ""; // Default empty answers to ""
      if (userAnswer === correctAnswers[questionId]) {
        score++;
      }
    });

    await db.query(
      "INSERT INTO quiz_results (matric_number, lecturer, full_name, department, score) VALUES (?, ?, ?, ?, ?)",
      [matric_number, lecturer, full_name, department, score]
    );

    res.json({ message: "Quiz submitted successfully", score });
  } catch (error) {
    console.error("Error processing quiz submission:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getLecturers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT DISTINCT lecturer FROM quiz_results");

    if (!rows.length) {
      return res.status(404).json({ message: "No lecturers found" });
    }

    res.json(rows);
  } catch (error) {
    console.error("Error fetching lecturers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDepartment = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT DISTINCT department FROM quiz_results");

    if (!rows.length) {
      return res.status(404).json({ message: "No departments found" });
    }

    res.json(rows);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getLecturerScore = async (req, res) => {
  try {
    const lecturer = req.params.lecturer; 

    // Fetch student scores for this lecturer
    const [rows] = await db.query(
      "SELECT matric_number, score, full_name FROM quiz_results WHERE lecturer = ?",
      [lecturer]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "No scores found for this lecturer" });
    }

    res.json(rows);
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDepartmentScore = async (req, res) => {
  try {
    const department = req.params.department; 
    console.log(department);

    // Fetch student scores for this department
    const [rows] = await db.query(
      "SELECT matric_number, score, full_name FROM quiz_results WHERE department = ?",
      [department]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "No scores found for this department" });
    }

    res.json(rows);
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const checkSubmission =  async (req, res) => {
  const { matric_number } = req.query;

  try {
    const [rows] = await db.query("SELECT * FROM quiz_results WHERE matric_number = ?", [matric_number]);

    if (rows.length > 0) {
      return res.json({ submitted: true });
    }

    res.json({ submitted: false });
  } catch (error) {
    console.error("Error checking submission:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { calculateScore, getLecturers, getLecturerScore, checkSubmission, getDepartment, getDepartmentScore};
