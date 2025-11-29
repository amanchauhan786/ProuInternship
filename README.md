# 🚀 ProU Internship Challenge – Track 3 (Fullstack)

A complete **Employee & Task Management Dashboard** built as part of the **ProU Technology Internship Coding Challenge**.
This full-stack web application includes CRUD operations, relational task assignment, responsive UI, and a bonus data-visualization component.

---

## 🌐 Live Demo

🔵 **Frontend (Vercel Deployment)**
👉 Live App: *Add your Vercel link here*
👉 Repository: [https://github.com/amanchauhan786/ProuInternship](https://github.com/amanchauhan786/ProuInternship)

> ⚠️ *Note: The live frontend is for UI demonstration only. Backend + DB operations work locally.*

---

## 📸 Preview

*Add your screenshot here*

```
![Dashboard Preview](./preview.png)
```

---

## ✨ Key Features

### 👥 Employee Management

* Add new employees
* View employee list
* Delete employees
* Persistent SQLite storage

### 📋 Task Management

* Create tasks with title & description
* Assign tasks to employees (Foreign Key)
* Update task status
* Dynamic assignment dropdown

### 🔗 Relational Logic

* Each task belongs to one employee
* Employees can have multiple tasks

### 📊 Bonus: Data Visualization

* Custom “Workload Distribution” chart
* Shows how many tasks each employee has

### 🎨 Modern & Responsive UI

* Built with Tailwind CSS
* Dark-themed navbar
* Card-based layout

### ⚡ Real-time UI Updates

* UI updates instantly after:

  * Adding employees
  * Creating tasks
  * Deleting items

---

## 🏆 Bonus Challenges Achieved

| Bonus Feature      | Status | Description                                |
| ------------------ | ------ | ------------------------------------------ |
| Deployment         | ✅      | UI deployed to Vercel                      |
| Advanced UI        | ✅      | Custom Tailwind components                 |
| Data Visualization | ✅      | Custom CSS-based bar chart                 |
| Creative UX        | ✅      | Prevents tasks without employee assignment |

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* SQLite (file-based DB)

### Communication

* Fetch API

---

## ⚙️ Installation & Local Setup

Follow the steps below to run the complete project locally.

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/amanchauhan786/ProuInternship.git
cd ProuInternship
```

---

### 2️⃣ Setting Up the Backend (Server)

```bash
cd server
npm install
node server.js
```

Server runs at:

👉 [http://localhost:5000](http://localhost:5000)

A new SQLite database file will be automatically created:

```
database.sqlite
```

---

### 3️⃣ Setting Up the Frontend (Client)

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

The app runs at:

👉 [http://localhost:5173](http://localhost:5173)

---

## 📂 Project Structure

```
ProuInternship/
├── client/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/         # UI Components (Cards, Charts)
│   │   ├── App.jsx             # Main Application Logic
│   │   └── ...
│   ├── index.html
│   └── ...
│
├── server/                     # Backend (Node + Express)
│   ├── server.js               # REST API + Database Logic
│   ├── package.json            # Dependencies
│   ├── database.sqlite         # SQLite Database (Generated at runtime)
│   └── ...
│
└── README.md                   # Documentation
```

---

## 👤 Author

**Aman Chauhan**
Aspiring Fullstack Developer
Passionate about building modern web apps with clean UI & strong backend architecture.

---

## ⭐ Support

If you found this helpful, please ⭐ **star the repository** on GitHub!
