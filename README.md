# 📊 StockRadar AI

> **Real-Time Multi-Asset Portfolio Tracker, Quantitative Wealth Simulator & Financial Intelligence Dashboard**

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=flat&logo=vercel)](https://stock-radar-six.vercel.app)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python)](https://www.python.org/)
[![Google Gemini API](https://img.shields.io/badge/Google%20Gemini-2.0%20Flash-4285F4?style=flat&logo=google)](https://aistudio.google.com/)

**Live Application:** [https://stock-radar-six.vercel.app](https://stock-radar-six.vercel.app)

---

## 📌 Executive Summary

**StockRadar AI** solves the fragmentation of personal wealth management by integrating multi-market asset tracking (European stocks, US Big Tech, thematic UCITS ETFs) with advanced quantitative modeling. It bridges the gap between daily portfolio monitoring and long-term financial independence planning by combining real-time pricing, Trinity Study safe-withdrawal simulation, tax-aware dividend analytics, and real-time AI market intelligence powered by Google Gemini.

> 🔒 **Privacy & Synthetic Benchmark Data Notice:** All portfolio holdings, capital amounts, allocations, and transaction values presented across this application and repository are **100% simulated mock data (synthetic benchmarks)** created specifically for software engineering demonstration, UI testing, and quantitative modeling. No real personal assets or private financial figures are used.

---

## 🚀 Key Features

### 1. Real-Time Multi-Asset Portfolio Engine
* **Live Price Feeds:** Streams real-time quotes for US equities (Meta, Google, Amazon), European equities (Deutsche Börse `DB1.DE`), and thematic UCITS ETFs (S&P 500 Info Tech `QDVE.DE`, Semiconductors `CHIP.PA`, Nasdaq Biotech `2B70.DE`).
* **Instant P&L & Allocation:** Visualizes asset allocations, invested capital, total profit/loss in euros and percentages, and weighted average dividend yield.
* **Broker Sync Simulation:** Formats and displays exact holding values and cash positions synced with broker accounts (e.g., XTB).

### 2. Quantitative Wealth Simulator & Milestone Engine
* **Compound Interest Modeling:** Dynamic projection calculator supporting customizable monthly regular deposits (e.g., €100/month) and arbitrary capital injections.
* **Three Dynamic Market Scenarios:**
  * 🛡️ **Conservative Base:** Calibrated to historical asset performance (**+13.37% CAGR**).
  * 🚀 **Optimistic (+4%):** Calibrated to high-growth expansion cycles (**+17.37% CAGR**).
  * 🌪️ **Stress-Test (-4%):** Conservative baseline minus 400 bps (**+9.37% CAGR**) to model stagflation or bear markets.
* **Long-Term Horizons:** Pre-calculated milestones for **5 Years (2029)**, **10 Years (2034)**, **20 Years (2044)**, and **30 Years (2054)**.
* **Trinity Study 4% Safe Withdrawal Rule:** Translates projected portfolio value into sustainable monthly passive income without depleting core capital.

### 3. Smart Cash Flow & Dividend Intelligence
* **Accumulating vs. Distributing Separation:** Distinguishes between **UCITS Accumulating ETFs** (which reinvest 100% of dividends internally without annual IRS tax drag) and **Direct Dividend Stocks** (Deutsche Börse, Google, Meta).
* **Cash Flow Breakdown:** Computes exact yearly and monthly cash dividend payouts credited directly to the brokerage balance.

### 4. AI-Powered Financial Copilot (Finteck AI & Stock Analyst)
* **Google Gemini 2.0 Flash Integration:** Direct integration for fundamental analysis, earnings report reactions, and macro commentary.
* **Local Quantitative Fallback:** Autonomous built-in financial modeling engine that guarantees uninterrupted intelligence even without an API key.

### 5. Macroeconomic Radar & Sector Comparison
* **Macro Radar:** Tracks Federal Reserve and ECB interest rate decisions, inflation data, and geopolitical market catalysts.
* **Comparative Overlays:** Interactive SVG and Canvas comparative charting (e.g., Deutsche Börse `DB1.DE` vs. Deutsche Bank `DBK.DE` across 1-month, 10-year, and 20-year horizons).

### 6. Mobile-First Progressive Web Experience
* Fully responsive and optimized for mobile screens.
* Can be pinned to iOS/Android home screens as a standalone web application.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
* **Framework:** React 18 with Vite for blazing-fast HMR and bundle optimization.
* **Styling:** Tailwind CSS with custom editorial and financial typography palettes.
* **Icons:** Lucide React.
* **Persistence:** LocalStorage with versioned migration keys.

### **Backend & APIs**
* **Serverless Functions (Cloud / Vercel):**
  * `/api/my-portfolio-live.js`: Asynchronously fetches real-time market quotes with fallbacks.
  * `/api/macro-news.js`: Aggregates financial and macroeconomic RSS news feeds.
  * `/api/stock.js`: Delivers granular quote and historical data.
* **Local Analytical Engine (Python):**
  * `server.py`: Lightweight HTTP server using `yfinance`, `pandas`, `numpy`, and `scipy.optimize` for quantitative portfolio optimization and Sharpe ratio analysis.

### **System Architecture Flow**
```
┌────────────────────────────────────────────────────────┐
│               Client (React 18 / Vite / PWA)           │
│         PortfolioTab • MyPortfolioTab • FinteckAI      │
└───────────────┬────────────────────────┬───────────────┘
                │                        │
       (Cloud Production)         (Local Development)
                ▼                        ▼
┌───────────────────────────┐  ┌─────────────────────────┐
│ Vercel Serverless / Edge  │  │ Local Python Server     │
│  /api/my-portfolio-live   │  │ (server.py - Port 8000) │
│  /api/macro-news          │  │ yfinance + NumPy/Pandas │
└───────────────┬───────────┘  └─────────────┬───────────┘
                │                            │
                ▼                            ▼
  ┌───────────────────────────┐  ┌───────────────────────┐
  │ Real-Time Yahoo Finance   │  │ Google Gemini 2.0 API │
  │ & European Market Quotes  │  │ (Financial AI Analyst)│
  └───────────────────────────┘  └───────────────────────┘
```

---

## 💻 Getting Started

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **npm:** v9.0.0 or higher
* **Python:** v3.10+ (optional, for local analytical server)

### 1. Clone the Repository
```bash
git clone https://github.com/arcmoura-source/stock-radar.git
cd stockradar-ai
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# (Optional) Install Python dependencies for local quant engine
pip install -r requirements.txt
```

### 3. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env.local
```
*(Optional: Add your free Google Gemini API key if you want direct Gemini 2.0 Flash queries outside the browser UI).*

### 4. Run Locally

**Option A — Automated Launcher (Windows):**
Double-click `iniciar.bat` to automatically spin up both the Vite dev server and the Python API server.

**Option B — Manual Startup:**
```bash
# Terminal 1: Start Frontend
npm run dev

# Terminal 2 (Optional): Start Local Python Engine
python server.py
```
Open `http://localhost:3000` in your browser.

---

## 🚀 Deployment

The project is pre-configured for zero-configuration deployment to **Vercel**:

```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

Or execute `upload-vercel.bat` on Windows for an automated build and deployment pipeline.

---

## 📁 Repository Structure

```
├── api/                        # Vercel serverless functions
│   ├── macro-news.js           # Macroeconomic news RSS feed parser
│   ├── my-portfolio-live.js    # Live multi-symbol market quotes endpoint
│   └── stock.js                # Stock quote & fundamentals endpoint
├── src/
│   ├── components/             # Modular React UI components
│   │   ├── FinteckAiChat.jsx   # Gemini-powered financial assistant
│   │   ├── Header.jsx          # Top navigation and mobile drawer
│   │   ├── MacroNews.jsx       # Macro indicators and live news feed
│   │   ├── MyPortfolioTab.jsx  # Main portfolio, wealth simulator & milestones
│   │   ├── PortfolioTab.jsx    # Macro asset allocation viewer
│   │   ├── StockDetail.jsx     # Deep fundamental breakdown & technicals
│   │   └── StockList.jsx       # Searchable stock universe & watchlist
│   ├── data/
│   │   ├── recommendationsData.js
│   │   ├── stocksData.js
│   │   └── user_portfolio.json # Baseline portfolio holdings & configuration
│   ├── services/
│   │   └── aiAnalyst.js        # Gemini & local quant cognitive engines
│   ├── App.jsx                 # Main application controller
│   └── main.jsx                # Application root entry
├── MODELO_MATEMATICO.md        # Quantitative mathematical documentation
├── requirements.txt            # Python dependencies
├── server.py                   # Local quantitative Python server
├── vercel.json                 # Vercel build & route rewrite configuration
├── vite.config.js              # Vite configuration
└── package.json                # NPM scripts and dependencies
```

---

## ⚖️ Disclaimer & Synthetic Data Disclosure

* **Synthetic / Mock Portfolio:** All portfolio assets, purchase prices, deposit amounts, cash values, and performance statistics shown in this repository and the live demonstration environment are **entirely simulated sample data** used exclusively for software development, architectural testing, and mathematical modeling. They do not represent real personal investments, private accounts, or actual capital.
* **Educational Purpose:** *StockRadar AI is an educational, quantitative modeling, and portfolio-tracking tool created for technical showcasing and software engineering demonstration. None of the projections, calculations, or AI outputs constitute professional financial or tax advice.*

---

## 👤 Author

Developed by **Rita Moura** — [GitHub Profile](https://github.com/arcmoura-source)
