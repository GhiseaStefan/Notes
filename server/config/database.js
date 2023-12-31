const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to the database successfully');
    } catch (err) {
        console.error('Failed to connect to the database:', err);
    }
}

module.exports = connect;