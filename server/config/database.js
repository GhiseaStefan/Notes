const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const MAX_RETRIES = 5;
const RETRY_INTERVAL_MS = 5000;

const connectWithRetry = async (retryCount) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to the database successfully');
    } catch (err) {
        console.error(`Failed to connect to the database. Retrying in ${RETRY_INTERVAL_MS / 1000} seconds...`);

        if (retryCount >= MAX_RETRIES) {
            console.error('Failed to connect to the database after multiple retries.', err);
            return;
        }

        setTimeout(() => connectWithRetry(retryCount + 1), Math.pow(2, retryCount) * RETRY_INTERVAL_MS);
    }
};

const connect = async () => {
    try {
        await connectWithRetry(0);
    } catch (err) {
        console.error('Failed to connect to the database.', err);
    }
};

module.exports = connect;