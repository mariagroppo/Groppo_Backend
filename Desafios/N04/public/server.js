const express = require('express');
const router = require('./recurso.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

const PORT = 8080;

const server = app.listen(PORT, () => console.log(`Servidor http escuchando en el puerto ${server.address().port} usando express`));

server.on("error", err => console.log(`Error: ${err}`));

app.use ('api', router);
