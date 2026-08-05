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

## API Endpoints

### Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

### Items

- GET `/api/items`
- GET `/api/items/:id`
- POST `/api/items`
- PUT `/api/items/:id`
- PATCH `/api/items/:id/claim`
- DELETE `/api/items/:id`

### User

- GET `/api/users/me/items`

## Future Improvements

- Email notifications
- Admin panel
- Chat between finder and owner
- QR code support for reported items
- Better search and filtering

## Author

Developed as a college project using the MERN stack.