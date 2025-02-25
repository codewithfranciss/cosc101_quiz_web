const express = require("express");
const db = require("../config/db");
const { upload, uploadUsers } = require("../controller/userController");
const { loginUser } = require("../controller/authController");
const { uploadQuestions, getQuestions } = require("../controller/questionController");
const {calculateScore, getLecturers, getLecturerScore, checkSubmission, getDepartment, getDepartmentScore } = require("../controller/scoreController")

const router = express.Router();

// My routes
router.post("/upload-users", upload.single("file"), uploadUsers);
router.post("/login", loginUser);
router.post("/upload-questions", upload.single("file"), uploadQuestions);
router.get("/questions", getQuestions);
router.post("/submit-quiz", calculateScore )
router.get("/department", getDepartment)
router.get("/lecturers", getLecturers)
router.get("/scores/:lecturer", getLecturerScore)
router.get("/score/department/:department", getDepartmentScore)
router.get("/check-submission", checkSubmission)// Your MySQL database connection


router.get("/get-lecturers", async (req, res) => {
    try {
      const query = "SELECT DISTINCT lecturer FROM users WHERE lecturer IS NOT NULL AND lecturer != ''";
      const [rows] = await db.query(query);
  
      // Ensure unique lecturer names
      const lecturers = [...new Set(rows.map((row) => row.lecturer))];
  
      res.status(200).json({ lecturers });
    } catch (error) {
      console.error("Error fetching lecturers:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });

  router.get("/get-department", async (req, res) => {
    try {
      const query = "SELECT DISTINCT department FROM users WHERE department IS NOT NULL AND department != ''";
      const [rows] = await db.query(query);
 
      const departments = [...new Set(rows.map((row) => row.department))];
  
      res.status(200).json({ departments });
    } catch (error) {
      console.error("Error fetching lecturers:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  })
  


  // Get the timer value
  router.get("/get-timer", async (req, res) => {
    try {
        const [result] = await db.query("SELECT timer FROM settings LIMIT 1");

        if (result.length === 0) {
            return res.status(404).json({ error: "No timer found" });
        }

        res.json({ timer: result[0].timer });
    } catch (error) {
        console.error("Error fetching timer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

  
  // Set/update the timer value
  router.post("/set-timer", async (req, res) => {
    try {
        
        const { timer } = req.body;

        if (!timer || isNaN(timer)) {
            return res.status(400).json({ error: "Invalid timer value" });
        }

        const [result] = await db.query("UPDATE settings SET timer = ? WHERE id = 1", [timer]);

        res.json({ message: "Timer updated successfully" });
    } catch (error) {
        console.error("Error updating timer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




module.exports = router;
