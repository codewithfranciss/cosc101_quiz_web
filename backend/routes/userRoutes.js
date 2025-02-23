const express = require("express");
const { upload, uploadUsers } = require("../controller/userController");
const { loginUser } = require("../controller/authController");
const { uploadQuestions, getQuestions } = require("../controller/questionController");
const {calculateScore, getLecturers, getLecturerScore, checkSubmission } = require("../controller/scoreController")

const router = express.Router();

// My routes
router.post("/upload-users", upload.single("file"), uploadUsers);
router.post("/login", loginUser);
router.post("/upload-questions", upload.single("file"), uploadQuestions);
router.get("/questions", getQuestions);
router.post("/submit-quiz", calculateScore )
router.get("/lecturers", getLecturers)
router.get("/scores/:lecturer", getLecturerScore)
router.get("/check-submission", checkSubmission)


module.exports = router;
