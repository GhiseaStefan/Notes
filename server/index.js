require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connect = require('./config/database');

const folderRoute = require('./routes/folderRoute');
const userRoute = require('./routes/userRoute');

const port = process.env.PORT || 8123;
const app = express();

connect();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

app.use('/folder', folderRoute);
app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});