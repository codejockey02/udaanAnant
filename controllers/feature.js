const express = require('express');

const taskModel = require('../schemas/task');
const assetModel = require('../schemas/assets');
const userModel = require('../schemas/users');
const assign = require('../schemas/allocatedTasks');

const addAst = require('./utils/add');

const router = new express.Router();

router.post('/addasset', async (req, res) => {
    const {
        assetname,
        id
    } = req.body;
    addAst.addTask(id, assetname)
        .then(result => res.json({
            message: result.message
        }))
        .catch(() => res.json({
            message: 'Unexpected error occured'
        }));
});

router.post('/addtask', async (req, res) => {
    const {
        taskname,
        id
    } = req.body;
    const newTask = new taskModel({
        _id: id,
        task_name: taskname,
    }, {
        timestamps: true
    });
    let check;
    try {
        check = await taskModel.findOne({
            task_name: taskname,
        }, {
            _id: 1
        });
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'Error making database call',
        });
    }
    if (check != null) {
        return res.json({
            message: 'This task already exists',
        });
    }
    try {
        await newTask.save();
        return res.json({
            message: 'Task Added'
        });
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'Internal Server Error'
        });
    }
});

router.post('/deleteasset', async (req, res) => {
    const {
        assetid
    } = req.body;
    assetModel.deleteOne({
            _id: assetid
        })
        .then(() => res.json({
            message: 'Asset Deleted'
        }))
        .catch((err) => res.json({
            message: 'Internal Error'
        }));
});

router.post('/deletetask', async (req, res) => {
    const {
        taskid
    } = req.body;
    taskModel.deleteOne({
            _id: taskid
        })
        .then(() => res.json({
            message: 'Task Deleted'
        }))
        .catch((err) => res.json({
            message: 'Internal Error'
        }));
});

router.post('/deleteworker', async (req, res) => {
    const {
        workerid
    } = req.body;
    userModel.deleteOne({
            _id: workerid
        })
        .then(() => res.json({
            message: 'Worker Deleted'
        }))
        .catch((err) => res.json({
            message: 'Internal Error'
        }));
});

router.get('/allassets', async (req, res) => {
    const assets = assetModel.find();
    res.json(assets);
});

router.get('/mytask', async (req, res) => {
    const {
        workerid
    } = req.body;
    const result = await assign.find({
        worker_id: workerid
    });
    res.json(result);
});

module.exports = router;