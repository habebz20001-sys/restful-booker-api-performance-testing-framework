Feature: Comprehensive RESTful Booker API Testing Suite

  @happy-path @e2e
  Scenario: Create, Retrieve, Full Update, Partial Update, and Delete a Booking (E2E Lifecycle)
    Given I have a valid authentication token for the API
    When I create a new booking with the following details:
      | firstname | lastname | totalprice | depositpaid | checkin    | checkout   | additionalneeds |
      | Habib     | Ziyad    | 250        | true        | 2026-09-01 | 2026-09-10 | Breakfast       |
    Then the response status code should be 200
    And I should receive a valid booking ID

    When I retrieve the booking details using the booking ID
    Then the response status code should be 200
    And the booking firstname should be "Habib"

    When I update the booking firstname to "Habeballah"
    Then the response status code should be 200
    And the updated booking firstname should be "Habeballah"

    When I partially update the booking additionalneeds to "Late Checkout"
    Then the response status code should be 200
    And the updated booking additionalneeds should be "Late Checkout"

    When I delete the booking
    Then the response status code should be 201

  @negative @security
  Scenario: Reject Update Request Without Valid Auth Token
    Given I have created a temporary booking for testing
    When I attempt to update the booking firstname without an Auth Token
    Then the response status code should be 403

  @negative @not-found
  Scenario: Return 404 Not Found for Non-Existent Booking ID
    When I retrieve booking details for a non-existent ID "999999999"
    Then the response status code should be 404

  @negative @data-validation
  Scenario: Handle Invalid Booking Creation Request
    When I attempt to create a booking with invalid data schema
    Then the response status code should be 400 or 500
