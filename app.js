const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes.js');
// const errorHandler = require('./middlewares/errorHandler'); // Optional

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/products', productRoutes);

// Error Handling (Optional)
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});