const { response } = require('express');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const Photo = require('../models/Photo');

router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find( {}, {_id: 0, __v: 0} );
        res.json(photos);
    } catch (err) {
        res.json( {message: err} );
    }
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

router.get('/findByTag', async (req, res) => {
    const queryTags = req.body.tags;

    try {
        const taggedPhotos = await Photo.find( {tags: {'$in' : queryTags}}, 
                                {_id: 0, __v: 0} );
        res.json(taggedPhotos);
    } catch (err) {
        res.json( {message: err} ); 
    }
});

router.get('/findByProductId', async (req, res) => {
    const queryProductId = req.body.productId;

    try {
        const productPhotos = await Photo.find( {productId: queryProductId}, 
                                {_id: 0, __v: 0} );
        res.json(taggedPhotos);
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

router.delete('/:photoId', async (req, res) => {
    try {
        const removedPhoto = await Photo.remove( {_id: req.params.photoId} );
        res.json(removedPhoto);
    } catch (err) {
        res.json( {message: err} );
    }
});

module.exports = router;
