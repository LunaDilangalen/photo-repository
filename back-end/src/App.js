const express = require('express');
const App  = express();
const port = 3001;

App.get('/', (request, response) => {
    response.send('Hello world!');
});

App.listen(port, () => {
    console.log(`Test app is listening at http://localhost:${port}`);
});