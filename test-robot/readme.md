docker run \
    --name test-robot \
    -v "$(pwd)/reports":/opt/robotframework/reports:Z \
    -v "$(pwd)/tests":/opt/robotframework/tests:Z \
    ppodgorsek/robot-framework:latest
