const mongoose = require("mongoose");

const connecToDB = async () => {
    mongoose.set("strictQuery", true);
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "auth",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Mongodb connected");
    } catch (error) {
        console.log("error :" + error);
    }
}


module.exports = connecToDB;