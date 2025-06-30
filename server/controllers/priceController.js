const axios = require('axios');

const getPrice = async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const apiKey = process.env.TWELVE_API_KEY;

  try {
    const response = await axios.get(`https://api.twelvedata.com/price`, {
      params: {
        symbol: symbol,
        apikey: apiKey
      }
    });

    if (response.data && response.data.price) {
      return res.json({ symbol, price: response.data.price });
    } else {
      return res.status(404).json({ error: 'Symbol not found or API error' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error or invalid API response' });
  }
};

module.exports = { getPrice };
