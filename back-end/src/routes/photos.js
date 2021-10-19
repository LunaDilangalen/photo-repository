const { response } = require('express');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// for uploading files to S3
const multer = require('multer');
const AWS = require('aws-sdk');

const Photo = require('../models/Photo');

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: filefilter });

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
})

router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find( {}, {_id: 0, __v: 0} );
        res.json(photos);
    } catch (err) {
        res.json( {message: err} );
    }
});

router.post('/findByTag', async (req, res) => {
    const queryTags = req.body.tags;

    console.log(queryTags);

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

router.get('/:id', async (req, res) => {
    try {
        const foundPhoto = await Photo.find({_id: req.params.id}, {_id: 0, __v: 0});
        res.json(foundPhoto);
    } catch (err) {
        res.json( {message: err} );
    }
});

router.post('/', upload.single('sourceimage'), (request, response) => {
    console.log(request.file);
    console.log(process.env.AWS_ACCESS_KEY_ID);
    console.log(process.env.AWS_BUCKET_NAME);

    const params = {
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:request.file.originalname,
        Body:request.file.buffer,
        ACL:"public-read-write", 
        ContentType:"image/jpeg"    
    };

    s3.upload(params,(error, data)=>{
        if(error){
            response.status(500).send({ "err": error })  
        }

    // TODO: FORM VALIDATION
    const photo = new Photo({
        id: uuidv4(),
        source: data.Location,
        tags: request.body.tags
    });

    photo.save()
        .then(result => {
            response.status(200).send({
                id: result.id,
                source: data.Location,
                tags: result.tags,
                dateModified: result.dateModified
            })
        })
        .catch(err => {
            response.send({ message: err });
        });
    });
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedPost = await Photo.updateOne(
            {_id: req.params.id}, { $set: {...req.body, dateModified: Date.now() } } );
        res.json(updatedPost);
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
