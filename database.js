// Importer le module MySQL
const mysql = require("mysql");

// Créer une connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Remplace par ton nom d'utilisateur MySQL
  password: '', // Remplace par ton mot de passe MySQL si nécessaire
  database: 'marvel'
});

// Établir la connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données : ", err);
    return;
  }
  console.log("Connecté à la base de données MySQL !");
});

// Exporter la connexion pour l'utiliser dans d'autres modules
module.exports = connection;