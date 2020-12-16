require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require("dns");
const app = express();

// Basic Configuration
const port = /*process.env.PORT ||*/ 3000; //DESCOMENTAR ANTES DE MANDAR A GITHUB

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

//GET
app.get('/api/shorturl/:short_url', function(req,res){
  // Redirigir a la pagina original.
});

//POST
app.post('/api/shorturl/new', function(req,res){
  let originalUrl = req.body;
  dns.lookup(originalUrl,function (err) {
      if (err) {
        res.json({ error: 'invalid url' });
      }
    });
  // Chequar si la url es valida, 
  //  y si esta en la base de datos.
  // Si no es valida devolver un JSON con error.
  // Si es valida, devolver JSON con:
  // - url original.
  // - identificador de la url corta.
});

//LISTEN
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
