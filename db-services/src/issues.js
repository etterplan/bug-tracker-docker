const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: '/db-services/issues.log', level: 'info' }), // Log errors to a file
  ],  
});

function logError(message, error) {
  logger.info({message, error});
}

app.use(cors());
app.use(express.json());

app.get('/api/issues/test', async (req, res) => {
  try {
    const { searchParams } = req.body;
    if (!searchParams) {
      return res.status(400).json({ message: 'Missing searchParams in request body' });
    }

    const { status } = searchParams;

    //console.log(searchParams); // DEBUG

    let jsonStruct = {
      "Hello": "World"
    }

    res.json(jsonStruct);
  } catch (error) {
    // Handle any errors and send a 500 status code with an error message
    //console.error('An error occurred:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/issues/find_all_issues', async (req, res) => {
  try {
    const { status, userId, searchText, orderBy, page, pageSize } = req.query;

    if (!status || !userId || !searchText || !orderBy || page === undefined || pageSize === undefined) {
      throw new Error('Invalid request parameters');
    }

    const where = { status, assignedToUserId: userId };
    const orderByClause = orderBy ? { [orderBy]: req.query.sortOrder || 'asc' } : undefined;

    const issues = await prisma.issue.findMany({
      where: {
//        ...where,
        title: {
          contains: searchText.trim(),
        },
      },
      //orderBy: orderByClause,
      //skip: (page - 1) * pageSize,
      //take: pageSize,
    });

    res.status(200).json(issues);
  } catch (error) {
    console.error('An error occurred:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/project/findAll', async (req, res) => {
  try {
    const projects = await prisma.project.findMany();

    console.log(projects);
    res.status(200).json(projects);
  } catch (error) {
    console.error('An error occurred:', error.message);
    res.status(500).json({errro: 'Internal server error'});
  }
});

const startServer = () =>
  new Promise((resolve, reject) => {
    const server = app.listen(PORT, (err) => {
      if (err) {
        reject(err);
      }
      console.log(`Server running on port ${PORT}`);
      resolve(server);
    });
  });

module.exports = { app, startServer };
