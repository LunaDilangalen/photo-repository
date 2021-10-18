const express = require('express');
const mongoose = require('mongoose');
const App = express();

const port = 3001;
const mongoURI = process.env.DB_LINK;

var seed_db = require('./util/seed-db.js');

async function main() {
    await mongoose.connect(mongoURI);

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected to backend.');
        App = express();
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