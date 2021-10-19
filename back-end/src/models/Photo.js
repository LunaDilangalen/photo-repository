const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
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
