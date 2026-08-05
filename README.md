# Campus Lost & Found Portal

A full-stack **MERN** (MongoDB, Express, React, Node.js) application for reporting,
tracking, and managing lost and found items within a campus.

## Features
- 🔐 Secure JWT-based authentication (register/login)
- 📝 Report lost or found items with photo upload
- 🔍 Browse/search/filter items by status, category, and keyword
- ✅ Claim items and mark them resolved
- 👤 Personal dashboard of items you've reported
- 🌐 REST API with full CRUD operations
- 📱 Responsive React front end

## Tech Stack
React.js • Node.js • Express.js • MongoDB (Mongoose) • JWT • Multer

## Project Structure
```
campus-lost-found/
├── backend/
│   ├── models/          # User.js, Item.js (Mongoose schemas)
│   ├── routes/          # authRoutes, itemRoutes, userRoutes
│   ├── middleware/       # JWT auth middleware
│   ├── uploads/          # Uploaded item images
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/           # Axios instance with JWT interceptor
    │   ├── components/     # Navbar, ItemCard, PrivateRoute
    │   ├── context/        # AuthContext (global auth state)
    │   ├── pages/          # Home, Login, Register, ReportItem, ItemDetail, Dashboard
    │   ├── App.js / App.css
    │   └── index.js
    ├── package.json
    └── .env.example
```

## Setup & Run

### 1. Backend
```bash
cd backend
cp .env.example .env      # then edit MONGO_URI / JWT_SECRET as needed
npm install
npm run dev                # starts on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm start                  # starts on http://localhost:3000
```

> Requires a running MongoDB instance (local or Atlas) — set `MONGO_URI` accordingly.

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
