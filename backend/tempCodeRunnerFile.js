const express = require('express');
const db = require('./config/db.js')
const app = express();
const port = 5000;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

db.connect((err) => {
    if (err) {
      console.error("Database connection failed: " + err.message);
      return;
    }
    console.log("Connected to MySQL database");
  });
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});