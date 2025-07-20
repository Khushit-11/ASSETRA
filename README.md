# 🛠️ Assetra - AI-Driven Rental Marketplace

**Assetra** is a full-stack, AI-enhanced peer-to-peer rental platform that enables users to rent or lend underutilized items in categories such as:

- 📱 Electronics  
- 🏠 Home Appliances  
- 👚 Clothing  
- 🏋 Fitness Equipment  
- 🪑 Furniture  
- 🔧 Tools  

By leveraging **Generative AI**, Assetra streamlines the rental experience—from product listing to secure payment and damage detection—making the process fast, fair, and convenient for both owners and renters.

---

## 🔑 Core Features

### 📸 One-Click Product Listing
- Upload an item photo; GenAI generates a detailed listing.
- Auto-generated descriptions include:
  - Key features
  - Usage scenarios
  - Maintenance tips
  - Suggested rental duration

### 🧠 Personalized Smart Suggestions
- Tailored recommendations based on:
  - Past rental behavior
  - Real-time location
  - Event context (e.g., "Wedding", "DIY project")

### 🔗 Smart Bundling
- AI suggests complementary bundles such as:
  - Drill + Safety Goggles
  - Treadmill + Yoga Mat
  - Sofa + Center Table

### 💳 AI-Powered Damage Assessment & Secure Payments
- Renters pay a refundable security deposit.
- AI compares "before" and "after" images to detect:
  - Wear and tear
  - Missing parts
  - Damages
- Triggers **fair deductions** and ensures **quick refunds**.

### 🌱 Sustainability First
- Encourages **access over ownership**
- Promotes the **circular economy**
- Ideal for **eco-conscious and budget-savvy users**

---

## 👥 User Roles

### 🔷 Owners (Lenders)
- List items easily with photos
- Set price, availability, and duration
- Get paid securely after returns

### 🔶 Renters (Borrowers)
- Discover items by category or event
- View AI-generated listings
- Securely book and pay
- Return and view damage assessment reports

---

## 🧰 Tech Stack

### Frontend
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)

### AI Integrations

- **Product Descriptions:** [Mistral API](https://mistral.ai/) – Lightweight, fast LLMs used to generate product titles, descriptions, and contextual usage tips from minimal input (e.g., title + image).
- **Semantic Search & Recommendations:** Custom embeddings + cosine similarity for relevant item discovery and bundling suggestions.
- **Damage Detection:** Vision-based AI model using image comparison (e.g., PyTorch/TensorFlow), deployed via a Python microservice.

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Stripe or Razorpay account for payments
- Mistral API key for GenAI

---
### ✅ **Deployed Link**

🌐 **Live App:** [Visit Assetra](https://assetra.netlify.app/)

---


### 🔧 Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/assetra.git
cd assetra

# 2. Install dependencies for frontend
cd frontend
npm install

# 3. Start frontend
npm start
# The frontend will run on http://localhost:5000

# 4. Open a new terminal and install backend dependencies
cd ../backend
npm install

# 5. Configure environment variables
cp .env.example .env
# Fill in values for:
# - MONGODB_URI
# - MISTRAL_API_KEY

# 6. Start backend server
node server.js
# The backend will run on http://localhost:5000 (or as configured)


