app/server.js
 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
 
// Health check endpoint — this is what ALB and K8s readiness probes hit
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: process.env.APP_VERSION || '1.0.0',
    timestamp: new Date().toISOString()
  });
});
 
// Main endpoint
app.get('/', (req, res) => {
  res.json({ message: 'SRE Platform App', env: process.env.NODE_ENV });
});
 
// Metrics endpoint for Prometheus to scrape
app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('# HELP app_requests_total Total requests\napp_requests_total 1\n');
});
 
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
