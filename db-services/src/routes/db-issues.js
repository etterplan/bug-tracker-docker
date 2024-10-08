const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const logger = require('../logger');

const prisma = new PrismaClient();

router.use(cors());
router.use(express.json());

router.get('/issues/test', async (req, res) => {
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

    logger.info("Successfully processed the /issues/test")
    logger.error("Failed processed the /issues/test")
    res.status(200).json(jsonStruct);
  } catch (error) {
    // Handle any errors and send a 500 status code with an error message
    //console.error('An error occurred:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/issues/assigned_to', async (req, res) => {
  try {
    const { assignedToUserId, assignedToUser } = req.query;

    if (!assignedToUserId || !assignedToUser) {
      throw new Error('Invalid request parameters');
    }

    const where = {};
    //    const where = {status: Statu};
    const include = {};

    const issues = await prisma.issue.findMany({
      where: {
        ...where,
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

router.get('/issues/count', async (req, res) => {
  try {
    const { status, assignedToUserId } = req.query;

    if (!status || !assignedToUserId) {
      res.status(400).json({ error: 'Status and assignedToUserId are required' });
    }

    const count = await prisma.issue.count({
      where: {
        status: status,
        assignedToUserId: assignedToUserId,
      },
    });

    res.status(200).json(count);
  } catch (error) {
    console.error('An error occurred:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/issues/findUniqueId', async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ error: 'Id are required' });
    }

    const issue = await prisma.issue.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json(issue);
  } catch (error) {
    console.error('An error occurred:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/issues/create', async (req, res) => {
  try {
    const { title, description } = req.body; // Use req.body for POST data

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newIssue = await prisma.issue.create({
      data: {
        title,
        description,
      },
    });


    res.status(201).json(newIssue);
  } catch (error) {
    console.error('An error occurred:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/issues/update', async (req, res) => {
  try {
    const { id, position } = req.body; // Use req.body for POST data

    if (!id || !position) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newIssue = await prisma.issue.update({
      where: {
        id: id
      },
      data: {
        position: position
      },
    });

    res.status(201).json(newIssue);
  } catch (error) {
    console.error('An error occurred:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/issues/find_all_issues', async (req, res) => {
  try {
    const { status, userId, searchText, orderBy, page, pageSize } = req.query;

    if (!status || !userId || !searchText || !orderBy || page === undefined || pageSize === undefined) {
      throw new Error('Invalid request parameters');
    }

    const where = { status, assignedToUserId: userId };
    //    const where = {status: Statu};
    const orderByClause = orderBy ? { [orderBy]: req.query.sortOrder || 'asc' } : undefined;

    const issues = await prisma.issue.findMany({
      where: {
        ...where,
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

router.get('/project/findAll', async (req, res) => {
  try {
    const projects = await prisma.project.findMany();

    console.log(projects);
    res.status(200).json(projects);
  } catch (error) {
    console.error('An error occurred:', error.message);
    res.status(500).json({ errro: 'Internal server error' });
  }
});

module.exports = router;