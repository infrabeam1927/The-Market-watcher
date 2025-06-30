async function fetchPrice() {
  const symbol = document.getElementById('symbolInput').value.toUpperCase();
  const resultDiv = document.getElementById('result');

  if (!symbol) {
    resultDiv.innerText = "Please enter a symbol.";
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/prices/${symbol}`);
    const data = await response.json();

    if (data.price) {
      resultDiv.innerHTML = `<strong>${data.symbol}:</strong> $${data.price}`;
    } else {
      resultDiv.innerText = data.error || "Symbol not found.";
    }
  } catch (error) {
    resultDiv.innerText = "Error fetching data.";
  }
}
