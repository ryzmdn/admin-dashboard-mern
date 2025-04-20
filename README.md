# MERN Auth Boilerplate

**MERN Auth Boilerplate** is a starter project for building authentication and authorization systems using the **MERN Stack** (MongoDB, Express, React, Node.js). This boilerplate is designed to help developers quickly kickstart their applications with robust user security and best practices in place.

## Dashboard image

![dashboard](https://github.com/user-attachments/assets/65703573-9aba-4b99-be5d-e1e7dfce3f35)

## Features

- **User Registration & Login**
- **JWT Authentication** with access & refresh tokens
- **Role-Based Authorization** (Admin/User)
- **Email Verification** (optional and extendable)
- **Refresh Token** flow
- **Protected Routes** (Public/Private)
- **Modular Project Structure** for backend and frontend
- Ready for testing and further development

## Project Structure

```plaintext
admin-dashboard-mern/
│
├── client/                
│   ├── public/
│   └── src/
│       ├── components/
│       └── pages/
|           └── auth/
│
├── controllers/
├── middleware/
├── models/
├── routes/
│
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

## Installation

To run the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/ryzmdn/admin-dashboard-mern.git

# Navigate into the project directory
cd admin-dashboard-mern

# Install server dependencies
npm install

# Change directory to client folder
cd client

# Install client dependencies
npm install

# Run server
npm run dev

# Return to the original directory
cd ..

# Copy the environment config file
cp .env.example .env

# Then fill in your own values (see Configuration section)

# Run server
node server.js
# or
nodemon server.js
```

## Configuration

Create a `.env` file in the root directory and add the following:

```env
PORT=4000
MONGO_URI=
JWT_SECRET=

USER_EMAIL=
USER_PASSWORD=
```

## Usage

1. Run `npm run dev` to start client folder.
2. Run `node server.js` or `nodemon server.js` to start main folder.
3. Open your browser at `http://localhost:5173`.
4. Register a new user or login.
5. Test route protection, logout, and role-based access.

## Technologies Used

- **MongoDB** - NoSQL database
- **Express.js** - Backend web framework
- **React.js** - Frontend user interface
- **Tailwind CSS** - CSS framework
- **Node.js** - Backend runtime environment
- **JWT (jsonwebtoken)** - Token-based authentication
- **Axios** - HTTP client for API calls
- **bcryptjs** - Password hashing
- **dotenv** - Environment variable manager
- **React Router** - Page navigation
- **CORS** - Web security mechanisms
- **nodemailer** - Send email from server

## API Endpoints Overview

| Endpoint                    | Method | Description                 |
|-----------------------------|--------|-----------------------------|
| `/api/auth/user`            | GET    | Get user data               |
| `/api/auth/register`        | POST   | Register a new user         |
| `/api/auth/login`           | POST   | Log in to the user account  |
| `/api/auth/forgot-password` | POST   | Send email forgot password  |
| `/api/auth/verify-code`     | POST   | Verify code from email      |
| `/api/auth/reset-password`  | POST   | Update new password         |
| `/api/auth/update`          | PUT    | Update a user account       |
| `/api/user/delete`          | DELETE | Delete a user account       |

## License

This project is licensed under the [MIT License](./LICENSE). You are free to use, modify, and distribute it with attribution.
