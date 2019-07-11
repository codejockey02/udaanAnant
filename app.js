const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const env = require('./env');

env();
const UserController = require('./controllers/user');
const FeatureController = require('./controllers/feature');
const TaskController = require('./controllers/assignTask');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', UserController, FeatureController, TaskController);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
}).then(() => {
    process.stdout.write('Connected to mongodb');
}).catch((err) => {
    process.stderr.write(err.stack.toString());
});

app.listen(process.env.PORT);