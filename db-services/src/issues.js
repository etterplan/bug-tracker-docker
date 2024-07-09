const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/issues', async (req, res) => {
  const { searchParams } = req.body;
  const { status, userId, searchText, orderBy, page, pageSize } = searchParams;

  const where = { status, assignedToUserId: userId };
  const orderByClause = orderBy ? { [orderBy]: searchParams.sortOrder || 'asc' } : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      ...where,
      title: {
        contains: searchText,
      },
    },
    orderBy: orderByClause,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  res.json(issues);
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
