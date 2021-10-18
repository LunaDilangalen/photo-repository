const express = require('express');

const router = express.Router();

router.post('/', (request, response) => {
    response.send('We are on photos!')
});

module.exports = router;