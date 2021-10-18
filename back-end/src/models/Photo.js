const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
    source: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    dateModified: {
        type: Date,
        default: Date.now(),
        required:true
    }
});

module.exports = mongoose.model('Photo', PhotoSchema);