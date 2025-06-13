# 🎮 GameSwap – Fullstack Game Trading Marketplace

GameSwap is a fullstack web application that allows users to list, browse, and manage video game-related items such as game discs, digital codes, figurines, and accessories.

## 🚀 Features

- ✅ User registration & login (with JWT auth)
- ✅ Create, edit, and delete listings
- ✅ View full listing details
- ✅ Protected routes with authorization checks
- ✅ User-specific profile and listing management
- ✅ Responsive Bootstrap UI

## 🛠️ Technologies Used

### Frontend
- ⚛️ React
- 🎨 Bootstrap 5
- 📦 Axios
- 🌐 React Router

### Backend
- 🟢 Node.js
- 🧩 Express
- 🍃 MongoDB
- 🔐 JWT (jsonwebtoken)
- 🔒 bcryptjs

### Dev Tools
- 📦 npm
- 💻 VS Code
- 🧪 Postman (for API testing)

## 🗂️ Project Structure

```
/frontend
  ├── public/
  ├── src/
      ├── components/
      ├── pages/
      ├── context/
      └── App.js

/backend
  ├── models/
  ├── routes/
  ├── middleware/
  └── index.js
```

## 📦 Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/gameswap.git
   cd gameswap
   ```

2. Install dependencies:
   ```bash
   npm install
   cd ../backend && npm install
   ```

3. Configure your `.env` file:
   ```
   MONGO_URI=mongodb://localhost:27017/gameswap
   JWT_SECRET=your_jwt_secret
   ```

4. Run the app:
   ```bash
   npm start
   cd backend && npm run dev
   ```

---

Made with ❤️ for the gaming community.