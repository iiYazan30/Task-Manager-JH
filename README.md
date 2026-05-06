# TaskFlow - Simple Task Manager System

TaskFlow is a full-stack task manager web application built for the JH Development Task Proposal.

The app allows users to create tasks, view all tasks, update task status between Pending and Done, delete tasks, search tasks, and filter tasks by status or priority.

---

## Features

- Create a new task
- View all tasks
- Mark tasks as Done or Pending
- Delete tasks
- Search tasks by title, description, or assigned person
- Filter tasks by status: All, Pending, Done
- Filter tasks by priority: Low, Medium, High
- Dashboard statistics for total, pending, completed, and high priority tasks
- Loading, error, and empty states
- Responsive user interface

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS
- dotenv

### Frontend
- React
- Vite
- Plain CSS
- Fetch API

---

## Project Structure

```text
Task-Manager-JH/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
│
├── .gitignore
└── README.md
API Endpoints

Base URL:

http://localhost:5000/api/tasks
Method	Endpoint	Description
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create a new task
PATCH	/api/tasks/:id/status	Toggle task status
DELETE	/api/tasks/:id	Delete a task

Example task body:

{
  "title": "Finish frontend integration",
  "description": "Connect React app with backend API",
  "assignedTo": "Yazan",
  "priority": "medium"
}
Setup Instructions
1. Clone the repository
git clone https://github.com/iiYazan30/Task-Manager-JH.git
cd Task-Manager-JH
Backend Setup
cd backend
npm install

Create a .env file inside the backend folder:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Run the backend:

npm run dev

Backend runs on:

http://localhost:5000
Frontend Setup

Open another terminal from the project root:

cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
How to Use
Start the backend server.
Start the frontend server.
Open http://localhost:5173.
Add, update, delete, search, and filter tasks.
Notes
The backend must be running before using the frontend.
The .env file is ignored by Git and should not be uploaded.
The project does not include login or user roles because the required task is a simple task manager system.

Author
Yazan Mallah