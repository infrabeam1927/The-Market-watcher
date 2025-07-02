# 📈 Stock Price Tracker

A full-stack web app that allows users to search for real-time stock prices using a simple frontend interface and a RESTful backend API. The API is documented using Swagger and fetches live data from the Twelve Data API.

---

## 🧩 Features

- 🔍 Search real-time stock prices by symbol (e.g., TSLA, AAPL, MSFT)
- 📋 See your 5 most recent stock searches and their prices
- 🔄 Auto-refresh functionality every 30 seconds (optional toggle)
- 🌐 REST API with Swagger documentation
- 💾 `.env`-based API key storage
- 🧭 CORS-enabled cross-origin communication
- 🎨 Clean, responsive frontend using HTML/CSS/JS

---

## ⚙️ Tech Stack

**Client:**  
- HTML, CSS, JavaScript

**Server:**  
- Node.js, Express.js  
- Axios (for fetching stock data)  
- CORS  
- Swagger (via swagger-ui-express)  
- dotenv (for environment variables)

**Data Source:**  
- [Twelve Data API](https://twelvedata.com)

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/stock-price-tracker.git
cd stock-price-tracker
```

### 2. Set Up Backend

```bash
cd server
npm install
```

Create a `.env` file:

```bash
PORT=5000
TWELVE_API_KEY=your_api_key_here
```

Start the backend:

```bash
node app.js
```

### 3. Set up Frontend

```bash
cd ../client
# Open index.html in your browser
```

---

## 📡 Usage

### 🔗 API Endpoint

**GET** `/api/prices/:symbol`

**Example:**

```
GET http://localhost:5000/api/prices/TSLA
```

**Response:**

```json
{
  "symbol": "TSLA",
  "price": "244.73"
}
```

---



## 📦 Future Improvements

- 📊 Add 7-day historical price chart  
- 🔄 Auto-refresh toggle and improved UI feedback  
- 🌙 Dark mode for UI  
- 🖱️ Clickable recent search entries  
- 💾 Save recent searches using localStorage  
- 🚀 Deploy client to GitHub Pages and backend to Render

---

## 🪪 License

This project is licensed under the MIT License.

---

**Made with ❤️ by Aaditya Senthilkumar**a