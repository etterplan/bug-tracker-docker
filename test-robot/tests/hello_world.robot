*** Settings ***
Resource    ../keywords/common.robot
#Library    SeleniumLibrary
Suite Setup    Open Browser Suite
Suite Teardown    Close Browser Suite

*** Test Cases ***
Test1
    #Sleep    4000
    Validate head menu
Check that correct page is loaded
    Check Page Title    Issue Tracker - Issue List