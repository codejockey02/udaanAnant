const db = require('../../schemas/users');

exports.register = async (id, name, password) => {
    const newUser = new db({
        _id: id,
        name,
        password,
        token: "null",
    });
    let check;
    try {
        check = await db.findOne({
            _id: id,
        }, {
            user_name: 1
        });
    } catch (err) {
        console.log(err);
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