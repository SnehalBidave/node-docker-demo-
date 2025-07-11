const express = require('express');
const app = express();

// App Version
const APP_VERSION = "1.0.0";

// Define port (default: 3000)
const PORT = process.env.PORT || 3000;

// Root endpoint
app.get('/', (req, res) => {
    res.send(`
        <h1>🚀 Node.js App Running in Docker!</h1>
        <p><strong>Version:</strong> ${APP_VERSION}</p>
        <p><strong>Host:</strong> ${req.hostname}</p>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ App (v${APP_VERSION}) is running on port ${PORT}`);
});
