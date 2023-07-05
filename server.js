require("rootpath")();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const errorHandler = require("_middleware/error-handler");
const port = process.env.PORT || 3004;

/* On crée les constantes pour utiliser le serveur https */
const fs = require('fs');
const path = require('path');
const https = require('https');
 
/* On récupère notre clé privée et notre certificat (ici ils se trouvent dans le dossier certificate) */
const key = fs.readFileSync(path.join(__dirname, 'certificate', 'server.key'));
const cert = fs.readFileSync(path.join(__dirname, 'certificate', 'server.cert'));
 
const options = { key, cert };
 
/* Puis on crée notre serveur HTTPS */
https.createServer(options, app).listen(8080, () => {
  console.log('App is running ! Go to https://localhost:8080');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/users", require("./users/user.controller"));

// global error handler
app.use(errorHandler);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "dsimed",
});

module.exports = { app, port, db };
