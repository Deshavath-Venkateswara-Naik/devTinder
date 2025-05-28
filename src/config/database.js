const mongoose = require('mongoose');

const connectDB = async () => {
try{
    await mongoose.connect('mongodb://localhost:27017/DevTinder', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
}catch(error){
    console.error('MongoDB connection failed:', error);
     process.exit(1); // Exit on failure
}
}


module.exports = connectDB;