const symbolInput = document.getElementById("symbolInput");
const resultDiv = document.getElementById("result");
const lastUpdatedEl = document.getElementById("lastUpdated");
const autoRefreshCheckbox = document.getElementById("autoRefresh");

let currentSymbol = "";
let refreshInterval = null;

// Main function to fetch and display price
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
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = `<p style="color: red;">⚠️ ${err.message}</p>`;
    lastUpdatedEl.textContent = "";
  }
}

// Set up auto-refresh every 30 seconds
function setupAutoRefresh() {
  if (refreshInterval) clearInterval(refreshInterval);

  refreshInterval = setInterval(() => {
    if (autoRefreshCheckbox.checked && currentSymbol) {
      fetchPrice();
    }
  }, 30000); // 30 seconds
}

// Start monitoring when checkbox is toggled
autoRefreshCheckbox.addEventListener("change", setupAutoRefresh);

// Kick off auto-refresh on page load
setupAutoRefresh();
