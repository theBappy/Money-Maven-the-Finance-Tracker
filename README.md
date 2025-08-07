
💰 Money Maven — Personal Finance Tracker
A powerful and beautiful full-stack finance tracking app built with MERN Stack + AI.

<!-- 🔧 Replace this with your project image URL -->

🧠 Overview
Money Maven is a modern, intelligent finance management platform that helps users effortlessly track their income, expenses, and recurring transactions. With built-in analytics, AI receipt scanning, and monthly financial reports, managing your money has never been easier.

🛠️ Tech Stack
<p align="left"> <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white" /> <img src="https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white" /> <img src="https://img.shields.io/badge/Gemini_AI-FF6B81?logo=google&logoColor=white" /> <img src="https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white" /> <img src="https://img.shields.io/badge/Cron-FFFFFF?logo=cron&logoColor=black" /> </p><br>
🗝️ Key Features<br>
🔐 Authentication – Email + Password login secured with JWT
🏢 Create & Edit Transactions
📤 Upload & Scan Receipts with Gemini AI
📈 Advanced Analytics – Powered by MongoDB Aggregation
📊 Expense Breakdown Pie Chart
📈 Income vs Expense Line Chart
📅 Filter by Date Ranges – e.g., Last 30 Days, This Month, Custom
♻️ Recurring Transactions – Handled with Cron Jobs
📄 Monthly Reports – Auto-Generated & Emailed
📥 CSV Import of Transactions
🔍 Filter & Search by Title, Category, Type
⏱️ Pagination Support
🗑️ Bulk Delete Transactions
➕ Duplicate Transaction Option
🧑‍💼 Profile Avatar Upload – Stored in Cloudinary
💳 Stripe-Powered Premium Plans – Free Trial, Monthly/Yearly Billing, Plan Switching
🌐 Built with Modern MERN Stack – Modular, Scalable, and Type-Safe<br>

<!-- 🔧 Replace this with your some project ss -->

🚀 Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/theBappy/Money-Maven-the-Finance-Tracker
cd money-maven
2. Install Dependencies
bash
Copy
Edit
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
3. Environment Variables
Create a .env file in both backend/ and frontend/ with appropriate keys:

Backend .env
env
Copy
Edit
PORT=8000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
GEMINI_API_KEY=your_gemini_api_key
STRIPE_SECRET_KEY=your_stripe_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
Frontend .env
env
Copy
Edit
VITE_API_URL=http://localhost:8000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
4. Run the App
bash
Copy
Edit
# Run backend
cd backend
npm run dev

# Run frontend
cd ../frontend
npm run dev
📁 Folder Structure
pgsql
Copy
Edit
money-maven/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── hooks/


📬 Monthly Report Example
Monthly reports are auto-generated at midnight on the 1st of every month and emailed directly to the user using a scheduled Cron Job and Nodemailer.


🧠 AI-Powered Receipt Scanning
Uses Google’s Gemini AI to intelligently extract transaction data (title, amount, date, etc.) from uploaded receipt images.
💳 Stripe Integration
🆓 Free Trial
📅 Monthly Plan
📆 Yearly Plan
🔁 Easy Plan Switching


All plans are managed securely through the Stripe Dashboard.
👤 Profile & Cloudinary Integration
Upload custom avatar
Avatar is optimized and stored via Cloudinary CDN


🧪 Future Enhancements
🔐 OAuth Login (Google, GitHub)
📱 Mobile Responsive PWA
🌍 Multi-currency support
🧾 OCR accuracy upgrades


🤝 Contributing
PRs are welcome! For major changes, please open an issue first to discuss your ideas.

📄 License
MIT © [theBappy]

Let me know if you’d like this in .docx, .pdf, or .md file format — I can export it right now.
