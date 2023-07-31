
const sqlite3 = require('sqlite3').verbose();

// Replace 'your_database_file.db' with the actual name of your SQLite database file.
const db = new sqlite3.Database('sqlite.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

const express = require('express');
const app = express();
// host static files from the public/ folder
app.use(express.static('public'));


// API endpoint to get data by seating_no
app.get('/student/:seating_no', (req, res) => {
  const seatingNo = req.params.seating_no;

  const query = `SELECT * FROM Stage_New_Search WHERE seating_no = ?`;

  db.get(query, [seatingNo], (err, row) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (!row) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(row);
    }
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
