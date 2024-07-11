const { app, startServer } = require('./issues'); // Make sure to replace 'your_file_name' with the actual file name

// Start the server
startServer().then(() => {
  console.log("Server started successfully.");
}).catch((error) => {
  console.error("Error starting the server:", error);
});
