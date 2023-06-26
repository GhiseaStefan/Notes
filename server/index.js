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

// Serve static assets from the 'client/build' directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all route to serve the React application
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const fs = require('fs');

function printDirectories(directoryPath, indent = '') {
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            console.log(indent + filePath);
            printDirectories(filePath, indent + '  ');
        }
    }
}

// Usage example
const rootFolder = path.resolve(process.cwd());
console.log('Root folder:', rootFolder);
console.log('Directories:');
printDirectories(rootFolder);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
