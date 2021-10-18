const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
    source: String,
    tags: Array,
    dateModified: Date.now
});

module.exports = mongoose.model('Photo', PhotoSchema);
