# Janata-Pulse-Secure-Realtime-Voting-App
🗳️ Janata Pulse – Secure Real-Time Voting App

A secure, real-time voting platform built using React.js and Firebase, designed to capture public sentiment with live result updates.
Voters can sign in using Google Authentication, ensuring “one person, one vote” security and preventing duplicate submissions.

🚀 Features

✅ Real-Time Voting:
Votes are instantly updated using Firebase Realtime Database, allowing live result visualization.

🔐 Secure Authentication:
Only verified users can vote using Google Sign-In (Firebase Authentication) — ensuring fairness and preventing spam or duplicate votes.

📊 Live Results Dashboard:
Dynamic UI updates show how public sentiment changes as votes come in.

🌐 Fully Deployed:
Hosted on Firebase Hosting for seamless and fast access.

🧰 Tech Stack
Category	Technology
Frontend	React.js
Authentication	Firebase Authentication
Database	Firebase Realtime Database
Hosting	Firebase Hosting
⚙️ Installation & Setup

Follow these steps to run the project locally 👇

# 1️⃣ Clone the repository
git clone https://github.com/your-username/janata-pulse.git
cd janata-pulse

# 2️⃣ Install dependencies
npm install

# 3️⃣ Add your Firebase configuration
Create a `.env` file in the root directory and add:
REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_auth_domain
REACT_APP_DATABASE_URL=your_database_url
REACT_APP_PROJECT_ID=your_project_id

# 4️⃣ Start the app
npm start


App will run on 👉 http://localhost:3000

🧠 How It Works

User logs in using Google Authentication

User selects an option (vote)

The vote is securely stored in Firebase Realtime Database

The dashboard updates instantly for all connected users



🛡️ Security

One vote per authenticated user

Votes are verified via Firebase UID

Firebase rules ensure only legitimate writes

🌟 Future Enhancements

📈 Add visual charts (Bar/Pie) for results visualization

📱 Make fully responsive for all screen sizes

🗂️ Add admin panel for managing polls

🧩 Support multiple simultaneous polls

🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to change.
