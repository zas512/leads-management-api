# Leads Management Backend

This is the backend for the Leads Management application, built with Node.js, Express, and MongoDB. It provides RESTful API endpoints for managing users and leads.

## Features

- User registration and login with JWT authentication
- CRUD operations for leads
- Middleware for token verification
- Environment configuration with dotenv

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/leads-management-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd leads-management-backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   JWT_SECRET=your_jwt_secret
   DB_URL=your_mongodb_connection_string
   PORT=3000
   NODE_ENV=development
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

   For development, you can use:

   ```bash
   npm run dev
   ```

2. The server will run on the port specified in the `.env` file.

## API Endpoints

### Users

- **Register User**

  - **POST** `/users/register`
  - Request body: `{ "email": "user@example.com", "password": "password123" }`

- **Login User**

  - **POST** `/users/login`
  - Request body: `{ "email": "user@example.com", "password": "password123" }`

### Leads

- **Get Leads**

  - **GET** `/leads/get`
  - Requires authentication

- **Create Lead**

  - **POST** `/leads/create`
  - Requires authentication
  - Request body: `{ "name": "Lead Name", "email": "lead@example.com", "phone": "1234567890", "status": "New" }`

- **Update Lead**

  - **PUT** `/leads/update`
  - Requires authentication
  - Request body: `{ "_id": "leadId", "name": "Updated Name", "email": "updated@example.com", "phone": "0987654321", "status": "Qualified" }`

- **Delete Lead**

  - **DELETE** `/leads/delete`
  - Requires authentication
  - Query parameter: `?id=leadId`

- **Get Lead Stats**

  - **GET** `/leads/stats`
  - Requires authentication

## Middleware

- **Token Verification**

  - Located in `middleware/verifyToken.js`
  - Verifies JWT token from cookies

## Deployment

This project is configured to be deployed on Vercel. Ensure that your `vercel.json` is correctly set up.

## License

This project is licensed under the MIT License.
