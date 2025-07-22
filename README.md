<p align="center">
  <img src="frontend/src/pages/image-7.png" alt="Assetra Logo" width="100" />
</p>

# Assetra: The AI-Powered Rental Platform 

## Sub-theme
**Smart Rentals for Bharat – Empowering Ownership, Access & Employment via AI 🏡🎯**

---

Assetra is a **centralized, community-driven rental platform** where individuals can list their unused or underutilized items for rent, empowering affordable resource access while allowing owners to earn passive income. By fostering a circular rental economy, Assetra combats consumerism, decreases unnecessary ownership, and minimizes waste.

Our AI-powered approach maximizes item utilization, ensuring products are efficiently used rather than left idle. Smart damage assessments and AI-driven maintenance extend product lifespans, supporting sustainable consumption. Together, we are cultivating a community that values **access over ownership**, advancing both economic and environmental sustainability.

- **Live Project:** [https://assetra.netlify.app/](https://assetra.netlify.app/) 🌐
- **Demo Video:** [View Demo](https://drive.google.com/file/d/1a2PcGctZgHCfwJBMBffpgPURgnVTHMAQ/view?usp=sharing) 🎬

---

## User Roles

### Owners (Lenders) 🧑‍💼
- List items easily with photos 📸
- Set price, availability, and rental duration 💸
- Get paid securely after returns 💰

### Renters (Borrowers) 🧑‍🔧
- Discover items by category or event 🔍
- View AI-generated listings 📋
- Book and pay securely 🔑
- Return items and access damage assessment reports 📄

---

## Key Features

### AI-Generated Listings
- **Image-to-Description:** Upload photos; AI writes professional-grade product listings.
- **Smart Titles & Tags:** Instantly generate optimized names and categories.

### Damage Detection & Security Adjustments
- **Before/After Uploads:** Owners and renters upload images at handoff and return.
- **AI Detection:** System automatically assesses product condition and recommends deposit deductions if necessary.

### Renter-Friendly Discovery
- **Event & Category Search:** Find items tailored to your occasion or need.
- **AI-Curated Feeds:** Get personalized suggestions based on usage and behavior.

---

## Tech Stack ⚙️

**Frontend:**
- React
- TypeScript
- Tailwind CSS
- Framer Motion

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose

---

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Gemini API Key (from Google AI Studio)

---

## Installation & Setup

1. **Clone the Repository**
    ```
    git clone https://github.com/Khushit-11/ASSETRA
    cd assetra
    ```

2. **Edit the `.env` File with Credentials**
    ```
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/assetra
    MISTRAL_API_KEY=your-mistral-api-key-here
    ```

3. **Backend Setup**
    ```
    cd backend
    ```

4. **Run the Backend Server**
    ```
    node server.js
    ```
    Your backend runs at [http://localhost:5000](http://localhost:5000) 🟢

5. **Frontend Setup**
    ```
    cd assetra
    npm install
    ```

6. **Run Frontend Dev Server**
    ```
    npm start
    ```
    Access the app at [http://localhost:5173](http://localhost:5173) 🖥️

---

## How to Use the Website

1. **Sign Up**
    - If you are a new user, click on the **Sign Up** option on the homepage.
    - Choose whether to sign up as a **Renter** or an **Owner** during registration.
    - Fill out the required information and submit the form.

2. **Login**
    - If you already have an account, click on **Login**.
    - Enter your credentials to access your account.

    > **Tip:** If the signup or login process takes too long, try refreshing the website and attempting again. 🔄

3. **Dashboard Access**
    - After successfully signing in, you will automatically be redirected to your Dashboard.

4. **Logout**
    - To log out, go to **My Account**.
    - Select **Logout** from the menu.

---

## Open-Source Attribution

| Name & Version           | License                | Role in Project                                   | Source Link                                                  |
|------------------------- |----------------------- |---------------------------------------------------|--------------------------------------------------------------|
| React 18.2.0             | MIT License            | Frontend framework for UI                         | [React GitHub](https://github.com/facebook/react)            |
| TypeScript 5.x           | Apache 2.0             | Typed superset used in React frontend             | [TypeScript GitHub](https://github.com/microsoft/TypeScript) |
| Tailwind CSS 3.4.x       | MIT License            | Utility-first CSS framework                       | [Tailwind GitHub](https://github.com/tailwindlabs/tailwindcss)|
| HTML5 & CSS3             | W3C Standards          | Markup and styling languages                      | [HTML Living Standard](https://html.spec.whatwg.org/)        |
| JavaScript (ES6+)        | ECMA Script            | Core language for frontend and backend            | [ECMAScript Info](https://github.com/tc39/ecma262)           |
| Node.js 18.x             | MIT License            | JavaScript runtime for backend                    | [Node.js GitHub](https://github.com/nodejs/node)             |
| Express.js 4.18.x        | MIT License            | Backend framework for API endpoints               | [Express GitHub](https://github.com/expressjs/express)       |
| MongoDB Atlas            | SSPL                   | NoSQL Cloud Database                              | [MongoDB Website](https://www.mongodb.com/cloud/atlas)        |
| Mongoose 7.x             | MIT License            | ODM for MongoDB in backend                        | [Mongoose GitHub](https://github.com/Automattic/mongoose)    |
| Axios 1.x                | MIT License            | HTTP client between frontend and backend APIs      | [Axios GitHub](https://github.com/axios/axios)               |
| Framer Motion 10.x       | MIT License            | Animation in frontend components                  | [Framer Motion GitHub](https://github.com/framer/motion)     |
| Lucide React Icons       | ISC License            | Icon library for frontend                         | [Lucide GitHub](https://github.com/lucide-icons/lucide)      |
| Mistral AI (API)         | Apache 2.0             | AI assistant for renters                          | [Mistral GitHub](https://github.com/mistralai)               |
| OpenAI/GenAI (API)       | Varies                 | Generate product descriptions from image/text     | [OpenAI Docs](https://platform.openai.com/docs)              |
| Vite 5.x                 | MIT License            | Build tool for frontend                           | [Vite GitHub](https://github.com/vitejs/vite)                |
| Dotenv 16.x              | BSD-2-Clause           | Loads environment variables in backend            | [Dotenv GitHub](https://github.com/motdotla/dotenv)          |
| CORS 2.8.x               | MIT License            | Enable Cross-Origin Resource Sharing              | [CORS GitHub](https://github.com/expressjs/cors)             |
| React Hook Form 7.x      | MIT License            | Form input validation in frontend                 | [React Hook Form GitHub](https://github.com/react-hook-form/react-hook-form) |
| Shadcn/ui                | MIT License            | UI components for clean, accessible UI           | [Shadcn/ui GitHub](https://github.com/shadcn-ui/ui)          |

---

## License

This project is licensed under the **MIT License**.

---
