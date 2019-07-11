const db = require('../../models/user');

exports.register = async (name, username, password, worker_id) => {
    const newUser = new db({
        name,
        user_name: username,
        password,
        worker_id,
        token: "null",
    });
    let check;
    try {
        check = await db.findOne({
            worker_id
        }, {
            user_name: 1
        });
    } catch (err) {
        return {
            message: 'Error making database call'
        };
    }
    try {
        await newUser.save();
        return {
            message: 'User Registered'
        };
    } catch (err) {
        return {
            message: 'Internal Server Error'
        };
    }
};