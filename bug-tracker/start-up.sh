#!/usr/bin/env ash

# DEBUG
apk add curl
apk add mysql mysql-client
apk --update add mysql-client mariadb-connector-c
# Connect to database: mysql -h 172.18.0.2 -u root -P 3306 -p

# Install Express
npm install express

# Install Axios
npm install axios

# Install project dependencies
npm install

# npm run dev
npm run dev

# Rebuild the server.
#npm run build

# Start the server application
#npm start

# Wait forever
sh -c "trap : TERM INT; sleep infinity & wait"
