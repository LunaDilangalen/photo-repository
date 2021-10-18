const { response } = require('express');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('');
});

router.post('/', (request, response) => {
    response.send('Creating new Photo!')
});

router.patch('/', (request, response) => {
    response.send('Patching Photo...')
});

module.exports = router;
