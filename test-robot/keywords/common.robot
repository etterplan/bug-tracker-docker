*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${SERVER}    http://172.18.0.4:3000/issues

*** Keywords ***
Open Browser Suite
    Log    Opening the browser
    Open Browser    ${SERVER}    chrome
    
Close Browser Suite
    Log    Closing the browser
    [Teardown]    Close Browser

Validate head menu
    Page Should Contain    Dashboard
    Page Should Contain    Projects
    Page Should Contain    Issues

Check Page Title
    [Arguments]    ${expected_title}
    Title Should Be    ${expected_title}
