*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${SERVER}    http://172.18.0.4:3000

*** Test Cases ***
Open React App
#    Sleep    400s
    Open Browser    ${SERVER}    chrome
    Page Should Contain    Dashboard
    Page Should Contain    Projects
    Page Should Contain    Issues
    [Teardown]    Close Browser
