require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connect = require('./config/database');

const folderRoute = require('./routes/folderRoute');
const userRoute = require('./routes/userRoute');

const port = process.env.PORT || 8123;
const app = express();

connect();

app.use(express.json());
const corsOptions = { origin: process.env.NODE_ENV === 'production' ? 'https://notesclient.onrender.com' : 'http://localhost:3000' };
app.use(cors(corsOptions));

app.use('/folder', folderRoute);
app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV === 'production' ? 'production' : 'development'}`);
});