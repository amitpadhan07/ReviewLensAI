# ReviewLens AI

An AI-powered customer review analysis and response generation platform that classifies sentiments, categories, and automatically drafts professional replies using Google Gemini.

---

## 🚀 Key Features

- **Automated AI Analysis**: Uses Google Gemini to instantly classify sentiments (Positive, Neutral, Negative) and category tags (Food, Cleanliness, Location, Host, Value, Experience).
- **Auto-Reply Generator**: Suggests context-aware professional replies that can be copied with one click.
- **Analytics Dashboard**: Dynamic charts powered by Recharts visualizing review trends, sentiment distributions, and category breakdowns.
- **Review Database (History)**: Expandable list of guest reviews with instant client-side search, filtering, and sorting.
- **Robust Persistence**: Persists all reviews and responses into MongoDB database Atlas.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **AI Integration**: [Google Gemini AI](https://ai.google.dev/) (`@google/generative-ai` SDK)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```text
ReviewLensAI/
├── backend/                 # Express.js backend (Week 4 REST API)
│   ├── server.js            # Express API server entrypoint
│   ├── package.json         # Backend dependencies & dev scripts
│   └── .env.example         # Environment template for port and api key
├── src/
│   ├── app/                 # Next.js App Router folders
│   │   ├── api/             # Next.js fallback API routes
│   │   ├── analyzer/        # Review submission and analysis interface
│   │   ├── dashboard/       # Charts and statistics dashboard
│   │   ├── history/         # Searchable & filterable review database
│   │   ├── globals.css      # Core style definitions and custom themes
│   │   └── layout.tsx       # Master layout with responsive Navbar and Footer
│   ├── components/          # Reusable UI components (ResultCard, ReviewForm, Hero)
│   ├── lib/                 # Core logic (Gemini service, MongoDB connection helper)
│   └── models/              # Mongoose schema definitions (Review.ts)
├── API.md                   # API endpoints specification
├── DEPLOYMENT.md            # Local setup & Vercel deployment guide
├── REPORT.md                # Detailed project architecture & database schema report
├── VIVA.md                  # Viva voce defense questions & answers
├── W4_APICollection_amitpadhan07.json             # Postman testing collection export
└── W4_FrontendBackendConnection_amitpadhan07.pdf  # Frontend-Backend integration PDF
```

---

## ⚙️ Setup and Installation

### Prerequisites
- Node.js (v18.x or later)
- npm or yarn
- MongoDB cluster (or local instance)
- Google Gemini API key

### Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ReviewLensAI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and specify your connections:
   ```env
   # MongoDB Atlas Connection URI
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/reviewlens?retryWrites=true&w=majority

   # Google Gemini API Key
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   Ensure everything compiles cleanly before deploying:
   ```bash
   npm run build
   ```

### Running Backend Server Locally (Express)

1. **Navigate to backend folder**:
   ```bash
   cd backend
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `backend/.env` file with your settings (copy from `backend/.env.example`):
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the server**:
   ```bash
   npm start
   ```
   Or run in hot-reload development mode:
   ```bash
   npm run dev
   ```
   The backend server will run on `http://localhost:5000` and process requests proxied by the Next.js server.

---

## 📖 Additional Documentation

Refer to the following guides in the root directory:
- [API.md](file:///c:/projects/ReviewLensAI/API.md) - Details on API routes, input payloads, and responses.
- [DEPLOYMENT.md](file:///c:/projects/ReviewLensAI/DEPLOYMENT.md) - Detailed cloud deployment guidelines.
- [REPORT.md](file:///c:/projects/ReviewLensAI/REPORT.md) - Project overview, system architectures, database schemas, and diagrams.
- [VIVA.md](file:///c:/projects/ReviewLensAI/VIVA.md) - Preparation guide with answers to common examination questions.
