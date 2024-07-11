const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/issues/test', async (req, res) => {
  try {
    const { searchParams } = req.body;
    if (!searchParams) {
      return res.status(400).json({ message: 'Missing searchParams in request body' });
    }

    const { status } = searchParams;

    console.log(searchParams); // DEBUG

    let jsonStruct = {
      "Hello": "World"
    }

    res.json(jsonStruct);
  } catch (error) {
    // Handle any errors and send a 500 status code with an error message
    console.error('An error occurred:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/issues/find_all_issues', async (req, res) => {
  try {
    const { searchParams } = req.body;
    const { status, userId, searchText, orderBy, page, pageSize } = searchParams;

    console.log(searchParams); // DEBUG

    const where = { status, assignedToUserId: userId };
    const orderByClause = orderBy ? { [orderBy]: searchParams.sortOrder || 'asc' } : undefined;

    console.log("Search for ", searchText);
    //const issues = await prisma.issue.findMany();
    const issues = await prisma.issue.findMany({
      where: {
        ...where,
        title: {
          contains: searchText.trim(),
        },
      },
      orderBy: orderByClause,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    console.log(issues);
    res.json(issues);
  } catch (error) {
    // Handle any errors and send a 500 status code with an error message
    console.error('An error occurred:', error.message);
    res.status(500).json({ error: 'Internal server error' });
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
