const express = require('express');
const randomgen = require('randomstring');


const user = require('../schemas/users');

const router = new express.Router();

router.post('/add-worker', async (req, res) => {
    const {
        id,
        username,
        password,
    } = req.body;
    register.register(id, username, password)
        .then(result => res.json({
            message: result.message
        }))
        .catch(() => res.json({
            message: 'Unexpected error occured'
        }));
});

router.post('/login', async (req, res) => {
    const {
        id,
        password,
    } = req.body;
    let usercheck;
    try {
        usercheck = await user.findOne({
            _id,
        }, {
            password: 1,
        });
    } catch (err) {
        return res.json({
            message: 'Error making database call',
        });
    }
    if (usercheck == null) {
        return res.json({
            message: 'Worker does not exist',
        });
    }
    if (usercheck.password.toString() !== password.toString()) {
        return res.json({
            message: 'Incorrect username/password',
        });
    }
    const token = randomgen.generate();
    await user.updateOne({
        _id,
    }, {
        $set: {
            token,
        }
    });
    return res.json({
        message: token,
    });
});

module.exports = router;