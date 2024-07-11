#!/usr/bin/env ash

# DEBUG
apk add curl
apk add mysql mysql-client
apk --update add mysql-client mariadb-connector-c
# Connect to database: mysql -h 172.18.0.2 -u root -P 3306 -p

# Install Prisma
npm install prisma

# Install Prisma Client
npm install @prisma/client

# Install cors
#npm install cors

# Install winston
npm install winston

# Install dotenv (.env)
npm install dotenv

# Install express
npm install express

# Install project dependencies
npm install

# Apply new migration to database if necessary
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Install jest (test-framework for JaveScript)
npm install jest supertest
#npm install --save-dev jest @types/jest ts-jest

# Rebuild the server.
#npm run build

# Start the server application
#npm run start-server

# Wait forever
sh -c "trap : TERM INT; sleep infinity & wait"



    [
      {
        id: 1,
        name: 'My project',
        description: 'jfdsklaö\n',
        status: 'NEW',
        createdAt: '2024-07-08T13:29:00.192Z',
        updatedAt: '2024-07-08T13:29:00.192Z',
        boardId: 1
      }
    ]





