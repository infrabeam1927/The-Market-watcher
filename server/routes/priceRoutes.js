const express = require('express');
const router = express.Router();
const { getPrice } = require('../controllers/priceController');

router.get('/:symbol', getPrice);

module.exports = router;
