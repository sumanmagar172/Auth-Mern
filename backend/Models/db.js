const mongoose = require('mongoose');

const mongoUrl = process.env.MONGODB_CONNECTION;

mongoose.connect(mongoUrl)
.then(() => {
    console.log('MongoDb Connected');
    
}).catch((err) => {
    console.log('MongoDB Connection error', err);
    
})