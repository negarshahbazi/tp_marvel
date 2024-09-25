

const express = require("express");
const mustacheExpress = require("mustache-express");
const connection = require('./database'); // Importe la connexion à la base de données
const personnagesRoutes = require('./personnages'); // Importer les routes de personnages
const equipesRoutes = require('./equipes'); // Importer les routes d'équipes

const app = express();

// Configuration de Mustache
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

// Configuration d'Express pour servir les fichiers statiques et traiter les formulaires
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Utiliser les routes
app.use('/personnages', personnagesRoutes); // Routes pour les personnages
app.use('/equipes', equipesRoutes); // Routes pour les équipes

// Lancement du serveur
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
