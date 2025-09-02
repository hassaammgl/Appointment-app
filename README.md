# Appointment Booking App

A full-stack appointment booking application with a React frontend and a Node.js/Express backend.

## Features

-   User authentication (registration, login, logout)
-   Role-based access control (RBAC) for different user types (receptionist, ceo, cto, gm, cfo)
-   Appointment scheduling and management
-   Premium subscription feature for organizations
-   Real-time notifications with OneSignal

## Technologies Used

**Frontend:**

-   React
-   Vite
-   TypeScript
-   Tailwind CSS
-   Radix UI
-   Zustand (for state management)
-   Axios (for API communication)
-   OneSignal (for push notifications)

**Backend:**

-   Node.js
-   Express
-   TypeScript
-   MongoDB
-   Mongoose
-   Express Session (for session management)
-   Argon2 (for password hashing)
-   JWT (for token-based authentication)

## Setup

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   MongoDB

### Backend Setup

1.  Navigate to the `api` directory:

    ```bash
    cd api
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Create a `.env` file by copying the `example.env` file:

    ```bash
    cp example.env .env
    ```

4.  Update the `.env` file with your environment variables:

    -   `MONGO_URI`: Your MongoDB connection string
    -   `SESSION_SECRET`: A secret string for session management
    -   `DEVELOPER_SECRET`: A secret string for developer-related actions

5.  Start the development server:

    ```bash
    npm run dev
    ```

### Frontend Setup

1.  Navigate to the `client` directory:

    ```bash
    cd client
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:

    ```bash
    npm run dev
    ```

## API Endpoints

| Method | Endpoint                             | Description                                  | Roles                           |
| ------ | ------------------------------------ | -------------------------------------------- | ------------------------------- |
| POST   | /api/auth/register                   | Register a new user                          | All                             |
| POST   | /api/auth/login                      | Login a user                                 | All                             |
| POST   | /api/auth/logout                     | Logout a user                                | Authenticated                   |
| GET    | /api/protected/roles                 | Get all roles                                | receptionist                    |
| POST   | /api/protected/met-req               | Create a meeting request                     | receptionist                    |
| GET    | /api/protected/get-all-reqs          | Get all meeting requests                     | receptionist, ceo, cfo, cto, gm |
| DELETE | /api/protected/cancel-req/:id        | Cancel a meeting request                     | receptionist                    |
| PUT    | /api/protected/approve-req/:id       | Approve a meeting request                    | ceo, cfo, cto, gm               |
| PUT    | /api/protected/reject-req/:id        | Reject a meeting request                     | ceo, cfo, cto, gm               |
| PUT    | /api/protected/update-priority/:id   | Update the priority of a meeting request     | ceo, cfo, cto, gm               |
| GET    | /api/protected/get-reqs-by-roles/:id | Get meeting requests by role with pagination | ceo, cfo, cto, gm               |
| GET    | /api/protected/get-organization      | Get organization details                     | receptionist, ceo, cfo, cto, gm |
| POST   | /api/protected/renew/:id/org         | Renew organization's premium subscription    | Authenticated                   |



<!-- 
hassaammgl
oIJSUhDhxX9DXr0U
mongodb+srv://hassaammgl:oIJSUhDhxX9DXr0U@cluster0.rmlp1aw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
 -->