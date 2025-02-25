const express = require("express");
const db = require("./config/db.js");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);


const router = express.Router();




module.exports = router;

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
