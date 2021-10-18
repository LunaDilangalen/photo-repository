const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
    source: {
        type: String,
        required: true
    },
    
});