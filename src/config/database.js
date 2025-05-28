const mongoose = require('mongoose');

const connectDB = async () => {
try{
    await mongoose.connect('mongodb+srv://deshavathvenkateswaranaik0193:ummE66NM4NClkUuZ@cluster0.kwg4qut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
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