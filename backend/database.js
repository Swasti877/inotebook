const mongoose = require('mongoose');
const mongooseURI = 'mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const connectToMongoose = () => {
    mongoose.connect(mongooseURI, () => {
        console.log("Connected to Mongoose")
    })
}

module.exports = connectToMongoose;