const mongoose = require('mongoose');
const mongoURI = process.env.DB_LINK

mongoose.connect(mongoURI);

const Image = mongoose.model('Image', {
    source: String,
    tags: Array,
    dateModified: String
});

module.exports = function (msg) {
    const img1 = new Image({
        source: 'dummy_url',
        tags: ['seed', 'data'],
        dateModified: 'today'
    })
    img1.save().then(() => console.log('Image saved!'));
    
    const img2 = new Image({
        source: 'photobucket',
        tags: ['seed', 'data'],
        dateModified: 'yesterday'
    })
    img2.save().then(() => console.log('Image saved!'));
    
    const img3 = new Image({
        source: 'unsplash',
        tags: ['seed', 'data'],
        dateModified: 'tomorrow'
    })
    img3.save().then(() => console.log('Image saved!'));

    console.log(msg);
};