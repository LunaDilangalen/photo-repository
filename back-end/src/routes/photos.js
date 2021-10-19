const { response } = require('express');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const Photo = require('../models/Photo');

router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find({}, {__v: 0});
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

router.delete('/:photoId', async (req, res) => {
    try {
        const removedPhoto = await Photo.remove( {_id: req.params.photoId} );
        res.json(removedPhoto);
    } catch (err) {
        res.json( {message: err} );
    }
});

module.exports = router;
