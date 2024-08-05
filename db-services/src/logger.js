const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');

const LOG_DIR = '/db-services/logs'
const LOG_FILE = path.join(LOG_DIR, 'application.log') 

// Create a logger instance
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: () => moment().tz("Europe/Stockholm").format('YYYY-MM-DD HH:mm:ss.SSSS')
        }),
        //format.json() // Log in JSON format
        format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    level: 'error',
    format: format.combine(
        format.timestamp({
            format: () => moment().tz("Europe/Stockholm").format('YYYY-MM-DD HH:mm:ss.SSSS')
        }),
        //format.json() // Log in JSON format
        format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        // Log to a file
        new transports.File({ filename: LOG_FILE }),
        // Optionally, log to the console as well
        new transports.Console()
    ],
});

// Create logs directory if it doesn't exist
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

module.exports = logger;