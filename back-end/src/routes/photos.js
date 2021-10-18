const { response } = require('express');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
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
    const photo = new Photo({
        id: uuidv4(),
        source: request.body.source,
        tags: request.body.tags
    });

    photo.save()
        .then(data => {
            response.json(data);
        })
        .catch(err => {
            response.json({ message: err });
        });
});

router.patch('/', (request, response) => {
    response.send(request.body)
});

module.exports = router;
