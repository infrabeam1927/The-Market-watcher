const symbolInput = document.getElementById("symbolInput");
const resultDiv = document.getElementById("result");
const lastUpdatedEl = document.getElementById("lastUpdated");
const autoRefreshCheckbox = document.getElementById("autoRefresh");
const recentList = document.getElementById("recentList");

let currentSymbol = "";
let refreshInterval = null;
let recentSearches = [];

// Handle form submission (for Enter key or button)
function handleFormSubmit(event) {
  event.preventDefault();
  fetchPrice();
}

// Fetch and display price
async function fetchPrice() {
  const symbol = symbolInput.value.trim().toUpperCase();
  if (!symbol) {
    resultDiv.innerHTML = `<p style="color: red;">Please enter a stock symbol.</p>`;
    return;
  }

  currentSymbol = symbol;

  try {
    const res = await fetch(`http://localhost:5000/api/prices/${symbol}`);
    if (!res.ok) throw new Error("Failed to fetch stock price");
    const data = await res.json();

    resultDiv.innerHTML = `
      <h2>${data.symbol}</h2>
      <p>💵 Price: $${data.price}</p>
    `;

    const now = new Date();
    lastUpdatedEl.textContent = `Last updated: ${now.toLocaleTimeString()}`;

    // Update recent searches list
    const existing = recentSearches.find(item => item.symbol === symbol);
    if (existing) {
      existing.price = data.price;
    } else {
      recentSearches.unshift({ symbol, price: data.price });
      if (recentSearches.length > 5) recentSearches.pop();
    }

    renderRecentSearches();
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = `<p style="color: red;">⚠️ ${err.message}</p>`;
    lastUpdatedEl.textContent = "";
  }
}

// Render recent searches as buttons
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

// Auto-refresh
function setupAutoRefresh() {
  if (refreshInterval) clearInterval(refreshInterval);

  refreshInterval = setInterval(() => {
    if (autoRefreshCheckbox.checked && currentSymbol) {
      fetchPrice();
    }
  }, 30000);
}

autoRefreshCheckbox.addEventListener("change", setupAutoRefresh);
setupAutoRefresh();
