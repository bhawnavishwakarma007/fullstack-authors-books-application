const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const db = require('./configs/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// DB connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL Database');
});

// ✅ ADD THIS
app.get('/api', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// API routes
app.use('/api', routes);

module.exports = app;

