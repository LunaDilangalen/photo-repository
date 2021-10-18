const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Define Express App
const App = express();

// Import routes
const photosRoute = require('./routes/photos');

// Configuring port
const port = process.env.port || 3001;

// Configuring database connection
const mongoURI = process.env.DB_LINK;
const seed_db = require('./util/seed-db');

// JSON parser
App.use(express.json());

// Using routes
App.use('/photos', photosRoute);

async function main() {
    await mongoose.connect(mongoURI);

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected to backend.');
    });

    // Comment out if no need to seed.
    seed_db('Seeding database.');

    App.get('/', (req, res) => {
        res.send('Welcome to the Photo Repository Service API. :)');
    });

    App.listen(port, () => {
        console.log(`Photo Repository Service API is listening at http://localhost:${port}.`);
    });
}

main();