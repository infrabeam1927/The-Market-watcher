const symbolInput = document.getElementById("symbolInput");
const resultDiv = document.getElementById("result");
const lastUpdatedEl = document.getElementById("lastUpdated");
const autoRefreshCheckbox = document.getElementById("autoRefresh");
const recentList = document.getElementById("recentList");

let currentSymbol = "";
let refreshInterval = null;
let recentSearches = [];

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  fetchPrice();
}

// Main fetch function (with cache logic)
async function fetchPrice() {
  const symbol = symbolInput.value.trim().toUpperCase();
  if (!symbol) {
    resultDiv.innerHTML = `<p style="color: red;">Please enter a stock symbol.</p>`;
    return;
  }

  currentSymbol = symbol;

  // Check cache
  const cached = localStorage.getItem(symbol);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    const age = Date.now() - timestamp;

    if (age < CACHE_DURATION) {
      console.log("🔁 Using cached data for", symbol);
      displayPrice(data);
      return;
    } else {
      localStorage.removeItem(symbol); // clear stale cache
    }
  }

  try {
    const res = await fetch(`http://localhost:5000/api/prices/${symbol}`);
    if (!res.ok) throw new Error("Failed to fetch stock price");

    const data = await res.json();

    // Save to cache
    localStorage.setItem(symbol, JSON.stringify({
      data,
      timestamp: Date.now()
    }));

    displayPrice(data);
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = `<p style="color: red;">⚠️ ${err.message}</p>`;
    lastUpdatedEl.textContent = "";
  }
}

// Display price and update recent list
function displayPrice(data) {
  resultDiv.innerHTML = `
    <h2>${data.symbol}</h2>
    <p>💵 Price: $${data.price}</p>
  `;

  const now = new Date();
  lastUpdatedEl.textContent = `Last updated: ${now.toLocaleTimeString()}`;

  const existing = recentSearches.find(item => item.symbol === data.symbol);
  if (existing) {
    existing.price = data.price;
  } else {
    recentSearches.unshift({ symbol: data.symbol, price: data.price });
    if (recentSearches.length > 5) recentSearches.pop();
  }

  renderRecentSearches();
}

// Render clickable recent search buttons
function renderRecentSearches() {
  recentList.innerHTML = "";

  recentSearches.forEach(item => {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    btn.textContent = `${item.symbol} - $${item.price}`;
    btn.addEventListener("click", () => {
      symbolInput.value = item.symbol;
      fetchPrice();
    });

    li.appendChild(btn);
    recentList.appendChild(li);
  });
}

// Auto-refresh logic
function setupAutoRefresh() {
  if (refreshInterval) clearInterval(refreshInterval);

  refreshInterval = setInterval(() => {
    if (autoRefreshCheckbox.checked && currentSymbol) {
      fetchPrice();
    }
  }, 30000); // every 30 seconds
}

autoRefreshCheckbox.addEventListener("change", setupAutoRefresh);
setupAutoRefresh();
