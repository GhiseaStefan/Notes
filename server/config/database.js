const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Connected to the database successfully');
    } catch (err) {
        console.error('Failed to connect to the database:', err);
    }
};

module.exports = connect;