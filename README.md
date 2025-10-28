# Appointment Booking App

A full-stack appointment booking application with a React frontend and a Node.js/Express backend.

## Features

-   **User Authentication:** Secure user registration, login, and logout functionality.
-   **Role-Based Access Control (RBAC):** Different user roles (`receptionist`, `ceo`, `cto`, `gm`, `cfo`) with specific permissions.
-   **Appointment Management:** Create, view, approve, reject, and cancel appointments.
-   **Priority System:** Assign priority levels to appointments.
-   **Organization Management:** Group users into organizations.
-   **Premium Subscription:** A premium subscription model for organizations to unlock features.
-   **Real-time Notifications:** Push notifications using OneSignal.

## Architecture

The project is a monorepo with two main components:

-   **`client/`**: A React single-page application (SPA) built with Vite. It provides the user interface for interacting with the application.
-   **`api/`**: A Node.js/Express backend that provides a RESTful API for the client. It handles business logic, data storage, and user authentication.

## Tech Stack

**Frontend:**

-   React
-   Vite
-   TypeScript
-   Tailwind CSS
-   shadcn/ui
-   Zustand (for state management)
-   React Router
-   Axios
-   OneSignal

**Backend:**

-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   Express Session
-   Argon2 (for password hashing)
-   Joi (for validation)
-   OneSignal

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   Bun
-   MongoDB

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/hassaammgl/Appointment-app.git
    cd Appointment-app
    ```

2.  **Backend Setup:**

    ```bash
    cd api
    bun install
    ```

    Create a `.env` file in the `api` directory and add the following environment variables:

    ```env
    MONGO_URI="your_mongodb_connection_string"
    SESSION_SECRET="your_session_secret"
    DEVELOPER_SECRET="your_developer_secret"
    ```

3.  **Frontend Setup:**

    ```bash
    cd ../client
    bun install
    ```

    Create a `.env` file in the `client` directory and add the following environment variables:

    ```env
    VITE_API_URL="http://localhost:5500/api"
    ```

### Running the Application

1.  **Start the backend server:**

    ```bash
    cd api
    bun dev
    ```

2.  **Start the frontend development server:**

    ```bash
    cd ../client
    bun dev
    ```

The application will be available at `http://localhost:5173`.

## API Endpoints

### Authentication

-   `POST /api/auth/register`: Register a new user.
-   `POST /api/auth/login`: Log in a user.
-   `POST /api/auth/logout`: Log out a user.
-   `PUT /api/auth/add-user-device-id`: Save a user's OneSignal device ID.

### Meetings

-   `POST /api/meetings/met-req`: Create a new meeting request (receptionist only).
-   `GET /api/meetings/roles`: Get all user roles (receptionist only).
-   `GET /api/meetings/get-all-reqs`: Get all meeting requests.
-   `GET /api/meetings/get-organization`: Get organization details.
-   `GET /api/meetings/get-reqs-by-roles/:id`: Get meeting requests for a specific role.
-   `PUT /api/meetings/approve-req/:id`: Approve a meeting request.
-   `PUT /api/meetings/reject-req/:id`: Reject a meeting request.
-   `PUT /api/meetings/update-priority/:id`: Update the priority of a meeting request.
-   `DELETE /api/meetings/cancel-req/:id`: Cancel a meeting request (receptionist only).
-   `POST /api/meetings/renew/:id/org`: Renew an organization's premium subscription.

## License

This project is licensed under the ISC License.