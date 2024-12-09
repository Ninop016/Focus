// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let blockedWebsites = [];

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API endpoints
app.get('/api/blocked-websites', (req, res) => {
  res.json({ blockedWebsites });
});

app.post('/api/blocked-websites', (req, res) => {
  const website = req.body.website;
  if (website && !blockedWebsites.includes(website)) {
    blockedWebsites.push(website);
  }
  res.json({ blockedWebsites });
});

app.delete('/api/blocked-websites', (req, res) => {
  const website = req.body.website;
  blockedWebsites = blockedWebsites.filter((site) => site !== website);
  res.json({ blockedWebsites });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});