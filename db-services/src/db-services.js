const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

// Add require();
const dbIssues = require('./routes/db-issues');

const app = express();
const prisma = new PrismaClient();
const DEFAULT_PORT = 5000;

app.use(cors());
app.use(express.json());

// Use the routes 
app.use('/api', dbIssues);

const startServer = (port = DEFAULT_PORT) =>
    new Promise((resolve, reject) => {
        const server = app.listen(port, (err) => {
            if (err) {
                reject(err);
            }
            console.log(`Server running on port ${port}`);
            resolve(server);
        });
    });


// Start the server
startServer().then(() => {
    console.log("Server started successfully.");
}).catch((error) => {
    console.error("Error starting the server:", error);
});

module.exports = { app, startServer };
