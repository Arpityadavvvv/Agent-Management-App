# Agent Task Management App

## 🚀 Overview
The **Agent Task Management App** is a simple yet powerful web application designed to help manage agents and their assigned tasks efficiently. Agents can be added, tasks can be assigned, and everything is displayed in a structured manner.

---

## ✨ Features
- **Agent Registration & Authentication** 📌
  - Agents can sign up and log in securely.
  - Authentication is handled properly.
  
- **Task Assignment & Management** 📝
  - Admins can assign tasks to agents.
  - Agents can view their assigned tasks.
  
- **CSV Upload Functionality** 📂
  - Bulk upload agent details using CSV files.
  
- **Interactive UI & Toast Notifications** 🎨
  - A clean and modern UI using React & Tailwind.
  - Toast notifications for login/signup success.
  
- **Persistent Data Storage** 💾
  - Uses MongoDB for database storage.
  - Express.js backend for API handling.

---

## 🛠 Tech Stack
### Frontend 🖥️
- React.js
- Tailwind CSS
- React Router for navigation
- Toastify for notifications

### Backend ⚙️
- Node.js
- Express.js
- MongoDB (Mongoose for ORM)
- bcrypt for password hashing
- cors for handling CORS issues

### Hosting 🌎
- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render
- **Database**: MongoDB Atlas

---

## 🛠 Setup & Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Arpityadavvvv/Agent-Management-App.git
   cd Agent-Management-App
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Setup `.env` file in backend:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=3001
   ```

4. Start the backend server:
   ```sh
   npm start
   ```

5. Start the frontend:
   ```sh
   cd frontend
   npm start
   ```

6. Open `http://localhost:3000` in your browser.

---

## ⚠️ Important Note
**Please do not click the "Get Started" button.** It may cause unexpected behavior or errors due to current backend limitations.

---

## 📌 Quick Links
🔗 [Live Frontend](https://agentmanagementapp-76dk44zjz-arpit-yadavs-projects-0684bdcb.vercel.app/)
🔗 [Live Backend](https://agent-management-app.onrender.com/)
🔗 [GitHub Repository](https://github.com/Arpityadavvvv/Agent-Management-App)

Happy Coding! 🚀

