const mongoose = require('mongoose');

const {
    Schema,
    model
} = mongoose;

const task = mongoose.Schema({
    _id: {
        type: 'string',
    },
    title: {
        type: 'string',
        unique: true,
    }
});

module.exports = mongoose.model('task', task);