# ✅ Todo App with Auth

A full-stack Todo application with secure login, personal todo tracking, and persistent storage using MongoDB.

---

## 🛠️ Tech Stack

### Frontend:

- React
- Ant Design
- React Query
- Axios

### Backend:

- Node.js + Express
- MongoDB + Mongoose
- JWT (HttpOnly Cookies)
- Joi (Validation)

---

## 📁 Folder Structure

```
project-root/
├── frontend/     # React application
├── backend/      # Express server (API)
├── README.md
```

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js installed
- MongoDB (local or cloud like MongoDB Atlas)

---

### 💻 Backend Setup

```bash
cd backend
npm install
```

#### Create `.env` file:

```env
MONGO_URL=mongodb://localhost:27017/todo-auth
SECRET=your_jwt_secret
```

#### Start the server:

```bash
npm start
```

Server runs at: `http://localhost:5001`

---

### 💻 Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Client runs at: `http://localhost:5173`

---

## ✨ Features

- ✅ User registration & login
- 🔐 Auth with JWT (stored in secure HttpOnly cookies)
- 📾 Add, update, and delete todos
- 👷 Todos are scoped to individual users
- 📋 Validation with Joi
- 📬 Toast feedback via react-toastify

---

## 📬 API Endpoints

| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| POST   | `/api/auth/register`   | Register a new user   |
| POST   | `/api/auth/login`      | Login a user          |
| GET    | `/api/auth/check-auth` | Check current session |
| GET    | `/api/todo/`           | Fetch all todos       |
| POST   | `/api/todo/`           | Create a new todo     |
| PATCH  | `/api/todo/:id`        | Update a todo         |
| DELETE | `/api/todo/:id`        | Delete a todo         |

---

## 📌 Future Improvements

- Filter todos by tag/status
- Add due dates & priority
- Drag-and-drop reorder
- Password reset
- Responsive UI polish
