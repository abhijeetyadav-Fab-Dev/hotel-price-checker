const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const MMT_API_BASE = 'https://connect.mmtapi.com/price';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint to avoid CORS issues
app.get('/api/price', async (req, res) => {
  const { hotelId, date } = req.query;

  if (!hotelId || !date) {
    return res.status(400).json({ error: 'Missing hotelId or date' });
  }

  try {
    const response = await axios.get(MMT_API_BASE, {
      params: { hotelId, date },
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching ${hotelId} for ${date}:`, error.message);
    res.status(500).json({
      error: error.message,
      hotelId,
      date,
      status: error.response?.status
    });
  }
});

const http = require('http');
const https = require('https');

// Enable HTTP Keep-Alive to reuse TCP connections. 
// This is a massive legitimate speedup because it avoids a new TLS handshake for every single request.
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 50 });
const apiClient = axios.create({ httpAgent, httpsAgent });

// Bulk fetch endpoint
app.post('/api/prices/bulk', async (req, res) => {
  const { hotelIds, date } = req.body;

  if (!hotelIds || !Array.isArray(hotelIds) || hotelIds.length === 0 || !date) {
    return res.status(400).json({ error: 'Invalid request: need hotelIds array and date' });
  }

  const results = [];
  const concurrency = 5; // Steady concurrency limit to respect API rate limits

  async function fetchWithRetry(hotelId, date, retries = 4) {
    for (let i = 0; i <= retries; i++) {
      try {
        const response = await apiClient.get(MMT_API_BASE, {
          params: { hotelId, date },
          timeout: 15000,
          headers: { 
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        return { hotelId, success: true, data: response.data };
      } catch (error) {
        if (error.response?.status === 429 && i < retries) {
          const baseWait = 3000 * Math.pow(1.5, i); 
          const jitter = Math.random() * 1000;
          await new Promise(r => setTimeout(r, baseWait + jitter));
          continue;
        }
        return {
          hotelId,
          success: false,
          error: error.message,
          status: error.response?.status
        };
      }
    }
  }

  let i = 0;
  async function worker() {
    while (i < hotelIds.length) {
      const current = i++;
      const result = await fetchWithRetry(hotelIds[current], date);
      results.push(result);
      await new Promise(r => setTimeout(r, 50)); 
    }
  }

  const workers = [];
  for (let w = 0; w < concurrency; w++) {
    workers.push(worker());
  }
  await Promise.all(workers);

  res.json({ date, results });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
  });
}

module.exports = app;