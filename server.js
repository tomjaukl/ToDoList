const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servíruje všechny soubory ve složce projektu (index.html, style.css, script.js, img/)
app.use(express.static(__dirname));

// Hlavní stránka
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
