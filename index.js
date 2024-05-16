require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// Middleware para analizar solicitudes POST JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Objeto para almacenar las URL originales y sus URL cortas correspondientes
const urlDatabase = {};

// middleware para validar la URL
const validateUrl = (req, res, next) => {
  const { url } = req.body;
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  if (urlRegex.test(url)) {
    next();
  } else {
    res.json({ error: 'invalid URL' });
  }
};

// Ruta para recibir URL larga y generar URL corta
app.post('/api/shorturl', validateUrl, (req, res) => {
  // Puedes POST una URL a /api/shorturl y obtener una respuesta JSON con propiedades original_url y short_url. Aquí hay un ejemplo: { original_url : 'https://freeCodeCamp.org', short_url : 1}.
  const { url } = req.body;
  const shortUrl = crypto.randomUUID();
  urlDatabase[shortUrl] = url;
  res.json({ original_url: url, short_url: shortUrl });
});

// Ruta para redirigir la URL corta a la URLoriginal
app.get('/api/shorturl/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;
  const url = urlDatabase[shortUrl];
  if (url) {
    res.redirect(url);
  } else res.json({ error: 'No short URL found for the given input' });
});

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
