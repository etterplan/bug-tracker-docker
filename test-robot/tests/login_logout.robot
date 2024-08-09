*** Settings ***
Library    SeleniumLibrary
Resource    ../keywords/common.robot
Suite Setup    Open Browser Suite
Suite Teardown    Close Browser Suite

*** Variables ***
${AVATAR_IMAGE_XPATH} =    id=radix-:r0:

*** Keywords ***

*** Test Cases ***
Page is up
    Validate head menu

Click Icon And Select Item
    [Documentation]    Test case to click on the avatar image
    Validate head menu
    Sleep    5s
    Click Element    ${AVATAR_IMAGE_XPATH}  # Click the avatar image
