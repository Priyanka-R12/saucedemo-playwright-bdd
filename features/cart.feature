Feature: Cart and Checkout Flow

  Scenario: Sort items and verify
    Given I am logged in as "standard_user" 
    When I sort items by "Name (Z to A)"
    Then the items list should be sorted by name descending
    When I sort items by "Price (low to high)"
    Then the items list should be sorted by price ascending
    When I sort items by "Price (high to low)"
    Then the items list should be sorted by price descending

  Scenario: Add 5 items, remove last 2 and 6th item
    Given I am logged in as "standard_user"
    When I sort items by "Name (A to Z)"
    And I select the first 5 items from the product list
    And I go to the cart
    And I remove the last 2 items from the cart
    And I continue shopping
    And I select 6th item from the product list
    And I go to the cart
    Then the cart should contain the expected items
    When I proceed to checkout

Scenario: Checkout and order the items
  Given I am logged in as "standard_user"
  And I select the first 3 items from the product list
  And I go to the cart
  And I have checkout information
  When I enter first name "West", last name "pac", postal code "40812"
  And I continue checkout
  And I complete checkout
  Then I return to products page
  Then I logout from the application
