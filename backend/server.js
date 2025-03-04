const app = require("./app");
const config = require("./app/config");
const Mongoose = require("./app/utils/mongoose.util");

async function startServer() {
    try {
        await Mongoose.connect(config.db.uri);
        console.log("Connected to the database!");

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        })
    }catch (error){
        console.log("Cannot connected to the database!", error);
        process.exit();
    }
}

startServer();