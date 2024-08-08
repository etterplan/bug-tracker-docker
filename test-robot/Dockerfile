# Use a Robot Framework base image
FROM ppodgorsek/robot-framework:latest 

# Set the working directory
WORKDIR /opt/robotframework/tests

# Copy your Robot Framework test files into the container
COPY . /opt/robotframework/tests

# Set environment variables (if needed)
# you can change this to 'firefox' if you prefer
ENV BROWSER=chrome   
