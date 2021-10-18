const express = require('express');
const mongoose = require('mongoose');
const App = express();

// Import routes
const photosRoute = require('./routes/photos');

// Configuring port
const port = process.env.port || 3001;

// Configuring database connection
const mongoURI = process.env.DB_LINK;
var seed_db = require('./util/seed-db.js');

// Using routes
App.use('/photos', photosRoute);

async function main() {
    await mongoose.connect(mongoURI);

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected to backend.');
    });

    // Comment out if no need to seed.
    seed_db('Seeding database.');

    App.get('/', (request, response) => {
        response.send(mongoURI);
    });

    App.listen(port, () => {
        console.log(`Test app is listening at http://localhost:${port}`);
    });
}

main();