const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('');
});

router.post('/', (request, response) => {
    response.send('We are on photos!')
});

module.exports = router;
