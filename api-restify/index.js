const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config'); //create a config file if not found in the same directory

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
    mongoose.connect(
        config.MONGODB_URI, {
            useNewUrlParser: true
        }
    );
});

const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {
    require('./routes/users')(server);
    console.log(`server started on port ${config.PORT}`);
});