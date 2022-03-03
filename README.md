# _Flyweis Interview Problem_

## API Documentation

---

### Overview

**This API contains two parent routes**

- /auth
- /courses

All the responses are in JSON format.

---

---

### Specific API Routes with functionality

1. Authentication related routes

- /auth/login

  - Request Body:
    - email
    - password
  - On success Returns:
    - user
    - token,
    - message: "Login Success"
  - On failure Returns:

    - Bad Request with Error code 400

  - Example Success Response:

    - "user":

      - "\_id": "6220d7eb7c9e4996ee683128",
      - "name": "Test",
      - "age": 0,
      - "email": "web@test.com",
      - "createdAt": "2022-03-03T14:59:55.682Z",
      - "updatedAt": "2022-03-03T15:16:53.530Z",
      - "\_\_v": 5

    - "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjIwZDdlYjdjOWU0OTk2ZWU2ODMxMjgiLCJpYXQiOjE2NDYzMjA2MTN9.sK274T1RmSxkNxBfcE4iwK_S73fpLcKMMdZnEkNFt0M"

    - "message": "Login Success"

---

- /auth/forgot-password
  - Request Body:
    - email
  - On success Returns:
    - "message": "Your password reset link has been sent to your email."
  - On failure Returns:
    - Bad Request with Error code 400
      - message: "Account not found",

---

- /auth/verify-otp
  - Request Body
    - email
    - otp
  - On Success Returns:
    - message: "OTP verification success",
  - On failure Returns:
    - Bad Request with Error code 400
      - message: "Account not found",

---

2. Course related routes

- /courses/all-courses

  - On Success Returns:
    - Array of courses,
  - On failure Returns:
    - Service Unavailable with Error code 500
      - error: "Something went wrong",

---

- /courses/enroll
  - Request requires a bearer token to identify the user. (Bearer token is handed over to the user while signup or login)
  - On Success Returns:
    - message: "You are successfully enrolled.",
  - On failure Returns:
    - Bad Request with Error code 400
      - error: "Either payment is not processed or Course ID is incorrect"

---

## Extras

- /auth/signup

  - Request Body:

    - "email": "xyz@flyweis.technology"
    - "password": "flyweis.tech"
    - "name": "Cactus"

  - On Success Returns:

    - user
    - token

  - On failure Returns:

    - Bad Request with Error code 400

  - Example Request Body:

    - "email": "xyz@flyweis.technology"
    - "password": "flyweis.tech"
    - "name": "Cactus"

  - Example Success Response

    - "user":

      - "\_id": "6220d7eb7c9e4996ee683128",
      - "name": "Test",
      - "age": 0,
      - "email": "web@test.com",
      - "createdAt": "2022-03-03T14:59:55.682Z",
      - "updatedAt": "2022-03-03T15:16:53.530Z",
      - "\_\_v": 5

    - "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjIwZDdlYjdjOWU0OTk2ZWU2ODMxMjgiLCJpYXQiOjE2NDYzMjA2MTN9.sK274T1RmSxkNxBfcE4iwK_S73fpLcKMMdZnEkNFt0M"
