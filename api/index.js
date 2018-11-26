const express = require('express');
const app = express();
const routes = require('./routes/menu'); 

// Import API Routes
app.use(routes);

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}

