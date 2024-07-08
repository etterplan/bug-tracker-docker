# Use the official Node.js image as a base
FROM node:22-alpine3.19

# Set the working directory in the container
WORKDIR /bug-tracker

# Copy the files to the container
COPY . .

# Start the set-up script, it will start the application.
#CMD ["sh", "./start-up.sh"]

# Wait forever
CMD ["sh", "-c", "trap : TERM INT; sleep infinity & wait"]
