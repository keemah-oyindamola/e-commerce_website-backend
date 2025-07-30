const mongoose = require("mongoose")

const connectdata_base = ()=>{
    const mongodb_uri = process.env.MONGODB_URI
    try {
        const connected = mongoose.connect(mongodb_uri)
        if (connected) {
            console.log("Database connected");
        }else{
            console.log("Cant connect to database");
        }
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = connectdata_base