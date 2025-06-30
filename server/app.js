const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const priceRoutes = require('./routes/priceRoutes');
const swaggerDocument = require('./swagger/swagger.json');

dotenv.config();

const app = express();

// ✅ Enable CORS before defining routes
app.use(cors());
app.use(express.json());

app.use('/api/prices', priceRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
