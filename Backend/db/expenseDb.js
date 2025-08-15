const mongoose = require('mongoose');

const connectDB = async ()=>
{
    try {
        
         const connect = await mongoose.connect(process.env.MONGO_URI)
           console.log(`✅ MongoDB Connected: ${connect.connection.host}`);

    } catch (error) {

        console.error('❌ MongoDB connection failed:', error.message);
        
    }
}

module.exports = connectDB;
