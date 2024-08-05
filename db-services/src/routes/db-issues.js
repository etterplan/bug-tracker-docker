const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

//const { app } = require('./db-services');
const prisma = new PrismaClient();


router.get('/issues/count', async (req, res) => {
    try {
//      const { status, assignedToUserId } = req.query;
  
      // if (!status || !assignedToUserId) {
      //   res.status(400).json({ error: 'Status and assignedToUserId are required' });
      // }

      const count = {status: "HELLO WORLD"};
      // const count = await prisma.issue.count({
      //   where: {
      //     status: status,
      //     assignedToUserId: assignedToUserId,
      //   },
      // });
  
      res.status(200).json(count);
    } catch (error) {
      console.error('An error occurred:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;