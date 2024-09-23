const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// JSON kérés kezeléséhez
app.use(bodyParser.json());

app.post('/track', (req, res) => {
  const visitData = req.body;

  // Naplózás fájlba
  fs.appendFile('visits.log', JSON.stringify(visitData) + '\n', err => {
    if (err) {
      console.error('Hiba a naplózás közben:', err);
      return res.status(500).send('Hiba történt');
    }
    res.status(200).send('Adat fogadva');
  });
});

// Szerver futtatása
app.listen(3000, () => {
  console.log('Nyomkövető szerver fut a 3000-es porton');
});
