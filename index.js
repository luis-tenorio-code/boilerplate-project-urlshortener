require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// Middleware para analizar solicitudes POST JSON
app.use(express.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Ruta para recibir URL larga y generar URL corta
app.post('/api/shorturl', (req, res) => {
    const originalUrl = req.body.url;
    // Aquí implementa la lógica para acortar la URL
    // Devuelve la URL original y la URL corta en formato JSON
    res.json({ original_url: originalUrl, short_url: '1' });
});
// Ruta para redirigir la URL corta a la URL original
app.get('/api/shorturl/:shortUrl', (req, res) => {
    const shortUrl = req.params.shortUrl;
    // Aquí implementa la lógica para redirigir a la URL original
    res.redirect('https://www.example.com');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
