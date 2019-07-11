const mongoose = require('mongoose');

const {
    Schema,
    model
} = mongoose;

const asset = mongoose.Schema({
    _id: {
        type: 'string',
    },
    category: {
        type: 'string',
    },
    date: {
        type: 'string',
    },
    description: {
        type: 'string',
    },
});

module.exports = mongoose.model('asset', asset);