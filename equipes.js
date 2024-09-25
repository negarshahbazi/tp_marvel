const express = require('express');
const router = express.Router();
const connection = require('./database'); // Importe la connexion à la base de données

// Route GET pour afficher la liste des équipes
router.get('/', (req, res) => {
  const query = 'SELECT * FROM equipes';
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des équipes : ", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.render('equipes', { equipes: results });
    }
  });
});

// Route GET pour afficher le formulaire de création d'équipe
router.get('/create', (req, res) => {
  res.render('create-equipe'); // Assurez-vous que create-equipe.mustache existe
});

// Route POST pour traiter la création d'équipe
router.post('/create', (req, res) => {
  const { nom } = req.body;
  const query = 'INSERT INTO equipes (nom) VALUES (?)';
  
  connection.query(query, [nom], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion de l'équipe : ", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.redirect('/equipes');
    }
  });
});

// Route GET pour afficher le formulaire de modification d'équipe
router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM equipes WHERE id = ?';
  
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération de l'équipe : ", err);
      res.status(500).send("Erreur serveur");
    } else if (results.length === 0) {
      res.status(404).send("Équipe non trouvée");
    } else {
      res.render('edit-equipe', { equipe: results[0] }); // Assurez-vous que edit-equipe.mustache existe
    }
  });
});

// Route POST pour traiter la modification d'équipe
router.post('/:id/edit', (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  const query = 'UPDATE equipes SET nom = ? WHERE id = ?';
  
  connection.query(query, [nom, id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour de l'équipe : ", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.redirect('/equipes');
    }
  });
});

// Route POST pour supprimer une équipe
router.post('/:id/delete', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM equipes WHERE id = ?';
  
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de l'équipe : ", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.redirect('/equipes');
    }
  });
});

module.exports = router; // Exporter le routeur
