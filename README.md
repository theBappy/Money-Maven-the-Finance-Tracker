💰 Money Maven — Personal Finance Tracker
A powerful and beautiful full-stack finance tracking app built with MERN Stack.

<img width="1024" height="1024" alt="ChatGPT Image Aug 7, 2025, 10_42_36 PM" src="https://github.com/user-attachments/assets/07df42c1-52aa-4e18-8e23-0b744e0c9972" />

<br>👁‍🗨👁‍🗨 Preview Video
[recording.webm](https://github.com/user-attachments/assets/a1af7e36-09d0-4218-8f8d-8c8b5d8935a0)
<br>

🧠 Overview
Money Maven is a modern, intelligent finance management platform that helps users effortlessly track their income, expenses, and recurring transactions. With built-in analytics, AI receipt scanning, and monthly financial reports, managing your money has never been easier.

🛠️ Tech Stack
<p align="left"> <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white" /> <img src="https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white" /> <img src="https://img.shields.io/badge/Gemini_AI-FF6B81?logo=google&logoColor=white" /> <img src="https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white" /> <img src="https://img.shields.io/badge/Cron-FFFFFF?logo=cron&logoColor=black" /> </p>
🗝️ Key Features
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

👁‍🗨 Preview Image
<img width="1280" height="1378" alt="preview2" src="https://github.com/user-attachments/assets/e129b681-3e40-4598-9fa7-4ea9e6101ef3" />


🚀 Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/money-maven.git
cd money-maven
2. Install Dependencies
bash
Copy
Edit
# For backend
cd backend
npm install

 For frontend
cd ../frontend
npm install
3. Environment Variables
Create a .env file in both backend/ and frontend/ with appropriate keys:

Backend .env
env
Copy
Edit
PORT=8000<br>
MONGO_URI=your_mongo_uri<br>
JWT_SECRET=your_jwt_secret<br>
CLOUDINARY_CLOUD_NAME=your_cloud_name<br>
CLOUDINARY_API_KEY=your_key<br>
CLOUDINARY_API_SECRET=your_secret<br>
GEMINI_API_KEY=your_gemini_api_key<br>
STRIPE_SECRET_KEY=your_stripe_key<br>
EMAIL_USER=your_email<br>
EMAIL_PASS=your_password<br>

<br><br>
Frontend .env
env
Copy
Edit
VITE_API_URL=http://localhost:8000<br>
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key<br>

<br>
4. Run the App
bash
Copy
Edit
# Run backend
cd backend
npm run dev
<br>
# Run frontend
cd ../frontend
npm run dev
<br><br>

<table style="border-collapse: collapse; width: 100%; max-width: 750px;">
  <thead>
    <tr style="background:#f3f4f6;">
      <th style="padding:12px; border:1px solid #e5e7eb; text-align:left;">Folder</th>
      <th style="padding:12px; border:1px solid #e5e7eb; text-align:left;">Description</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style="padding:12px; border:1px solid #e5e7eb;"><strong>📁 money-maven/</strong></td>
      <td style="padding:12px; border:1px solid #e5e7eb;">Root directory containing backend and frontend projects.</td>
    </tr>
    <tr style="background:#fafafa;">
      <td style="padding:12px; border:1px solid #e5e7eb;"><strong>📁 backend/</strong></td>
      <td style="padding:12px; border:1px solid #e5e7eb;">API server, business logic, database layer and utilities.</td>
    </tr>
    <tr>
      <td style="padding:12px; border:1px solid #e5e7eb;">📄 backend/controllers/</td>
      <td style="padding:12px; border:1px solid #e5e7eb;">Handles API request logic.</td>
    </tr>
    <tr style="background:#fafafa;">
      <td style="padding:12px; border:1px solid #e5e7eb;">📄 backend/models/</td>
      <td style="padding:12px; border:1px solid #e5e7eb;">Database schemas / ORM models.</td>
    </tr>
    <tr>
      <td style="padding:12px; border:1px solid #e5e7eb;">📄 backend/routes/</td>
      <td style="padding:12px; border:1px solid #e5e7eb;">Route definitions for all API endpoints.</td>
    </tr>
    <tr style="background:#fafafa;">
      <td style="padding:12px; border:1px solid #e5e7eb;">📄 backend/middleware/</td>
      <td style="padding:12px; border:1px solid #e5e7eb;">Auth, validation, and error middleware.</td>
    </tr>
    <tr>
      <td style="padding:12px; border:1px solid #e5e7eb;">📄 backend/utils/</td>
      <td style="padding:12px; border:1px solid #e5e7eb;">Helper functions (cron jobs, mailer, formatters, etc).</td>
    </tr>
    <tr style="background:#fafafa;">
      <td style="padding:12px; border:1px solid #e5e7eb;"><strong>📁 frontend/</strong></td>
      <td style="padding:12px; border:1px solid #e5e7eb;">React/Next.js web application.</td>
    </tr>
    <tr>
      <td style="padding:12px; border:1px solid #e5e7eb;">📄 frontend/components/</td>
      <td style="padding:12px; border:1px solid #e5e7eb;">UI components.</td>
    </tr>
    <tr style="background:#fafafa;">
      <td style="padding:12px; border:1px solid #e5e7eb;">📄 frontend/pages/</td>
      <td style="padding:12px; border:1px solid #e5e7eb;">Page routes/views.</td>
    </tr>
    <tr>
      <td style="padding:12px; border:1px solid #e5e7eb;">📄 frontend/redux/</td>
      <td style="padding:12px; border:1px solid #e5e7eb;">Global state management.</td>
    </tr>
    <tr style="background:#fafafa;">
      <td style="padding:12px; border:1px solid #e5e7eb;">📄 frontend/hooks/</td>
      <td style="padding:12px; border:1px solid #e5e7eb;">Custom shared React hooks.</td>
    </tr>
  </tbody>
</table>


<br><br>
📬 Monthly Report Example
Monthly reports are auto-generated at midnight on the 1st of every month and emailed directly to the user using a scheduled Cron Job and Nodemailer.
<br>

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
