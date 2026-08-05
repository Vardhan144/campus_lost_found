# Campus Lost & Found Portal

A web application developed using the MERN stack to help students report and find lost items on campus. Users can post details of lost or found items, browse existing reports, and update the status once an item has been returned.

## Features

- User registration and login
- Report lost items
- Report found items
- Upload images while creating a report
- Search and filter items
- Update or delete your own reports
- Mark an item as claimed
- Personal dashboard for managing reports

## Tech Stack

- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (Image Upload)

## Folder Structure

```
campus-lost-found/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── ...
```

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Make sure MongoDB is running and update the required environment variables before starting the application.

## API Overview

| Method | Endpoint                  | Description                       | Auth |
|--------|----------------------------|------------------------------------|------|
| POST   | `/api/auth/register`       | Create account                     | No   |
| POST   | `/api/auth/login`          | Login, returns JWT                 | No   |
| GET    | `/api/auth/me`              | Get current user                   | Yes  |
| GET    | `/api/items`                | List items (filter/search/paginate)| No   |
| GET    | `/api/items/:id`            | Get single item                    | No   |
| POST   | `/api/items`                | Create item report (with image)    | Yes  |
| PUT    | `/api/items/:id`            | Update item (owner/admin)          | Yes  |
| PATCH  | `/api/items/:id/claim`      | Mark item as claimed                | Yes  |
| DELETE | `/api/items/:id`            | Delete item (owner/admin)          | Yes  |
| GET    | `/api/users/me/items`       | Items reported by current user     | Yes  |

## Resume Bullet Points
- Developed a full-stack MERN application for reporting, tracking and managing lost and found items within the campus.
- Built secure JWT authentication, REST APIs, CRUD operations and responsive React interfaces with MongoDB integration.
