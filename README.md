🚀 ProU Internship Challenge - Track 3 (Fullstack)

A comprehensive Employee & Task Management Dashboard built as part of the ProU Technology Internship Coding Challenge. This full-stack application demonstrates CRUD operations, relational data handling, and data visualization.

🌐 Live Demo

Frontend (UI)

Repository

👉 Click to View Live App

View Source Code

Note: The live frontend is deployed on Vercel for UI/UX demonstration. For full database functionality, please run the project locally following the instructions below.

📸 Dashboard Preview

✨ Key Features

👥 Team Management: Add, view, and remove team members dynamically.

📋 Task Management: Create tasks with titles, descriptions, and status.

🔗 Relational Logic: Assign tasks to specific employees using a dynamic dropdown (Foreign Key relationship).

📊 Data Visualization (Bonus): Integrated "Workload Distribution" chart to visualize task allocation.

🎨 Modern UI/UX: Fully responsive design built with Tailwind CSS and a professional dark-mode navbar.

⚡ Real-time Updates: Immediate UI updates upon data changes.

🏆 Bonus Challenges Completed

Challenge

Status

Implementation Details

Deployment

✅

Frontend deployed to Vercel with continuous integration.

Advanced UI

✅

Custom Tailwind CSS styling, responsive grid layouts, and card components.

Data Visualization

✅

Custom CSS-based Bar Chart to show employee workload stats.

UX/Creative

✅

Smart Assignment System: Tasks cannot be created without being assigned to a valid employee.

🛠️ Tech Stack

Frontend: React.js, Vite, Tailwind CSS

Backend: Node.js, Express.js

Database: SQLite (Persistent file-based storage)

HTTP Client: Fetch API

⚙️ Installation & Setup

Follow these steps to run the full-stack application locally.

1. Clone the Repository

git clone [https://github.com/amanchauhan786/ProuInternship.git](https://github.com/amanchauhan786/ProuInternship.git)
cd ProuInternship


2. Setup Backend (Server)

cd server
npm install
node server.js


The server will start on http://localhost:5000 and create the database.sqlite file automatically.

3. Setup Frontend (Client)

Open a new terminal:

cd client
npm install
npm run dev


The application will launch at http://localhost:5173.

📂 Project Structure

ProuInternship/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (Cards, Charts)
│   │   ├── App.jsx         # Main Logic
│   └── ...
├── server/                 # Node.js Backend
│   ├── server.js           # API Routes & Database Logic
│   ├── package.json        # Dependencies
│   └── database.sqlite     # Local Database file
└── README.md               # Documentation


👤 Author

Aman Chauhan
Aspiring Fullstack Developer
