import { Given, When, Then, Before } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BookingClient } from '../api/bookingClient';

let client: BookingClient;
let currentBookingId: number;
let lastResponse: any;
let currentBookingData: any;

Before(async () => {
  client = new BookingClient();
  await client.init();
});

Given('I have a valid authentication token for the API', async () => {
  const authResponse = await client.authenticate();
  expect(authResponse.status()).toBe(200);
});

Given('I have created a temporary booking for testing', async () => {
  await client.authenticate();
  currentBookingData = {
    firstname: 'Temp',
    lastname: 'User',
    totalprice: 100,
    depositpaid: true,
    bookingdates: { checkin: '2026-10-01', checkout: '2026-10-05' },
    additionalneeds: 'None'
  };
  const res = await client.createBooking(currentBookingData);
  const body = await res.json();
  currentBookingId = body.bookingid;
});

When('I create a new booking with the following details:', async (dataTable) => {
  const row = dataTable.hashes()[0];
  currentBookingData = {
    firstname: row.firstname,
    lastname: row.lastname,
    totalprice: parseInt(row.totalprice),
    depositpaid: row.depositpaid === 'true',
    bookingdates: {
      checkin: row.checkin,
      checkout: row.checkout
    },
    additionalneeds: row.additionalneeds
  };

  lastResponse = await client.createBooking(currentBookingData);
  const body = await lastResponse.json();
  currentBookingId = body.bookingid;
});

Then('the response status code should be {int}', (statusCode: number) => {
  expect(lastResponse.status()).toBe(statusCode);
});

Then('the response status code should be 400 or 500', () => {
  const status = lastResponse.status();
  expect([400, 500]).toContain(status);
});

Then('I should receive a valid booking ID', () => {
  expect(currentBookingId).toBeDefined();
  expect(typeof currentBookingId).toBe('number');
});

When('I retrieve the booking details using the booking ID', async () => {
  lastResponse = await client.getBooking(currentBookingId);
});

When('I retrieve booking details for a non-existent ID {string}', async (invalidId: string) => {
  lastResponse = await client.getBooking(invalidId);
});

Then('the booking firstname should be {string}', async (expectedName: string) => {
  const body = await lastResponse.json();
  expect(body.firstname).toBe(expectedName);
});

When('I update the booking firstname to {string}', async (newName: string) => {
  currentBookingData.firstname = newName;
  lastResponse = await client.updateBooking(currentBookingId, currentBookingData);
});

When('I attempt to update the booking firstname without an Auth Token', async () => {
  const patchData = { firstname: 'UnauthorisedUpdate' };
  lastResponse = await client.partialUpdateBooking(currentBookingId, patchData, false);
});

When('I partially update the booking additionalneeds to {string}', async (newNeed: string) => {
  const patchData = { additionalneeds: newNeed };
  lastResponse = await client.partialUpdateBooking(currentBookingId, patchData, true);
});

Then('the updated booking firstname should be {string}', async (expectedName: string) => {
  const body = await lastResponse.json();
  expect(body.firstname).toBe(expectedName);
});

Then('the updated booking additionalneeds should be {string}', async (expectedNeed: string) => {
  const body = await lastResponse.json();
  expect(body.additionalneeds).toBe(expectedNeed);
});

When('I attempt to create a booking with invalid data schema', async () => {
  const invalidData = { firstname: 12345, totalprice: "invalid_price" };
  lastResponse = await client.createBooking(invalidData);
});

When('I delete the booking', async () => {
  lastResponse = await client.deleteBooking(currentBookingId);
});
