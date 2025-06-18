const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory array to store scores. For a real-world application,
// you would use a database here (e.g., MongoDB, PostgreSQL, or a file-based DB like SQLite).
let scores = [];

// --- Middleware ---
// Enable CORS (Cross-Origin Resource Sharing) to allow the browser to make requests
app.use(cors());
// Enable parsing of JSON request bodies
app.use(express.json());
// Serve the static files (our index.html) from the project's root directory
app.use(express.static(__dirname));

// --- API Routes ---

/**
* @api {get} /api/scores
* @description Retrieve all team scores.
* @returns {Array} A JSON array of score objects, e.g., [{ team: 'Team A', score: 250 }]
*/
app.get('/api/scores', (req, res) => {
    res.json(scores);
});

/**
* @api {post} /api/scores
* @description Add a new score to the list.
* @param {object} req.body - The request body should be a JSON object: { team: string, score: number }
* @returns {object} A confirmation message.
*/
app.post('/api/scores', (req, res) => {
    const { team, score } = req.body;
    // Basic validation
    if (!team || typeof score !== 'number') {
        return res.status(400).json({ error: 'Invalid data. "team" (string) and "score" (number) are required.' });
    }
    const newScore = { team, score };
    scores.push(newScore);
    console.log('Score added:', newScore); // Log to server console
    res.status(201).json({ message: 'Score added successfully.' });
});

/**
* @api {delete} /api/scores
* @description Clear all recorded scores.
* @returns {object} A confirmation message.
*/
app.delete('/api/scores', (req, res) => {
    scores = [];
    console.log('All scores have been cleared.'); // Log to server console
    res.status(200).json({ message: 'All scores cleared.' });
});


// --- Server Start ---
app.listen(PORT, '0.0.0.0', () => {});
