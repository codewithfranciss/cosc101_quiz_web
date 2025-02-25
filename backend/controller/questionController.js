const xlsx = require("xlsx");
const db = require("../config/db");
const multer = require("multer");

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

//uploadQuestion 
const uploadQuestions = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read Excel file
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (data.length === 0) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    // Map data to match database columns
    const questions = data.map((row) => ({
      question: row["question"],
      option_a: row["option_a"],
      option_b: row["option_b"],
      option_c: row["option_c"],
      option_d: row["option_d"],
      correct_answer: row["correct_answer"],
    }));

    // Insert data using the promise-based query
    const insertQuery =
      "INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer) VALUES ?";
    
    const values = questions.map((q) => [
      q.question,
      q.option_a,
      q.option_b,
      q.option_c,
      q.option_d,
      q.correct_answer,
    ]);

    await db.query(insertQuery, [values]); // ✅ Use await

    res.status(200).json({ message: "Data inserted successfully", data: questions });
  } catch (error) {
    console.error("Error inserting data: ", error);
    res.status(500).json({ message: "Error inserting data" });
  }
}

//get Questions
const getQuestions = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, question, option_a, option_b, option_c, option_d FROM questions ORDER BY RAND() LIMIT 30"
    );

    const formattedQuestions = rows.map((row) => ({
      id: row.id,
      question: row.question,
      options: [row.option_a, row.option_b, row.option_c, row.option_d],
    }));

    res.json(formattedQuestions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
;

module.exports = { upload, uploadQuestions, getQuestions };

