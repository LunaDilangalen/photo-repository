const mongoose = require('mongoose');
const mongoURI = process.env.DB_LINK

const Photo = require('../models/Photo');

mongoose.connect(mongoURI);

module.exports = function (msg) {
    console.log(msg);
    
    const img1 = new Photo({
        source: 'dummy_url',
        tags: ['seed', 'data'],
        dateModified: Date.now()
    });
    img1.save().then(() => console.log('Photo saved!'));
    
    const img2 = new Photo({
        source: 'photobucket',
        tags: ['seed', 'data'],
        dateModified: Date.now()
    });
    img2.save().then(() => console.log('Photo saved!'));
    
    const img3 = new Photo({
        source: 'unsplash',
        tags: ['seed', 'data'],
        dateModified: Date.now()
    });
    img3.save().then(() => console.log('Photo saved!'));
};