import http from 'k6/http';
import { check, sleep } from 'k6';

// 1. Load Profile & Performance Thresholds Setup
export const options = {
  stages: [
    { duration: '10s', target: 10 }, // Ramp-up: 10 virtual users over 10 seconds
    { duration: '20s', target: 10 }, // Stay at 10 users for 20 seconds
    { duration: '5s', target: 0 },   // Ramp-down: back to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests must complete below 1000ms
    http_req_failed: ['rate<0.01'],    // Error rate must be less than 1%
  },
};

const BASE_URL = 'https://restful-booker.herokuapp.com';

export default function () {
  // Scenario 1: Fetch all bookings (GET /booking)
  const getBookingsRes = http.get(`${BASE_URL}/booking`);
  check(getBookingsRes, {
    'Get Bookings status is 200': (r) => r.status === 200,
    'Response time < 800ms': (r) => r.timings.duration < 800,
  });

  sleep(1);

  // Scenario 2: Create a new booking (POST /booking)
  const payload = JSON.stringify({
    firstname: 'Performance',
    lastname: 'Tester',
    totalprice: 200,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-09-01',
      checkout: '2026-09-10',
    },
    additionalneeds: 'k6-Load-Test',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  const createBookingRes = http.post(`${BASE_URL}/booking`, payload, params);
  check(createBookingRes, {
    'Create Booking status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
