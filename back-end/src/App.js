const express = require('express');
const mongoose = require('mongoose');
const App = express();

const port = 3001;
const mongoURI = process.env.DB_LINK;

const seed_db = require('./util/seed-db');
const photosRoute = require('./routes/photos');

async function main() {
    await mongoose.connect(mongoURI);

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected to backend.');
    });

    // Comment out if no need to seed.
    seed_db('Seeding database.');

    App.use('/photos', photosRoute);

    App.get('/', (req, res) => {
        res.send('Welcome to the Photo Repository Service API. :)');
    });

    App.listen(port, () => {
        console.log(`Photo Repository Service API is listening at http://localhost:${port}.`);
    });
}

main();