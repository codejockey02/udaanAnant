module.exports = () => {
    if (process.env.PORT === undefined) {
        process.env.PORT = 3000;
    }
    if (process.env.MONGO_URL === undefined) {
        process.env.MONGO_URL = 'mongodb://admin:admin123@ds349857.mlab.com:49857/udaan';
    }
};