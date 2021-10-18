const { response } = require('express');
const express = require('express');
const router = express.Router();

const Photo = require('../models/Photo');

router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find({}, {_id: 0, __v: 0});
        res.json(photos);
    } catch (err) {
        res.json( {message: err} );
    }
});

router.post('/', (request, response) => {
    console.log(request.body)
    response.send(request.body)
});

router.patch('/', (request, response) => {
    response.send(request.body)
});

router.put('/', (req, res) => {
    response.send(req.body)
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const foundPhoto = await Photo.find({_id: id});
        res.json(foundPhoto);
    } catch (err) {
        res.json( {message: err} );
    }
});

module.exports = router;
