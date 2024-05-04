const mongoose = require('mongoose');

const connect = (connectionURI) => {
    return mongoose.connect(connectionURI, { useNewUrlParser: true });
};

module.exports = connect;
