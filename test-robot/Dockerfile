# Use a Robot Framework base image
FROM ppodgorsek/robot-framework:latest 

# Set the working directory
WORKDIR /opt/robotframework

# Copy your Robot Framework test files into the container
COPY ./tests /opt/robotframework/tests
COPY ./keywords /opt/robotframework/keywords

# Set environment variables (if needed)
# you can change this to 'firefox' if you prefer
ENV BROWSER=chrome   

