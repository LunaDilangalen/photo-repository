const { response } = require('express');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('');
});

router.post('/', (request, response) => {
    console.log(request.body)
    response.send(request.body)
});

router.patch('/', (request, response) => {
    response.send(request.body)
});

module.exports = router;
