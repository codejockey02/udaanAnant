const mongoose = require('mongoose');


const allocatedTasks = mongoose.Schema({
    taskId: {
        type: 'string',
    },
    assetId: {
        type: 'string',
    },
    workerId: {
        type: 'string',
    },
    timeOfAllocation: {
        type: 'string',
    },
    taskToBePerformedBy: {
        type: 'string',
    },
});

module.exports = mongoose.model('allocatedTasks', allocatedTasks);