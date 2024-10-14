# College Campus Event App

A ReactJS web application designed to streamline the management of college events, including club events, departmental events, workshops, expert talks, and sports activities. This platform helps students and organizers efficiently track event participation, winners, and certificate issuance.
The app is hosted on https://campusevent.vercel.app/

## Table of Contents

- [Problem Statement](#problem-statement)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Problem Statement

There are many events hosted in colleges, including:
- College club events
- Departmental events
- Workshops
- Expert talks
- Sports activities

### Key Challenges:
1. **Lack of event awareness**: Participants often lack information on upcoming events.
2. **No record of participants**: Difficulty in tracking student participation over time.
3. **No record of winners**: Winners’ achievements are not properly documented.
4. **Unidentifiable certificates**: Issued certificates are not linked to any verifiable database.

## Features

- **Event Discovery**: Browse and discover upcoming events on campus.
- **Participant Registration**: Students can easily register for events.
- **Event Winners**: Organizers can log and manage event winners.
- **Certificate Verification**: Issued certificates are stored and can be verified online.
- **Admin Panel**: Allows administrators to manage events, participants, and certificates.

## Tech Stack

- **Frontend**: 
  - ReactJS
  - Redux (or Context API)
  - React Router
  - Tailwind CSS (or other styling options)
  
- **Backend**:
  - Node.js
  - Express
  - MongoDB (with Mongoose)

- **Authentication**:
  - JWT (JSON Web Token)
  - Google OAuth (for Google sign-in)

- **Storage**:
  - Firebase Storage (for image uploads)

## Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/college-event-management.git
    ```
   
2. Navigate to the project directory:
   ```bash
   cd college-event-management
   ```
   
3. Install dependencies for both the client and server:
   ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```
   
4. Set up your environment variables. Create a .env file in the server directory and add the following variables:
```env
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
FIREBASE_API_KEY=<your-firebase-api-key>
FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
FIREBASE_PROJECT_ID=<your-firebase-project-id>
```

5. Start the development servers:

Frontend:
```bash
Copy code
cd client
npm run dev
```
Backend:
```bash
Copy code
cd server
npm run dev
```

6. Open `http://localhost:5173` to view the app in the browser.
   
## Usage
Students: Register for an account, browse events, sign up for participation, and download certificates.
Event Organizers: Manage event details, track participants, and log winners.
Admins: Oversee all events, manage users, and handle certificate verifications.

## Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvement, please submit an issue or a pull request.
