const config = {
    app: {
        port: process.env.PORT || 5001,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/management"
    },
};


module.exports = config;