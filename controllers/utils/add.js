const db = require('../../schemas/assets');

exports.addTask = async (id, assetname) => {
    const newAsset = new db({
        _id: id,
        asset_name: assetname,
    }, {
        timestamps: true
    });
    let check;
    try {
        check = await db.findOne({
            asset_name: assetname,
        }, {
            _id: 1
        });
    } catch (err) {
        return ({
            message: 'Error making database call',
        });
    }
    if (check != null) {
        return ({
            message: 'This asset already exists',
        });
    }
    try {
        await newAsset.save();
        return ({
            message: 'Asset Added'
        });
    } catch (err) {
        console.log(err);
        return ({
            message: 'Internal Server Error'
        });
    }
}