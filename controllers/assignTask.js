const express = require('express');

const assignTask = require('../schemas/allocatedTasks');

const router = new express.Router();

router.post('/allocate-task', async (req, res) => {
    const {
        asset_id,
        task_id,
        worker_id,
        timeOfAllocation,
        taskToBePerformedBy,
    } = req.body;

    const newAssign = new assign({
        asset_id,
        task_id,
        worker_id,
        time_of_allocation: timeOfAllocation,
        task_to_be_performed_by: taskToBePerformedBy,
    })
    try {
        await newAssign.save();
        return res.json({
            message: 'Task Assigned'
        });
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'Internal Server Error'
        });
    }

});

module.exports = router;