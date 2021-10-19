const { response } = require('express');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const validator = require('validator');

// for uploading files to S3
const multer = require('multer');
const AWS = require('aws-sdk');

const Photo = require('../models/Photo');
const checkTags = require('../util/clean-tags');

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
        res.status(200);
        res.json(photos);
    } catch (err) {
        res.status(500);
        res.json( {message: err} );
    }
});

router.get('/findByTag', async (req, res) => {
    const queryTags = req.body.tags;
    const validQuery = checkTags(queryTags);

    if (validQuery) {
        queryTags.forEach((x, idx, queryTags) => {
            queryTags[idx] = validator.trim(queryTags[idx]);
            queryTags[idx] = queryTags[idx].toLowerCase();
            // queryTags[idx] = validator.escape(queryTags[idx]);
        });

        try {
            console.log(queryTags);
    
            const taggedPhotos = await Photo.find( {tags: {'$in' : queryTags}}, 
                                    {_id: 0, __v: 0} );
            res.status(200);
            res.json(taggedPhotos);
        } catch (err) {
            res.status(500);
            res.json( {message: err} );
        }; 
    } else {
        res.status(400).send('Bad request.');
    }
});

router.get('/findByProductId', async (req, res) => {
    const queryProductId = req.body.productId;

    if (!queryProductId) {
        res.status(400).send('Bad request.');
    }

    try {
        const productPhotos = await Photo.find( {productId: queryProductId}, 
                                {_id: 0, __v: 0} );
        res.status(200);
        res.json(productPhotos);
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

router.delete('/:photoId', async (req, res, next) => {
    const queryId = req.params.photoId;

    if (validator.isUUID(queryId, 4)) {
        try {
            const removedPhoto = await Photo.remove( {_id: req.params.photoId} );
            res.json(removedPhoto);
        } catch (err) {
            res.json( {message: err} );
        }
    } else {
        next();
    }
});

router.use(async (req, res, next) => {
    res.status(404).send({
        status: 404,
        error: 'Not found'
    });
});


module.exports = router;
