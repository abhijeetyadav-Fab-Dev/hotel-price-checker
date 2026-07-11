const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;

const MMT_API_BASE = 'https://connect.mmtapi.com/price';

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

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

// Google Sheets writing endpoint using service account key
app.post('/api/google-sheets/write', async (req, res) => {
  const { spreadsheetId, sheetName, data } = req.body;
  if (!spreadsheetId || !data || !Array.isArray(data)) {
    return res.status(400).json({ error: 'Missing spreadsheetId or data array' });
  }

  const keyPath = 'C:\\Users\\CS05180\\Downloads\\sujeet_key (1).json';
  if (!fs.existsSync(keyPath)) {
    return res.status(500).json({ error: `Service account key not found at: ${keyPath}` });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Target a specific sheet name if provided, or default to "PLB_VDI_Report"
    const targetSheet = sheetName || 'PLB_VDI_Report';
    const targetRange = `${targetSheet}!A1`;

    // Fetch spreadsheet metadata to check if the sheet already exists
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    
    const sheetExists = spreadsheet.data.sheets.some(
      s => s.properties.title === targetSheet
    );

    // If the sheet does not exist, add it
    if (!sheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: targetSheet,
                },
              },
            },
          ],
        },
      });
    } else {
      // Clear target sheet first
      try {
        await sheets.spreadsheets.values.clear({
          spreadsheetId,
          range: `${targetSheet}!A1:Z1000`,
        });
      } catch (clearErr) {
        console.warn('Could not clear sheet values:', clearErr.message);
      }
    }

    // Write the new dataset
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: targetRange,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: data,
      },
    });

    res.json({ success: true, updatedCells: response.data.updatedCells, sheetName: targetSheet });
  } catch (error) {
    console.error('Google Sheets API Error:', error);
    res.status(500).json({ error: error.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
  });
}

module.exports = app;