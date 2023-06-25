require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connect = require('./config/database');
const path = require('path');

const folderRoute = require('./routes/folderRoute');
const userRoute = require('./routes/userRoute');

const port = process.env.PORT || 8123;
const app = express();

connect();

app.use(express.json());
app.use(cors({ origin: 'https://notesclient.onrender.com', credentials: true }));
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

app.use('/folder', folderRoute);
app.use('/user', userRoute);

// Serve static assets (e.g., JS, CSS, images) from the 'client/build' directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all route to serve the React application
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});