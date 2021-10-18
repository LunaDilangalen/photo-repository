const mongoose = require('mongoose');
const mongoURI = process.env.DB_LINK

mongoose.connect(mongoURI);

const Photo = mongoose.model('Photo', {
    source: String,
    tags: Array,
    dateModified: String
});

module.exports = function (msg) {
    const img1 = new Photo({
        source: 'dummy_url',
        tags: ['seed', 'data'],
        dateModified: 'today'
    })
    img1.save().then(() => console.log('Photo saved!'));
    
    const img2 = new Photo({
        source: 'photobucket',
        tags: ['seed', 'data'],
        dateModified: 'yesterday'
    })
    img2.save().then(() => console.log('Photo saved!'));
    
    const img3 = new Photo({
        source: 'unsplash',
        tags: ['seed', 'data'],
        dateModified: 'tomorrow'
    })
    img3.save().then(() => console.log('Photo saved!'));

    console.log(msg);
};