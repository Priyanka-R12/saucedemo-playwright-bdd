Feature: Login

  Scenario Outline: Login with valid/invalid users
    Given I open the saucedemo homepage
    When I login with username "<username>" and password "<password>"
    Then the login result should be "<result>"

  Examples:
    | username                | password      | result  |
    | standard_user           | secret_sauce  | success |
    | locked_out_user         | secret_sauce  | locked  |
    | problem_user            | secret_sauce  | success |
    | error_user              | secret_sauce  | success |
    | visual_user             | secret_sauce  | success |
    | wrong_user              | wrong_pass    | invalid |
