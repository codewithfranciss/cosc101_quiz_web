const xlsx = require("xlsx");
const db = require("../config/db");
const multer = require("multer");

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload and Process Excel File
const uploadUsers = async (req, res) => {
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

    // Mapping the data
    const users = data.map(row => ([
      row["Matric Number"],
      row["Lecturer Name"],
      row["Password"]
    ]));

    if (users.length === 0) {
      return res.status(400).json({ message: "No valid data to insert" });
    }

    // Inserting data into MySQL
    const query = "INSERT INTO users (matric_number, lecturer_name, password) VALUES ?";
    await db.query(query, [users]);

    console.log("✅ Users inserted successfully");
    res.status(200).json({ message: "Users uploaded successfully", data: users });
  } catch (error) {
    console.error("❌ Error inserting data: ", error);
    res.status(500).json({ message: "Error inserting data" });
  }
};

module.exports = { upload, uploadUsers };
