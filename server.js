const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// In-memory array to store scores.
let scores = [];

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// --- API Routes ---

app.get('/api/scores', (req, res) => {
    res.json(scores);
});

// Updated POST endpoint to handle detailed scores
app.post('/api/scores', (req, res) => {
    // Destructure all expected fields from the request body
    const { team, score, stability, production, energy } = req.body;

    // More robust validation
    if (
        !team ||
        typeof score !== 'number' ||
        typeof stability !== 'number' ||
        typeof production !== 'number' ||
        typeof energy !== 'number'
    ) {
        return res.status(400).json({ error: 'Invalid data. All fields (team, score, stability, production, energy) are required and must be the correct type.' });
    }

    // Create the new score object with all details
    const newScore = { team, score, stability, production, energy };

    scores.push(newScore);
    console.log('Detailed score added:', newScore);
    res.status(201).json({ message: 'Score added successfully.' });
});

app.delete('/api/scores', (req, res) => {
    scores = [];
    console.log('All scores have been cleared.');
    res.status(200).json({ message: 'All scores cleared.' });
});


// --- Server Start ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
