# FresherAI

FresherAI is an AI-powered career preparation platform designed to help students and fresh graduates prepare for software engineering roles from one place.

The application combines **AI mock interviews, interview feedback, resume building, resume scoring, personalized learning roadmaps, authentication, and subscription billing** in a single web platform.

> **Project type:** Full-stack web application  
> **Frontend:** React + Vite  
> **Backend:** Node.js + Express  
> **Architecture:** API Gateway + Microservices  
> **Database:** MongoDB  
> **Caching:** Redis  
> **AI:** Groq / Google Generative AI + LangChain / LangGraph  
> **Payments:** Razorpay  
> **Authentication:** Firebase

---

## ✨ Features

### 🤖 AI Mock Interviews
- Start an AI-powered mock interview.
- Supports technical and HR-style interview flows.
- Uses AI agents and LangGraph-based workflow orchestration.
- Provides interview feedback and a final report.
- Includes a coding/editor experience for technical interview preparation.
- Tracks interview progress and results.

### 📄 AI Resume Builder
- Create and edit a professional resume.
- Generate resume-related content with AI.
- Preview the resume before exporting.
- Download/print the resume.
- Includes ATS-oriented resume templates.

### 📊 Resume Scorer
- Evaluate a resume against job/career requirements.
- Get an AI-assisted score and improvement suggestions.
- Helps identify areas that can be improved before applying.

### 🗺️ Personalized Roadmaps
- Generate a learning roadmap based on the user's career goal.
- Breaks preparation into modules/topics.
- Uses AI to generate roadmap content.
- Can use external learning resources such as YouTube content.

### 👤 Authentication & User Management
- Firebase-based authentication.
- Protected application routes.
- User session handling through the API Gateway.
- Cookie-based authenticated requests.

### 💳 Subscription & Billing
- Razorpay integration for payments.
- Dedicated billing microservice.
- Subscription/payment information stored in MongoDB.

### ⚡ Redis
- Shared Redis infrastructure for backend services.
- Used as a fast in-memory data layer where required by services.

---

## 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │      React App       │
                         │     Vite Frontend    │
                         │    localhost:5173    │
                         └──────────┬───────────┘
                                    │
                                    │ HTTP / Cookies
                                    ▼
                         ┌──────────────────────┐
                         │     API Gateway      │
                         │   Node + Express     │
                         │    localhost:8000    │
                         └──────────┬───────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
       │ Auth Service│       │Interview Svc │       │ Resume Svc  │
       │    :6001    │       │    :6002    │       │    :6003    │
       └──────┬──────┘       └──────┬──────┘       └──────┬──────┘
              │                     │                     │
              └──────────────┬──────┴──────────────┬──────┘
                             │                     │
                             ▼                     ▼
                      ┌─────────────┐       ┌──────────────┐
                      │   MongoDB   │       │    Redis     │
                      └─────────────┘       └──────────────┘

              ┌─────────────────────┬─────────────────────┐
              │                     │
              ▼                     ▼
       ┌─────────────┐       ┌─────────────┐
       │ Roadmap Svc │       │ Billing Svc │
       │    :6004    │       │    :6005    │
       └─────────────┘       └──────┬──────┘
                                    │
                                    ▼
                              ┌─────────────┐
                              │  Razorpay   │
                              └─────────────┘
```

---

## 📁 Project Structure

```text
fresherAI/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       │   ├── interview/
│       │   ├── resume/
│       │   └── roadmap/
│       ├── pages/
│       ├── redux/
│       ├── utils/
│       ├── App.jsx
│       ├── App.css
│       └── index.css
│
└── backend/
    ├── gateway/
    │   ├── controllers/
    │   ├── middlewares/
    │   ├── utils/
    │   ├── Dockerfile
    │   └── index.js
    │
    ├── services/
    │   ├── auth-service/
    │   │   ├── configs/
    │   │   ├── controllers/
    │   │   ├── model/
    │   │   └── routes/
    │   │
    │   ├── interview-service/
    │   │   ├── agents/
    │   │   ├── configs/
    │   │   ├── graph/
    │   │   ├── model/
    │   │   ├── prompts/
    │   │   └── routes/
    │   │
    │   ├── resume-service/
    │   │   ├── agents/
    │   │   ├── configs/
    │   │   ├── controllers/
    │   │   ├── model/
    │   │   └── routes/
    │   │
    │   ├── roadmap-service/
    │   │   ├── agents/
    │   │   ├── configs/
    │   │   ├── graph/
    │   │   ├── model/
    │   │   ├── states/
    │   │   └── routes/
    │   │
    │   └── billing-service/
    │       ├── configs/
    │       ├── controllers/
    │       ├── models/
    │       └── routes/
    │
    ├── shared/
    │   └── redis/
    │       └── redis.js
    │
    └── docker-compose.yml
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React | User interface |
| Vite | Frontend build tool |
| React Router | Client-side routing |
| Redux Toolkit | Application state management |
| Axios | API communication |
| Tailwind CSS | UI styling |
| Motion | UI animations |
| Recharts | Data visualization |
| Monaco Editor | Coding/editor experience |
| Firebase | Authentication |
| jsPDF | PDF export |
| html2canvas | Resume rendering/export |
| react-to-print | Print/download support |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express | REST APIs and microservices |
| MongoDB | Persistent data storage |
| Mongoose | MongoDB object modeling |
| Redis | Caching / fast data access |
| Firebase Admin | Authentication verification |
| Express HTTP Proxy | Gateway-to-service communication |
| CORS | Cross-origin configuration |
| Morgan | HTTP request logging |
| Multer | File upload handling |

### AI & Integrations

| Technology | Purpose |
|---|---|
| LangChain | AI application framework |
| LangGraph | AI workflow orchestration |
| Groq | LLM-powered interview/roadmap workflows |
| Google Generative AI | AI-powered resume functionality |
| Qdrant | Vector/search integration for resume workflows |
| Tavily | External search/resource discovery |
| YouTube API | Learning-resource discovery |
| Razorpay | Payment processing |

---

# 🚀 Getting Started

Follow the steps below to run FresherAI locally.

## 1. Prerequisites

Install the following before starting:

- **Node.js** (LTS recommended)
- **npm**
- **Git**
- **Docker Desktop**
- A running **MongoDB** database or MongoDB Atlas account
- A **Firebase** project
- A **Groq API key**
- A **Google Generative AI API key** if required by the resume service
- A **YouTube Data API key**
- A **Tavily API key** if used by the roadmap workflow
- A **Razorpay** account/test credentials for billing

Verify Node and npm:

```bash
node -v
npm -v
```

Verify Docker:

```bash
docker --version
docker compose version
```

---

# 📥 Installation

## 2. Clone the Repository

```bash
git clone https://github.com/<your-username>/fresherAI.git
cd fresherAI
```

If you already have the project locally, simply open the project folder in VS Code.

---

## 3. Install Frontend Dependencies

Open a terminal in the project root:

```bash
cd frontend
npm install
```

---

## 4. Install Gateway Dependencies

```bash
cd ../backend/gateway
npm install
```

---

## 5. Install Auth Service Dependencies

```bash
cd ../services/auth-service
npm install
```

---

## 6. Install Interview Service Dependencies

```bash
cd ../interview-service
npm install
```

---

## 7. Install Resume Service Dependencies

```bash
cd ../resume-service
npm install
```

---

## 8. Install Roadmap Service Dependencies

```bash
cd ../roadmap-service
npm install
```

---

## 9. Install Billing Service Dependencies

```bash
cd ../billing-service
npm install
```

---

# 🔐 Environment Variables

**Do not commit API keys, passwords, Firebase credentials, Razorpay secrets, or service-account files to GitHub.**

Create the required `.env` files locally.

## Frontend

Create:

```text
frontend/.env
```

Example:

```env
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## API Gateway

Create:

```text
backend/gateway/.env
```

Example:

```env
PORT=8000

AUTH_SERVICE_URL=http://localhost:6001
INTERVIEW_SERVICE_URL=http://localhost:6002
RESUME_SERVICE_URL=http://localhost:6003
ROADMAP_SERVICE_URL=http://localhost:6004
BILLING_SERVICE_URL=http://localhost:6005
```

The gateway exposes the application API and forwards authenticated requests to the appropriate microservice.

---

## Auth Service

Create:

```text
backend/services/auth-service/.env
```

```env
PORT=6001
MONGODB_URL=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
```

Configure Firebase Admin credentials according to your local deployment.

---

## Interview Service

Create:

```text
backend/services/interview-service/.env
```

```env
PORT=6002
MONGODB_URL=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
GROQ_API_KEY=your_groq_api_key
```

---

## Resume Service

Create:

```text
backend/services/resume-service/.env
```

```env
PORT=6003
MONGODB_URL=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
GROQ_API_KEY=your_groq_api_key
```

Add any Google Generative AI/Qdrant credentials required by your selected resume workflow.

---

## Roadmap Service

Create:

```text
backend/services/roadmap-service/.env
```

```env
PORT=6004
MONGODB_URL=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
GROQ_API_KEY=your_groq_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

If your deployment uses Tavily, also configure its API key.

---

## Billing Service

Create:

```text
backend/services/billing-service/.env
```

```env
PORT=6005
MONGODB_URL=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

For development, use Razorpay test credentials.

---

# ⚡ Start Redis

The repository includes a Docker Compose configuration for Redis.

From the backend directory:

```bash
cd backend
docker compose up -d
```

Check the running containers:

```bash
docker ps
```

Redis should be available on:

```text
localhost:6379
```

To stop Redis:

```bash
docker compose down
```

---

# ▶️ Run the Application

FresherAI uses multiple backend processes, so run each service in a separate terminal.

## Terminal 1 — API Gateway

```bash
cd backend/gateway
npm run dev
```

Gateway:

```text
http://localhost:8000
```

---

## Terminal 2 — Auth Service

```bash
cd backend/services/auth-service
npm run dev
```

Auth service:

```text
http://localhost:6001
```

---

## Terminal 3 — Interview Service

```bash
cd backend/services/interview-service
npm run dev
```

Interview service:

```text
http://localhost:6002
```

---

## Terminal 4 — Resume Service

```bash
cd backend/services/resume-service
npm run dev
```

Resume service:

```text
http://localhost:6003
```

---

## Terminal 5 — Roadmap Service

```bash
cd backend/services/roadmap-service
npm run dev
```

Roadmap service:

```text
http://localhost:6004
```

---

## Terminal 6 — Billing Service

```bash
cd backend/services/billing-service
npm run dev
```

Billing service:

```text
http://localhost:6005
```

---

## Terminal 7 — Frontend

```bash
cd frontend
npm run dev
```

Vite will normally start the frontend at:

```text
http://localhost:5173
```

Open the URL shown by Vite in your browser.

---

# 🔄 API Flow

The frontend communicates with the API Gateway instead of directly calling individual microservices.

```text
React Frontend
      │
      ▼
API Gateway :8000
      │
      ├── /api/auth       → Auth Service :6001
      ├── /api/me         → User/Auth handling
      ├── /api/interview  → Interview Service :6002
      ├── /api/resume     → Resume Service :6003
      ├── /api/roadmap    → Roadmap Service :6004
      └── /api/billing    → Billing Service :6005
```

This approach keeps service responsibilities separated and provides a single API entry point for the frontend.

---

# 🔒 Authentication Flow

The authentication flow is designed around Firebase and protected backend routes.

```text
User
 │
 ▼
React Frontend
 │
 ▼
Authentication
 │
 ▼
API Gateway
 │
 ├── Verify authenticated request
 │
 ▼
Protected Microservice
 │
 ▼
MongoDB
```

Protected routes are handled through gateway authentication middleware before requests are forwarded to services.

---

# 🤖 AI Interview Flow

A typical interview flow is:

```text
User selects interview
        │
        ▼
Interview Service
        │
        ▼
AI Interview Agent
        │
        ▼
LangGraph Workflow
        │
        ├── Interview questions
        ├── Candidate responses
        ├── Evaluation
        └── Summary / feedback
        │
        ▼
Interview Report
```

The interview service contains separate AI agents/prompts for interview generation, feedback, and summary generation.

---

# 📄 Resume Flow

```text
User Resume Data / Upload
          │
          ▼
Resume Service
          │
          ├── Parse / process resume
          ├── AI content generation
          └── Resume evaluation
          │
          ▼
Resume Preview
          │
          ▼
PDF / Print Export
```

---

# 🗺️ Roadmap Flow

```text
Career Goal
    │
    ▼
Roadmap Service
    │
    ▼
AI Roadmap Agent
    │
    ├── Generate learning modules
    ├── Build roadmap structure
    └── Find learning resources
    │
    ▼
Personalized Roadmap
```

---

# 💳 Billing Flow

```text
Frontend
   │
   ▼
API Gateway
   │
   ▼
Billing Service
   │
   ▼
Razorpay
   │
   ▼
Payment / Subscription
   │
   ▼
MongoDB
```

Use Razorpay test mode while developing locally.

---

# 🧪 Useful Commands

## Frontend

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

## Backend Services

Development:

```bash
npm run dev
```

Production/start mode:

```bash
npm start
```

---

# 🩺 Troubleshooting

### Frontend cannot connect to backend

Check that:

1. The API Gateway is running.
2. The gateway is running on port `8000`.
3. `frontend/src/utils/axios.js` points to the correct gateway URL.
4. CORS allows the frontend origin.
5. Browser cookies are allowed for the application.

---

### Gateway cannot reach a service

Check:

```text
AUTH_SERVICE_URL
INTERVIEW_SERVICE_URL
RESUME_SERVICE_URL
ROADMAP_SERVICE_URL
BILLING_SERVICE_URL
```

Make sure every target service is running on the expected port.

---

### MongoDB connection fails

Verify:

```env
MONGODB_URL=...
```

Also make sure:

- MongoDB is running.
- Your IP is allowed if using MongoDB Atlas.
- Database credentials are correct.
- The connection string does not contain accidental spaces.

---

### Redis connection fails

Start Redis:

```bash
cd backend
docker compose up -d
```

Then verify:

```bash
docker ps
```

Also check:

```env
REDIS_URL=...
```

---

### AI features are not working

Check that the required AI API keys are present in the correct service `.env` file.

For example:

```env
GROQ_API_KEY=...
```

Do not expose these keys in frontend code or commit them to GitHub.

---

### Payment integration is not working

Check:

```env
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
```

Use the correct test/live credentials for the environment.

---

# 🔐 Security Notes

Before pushing the project to GitHub:

- Do **not** commit `.env` files.
- Do **not** commit Firebase service-account JSON credentials.
- Do **not** expose Razorpay secret keys.
- Do **not** expose Groq/Google/Tavily/YouTube API keys.
- Do **not** commit database passwords or private connection strings.
- Rotate any credential that has accidentally been exposed.

Recommended Git check:

```bash
git status
```

Before committing:

```bash
git add .
git status
git commit -m "Initial project setup"
git push
```

---

# 📌 Main Application Routes

The frontend currently includes routes for:

| Route | Purpose |
|---|---|
| `/` | Landing / home page |
| `/dashboard` | User dashboard |
| `/interview` | Start interview |
| `/interview/:id` | Active interview |
| `/interview/:id/report` | Interview report |
| `/resume` | Resume builder |
| `/roadmap` | Personalized roadmap |
| `/scorer` | Resume scorer |
| `/pricing` | Pricing/subscription page |

Protected application routes redirect unauthenticated users to the home page.

---

# 🧩 Microservices

### Auth Service — `6001`
Responsible for authentication-related operations, user data, Firebase integration, and user persistence.

### Interview Service — `6002`
Responsible for AI mock interviews, interview state, feedback, summaries, and interview reports.

### Resume Service — `6003`
Responsible for resume creation, processing, AI-assisted resume functionality, and resume data.

### Roadmap Service — `6004`
Responsible for personalized learning roadmaps and learning-resource discovery.

### Billing Service — `6005`
Responsible for Razorpay payments and billing/subscription data.

### API Gateway — `8000`
Acts as the single backend entry point and routes requests to the appropriate microservice.

---

# 📈 Future Improvements

Potential improvements for future versions include:

- Dockerize the complete application stack.
- Add automated CI/CD with GitHub Actions.
- Add comprehensive unit and integration tests.
- Add centralized logging and monitoring.
- Add API documentation with Swagger/OpenAPI.
- Improve service-to-service authentication.
- Add production-ready Redis caching strategies.
- Add rate limiting and API security middleware.
- Add more interview categories and difficulty levels.
- Add job-description-based resume optimization.
- Add progress tracking across learning roadmaps and interviews.

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Test the application.
5. Commit your changes:

```bash
git commit -m "Add your feature"
```

6. Push the branch:

```bash
git push origin feature/your-feature
```

7. Open a Pull Request.

---

# 📜 License

This project currently does not specify a dedicated open-source license.

If you plan to distribute the project publicly, add an appropriate `LICENSE` file.

---

# 👨‍💻 Author

**Rushikesh Padamwar**

GitHub: `https://github.com/rushi690`

---

## ⭐ Support

If you find FresherAI useful, consider giving the repository a ⭐ on GitHub.

Built to make software-engineering preparation more structured, practical, and accessible for freshers.
