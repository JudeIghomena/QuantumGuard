const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const expressWs = require('express-ws');
const app = express();
expressWs(app);

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define routes
const authRoutes = require('./routes/auth');
const networkRoutes = require('./routes/network');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/network', networkRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const server = http.createServer(app);
app.ws('/api/network/status-stream', (ws, req) => {
  // Example: Send real-time network status updates
  setInterval(() => {
    const randomStatus = Math.random() < 0.5 ? 'Online' : 'Offline';
    ws.send(JSON.stringify({ status: randomStatus }));
  }, 5000);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
