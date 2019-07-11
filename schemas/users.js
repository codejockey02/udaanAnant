const mongoose = require('mongoose');

const {
    Schema,
    model
} = mongoose;

const user = mongoose.Schema({
    _id: {
        type: 'string',
    },
    name: {
        type: 'string',
    },
    password: {
        type: 'string'
    },
    role: {
        type: 'string',
        default: 'WORKER',
    },
});

module.exports = mongoose.model('user', user);