
const express = require('express');
const router = express.Router();
const connection = require('./database'); // Importe la connexion à la base de données

// Route GET pour afficher la liste des personnages
router.get('/', (req, res) => {
  const query = `
    SELECT personnages.id, personnages.nom, personnages.description, personnages.photo, equipes.nom AS equipe
    FROM personnages
    LEFT JOIN equipes ON personnages.equipe_id = equipes.id
  `;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des personnages : ", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.render('personnages', { personnages: results });
    }
  });
});


// Route GET pour afficher le formulaire de création de personnage
router.get('/create', (req, res) => {
  connection.query('SELECT * FROM equipes', (err, equipes) => {
    if (err) {
      console.error("Erreur lors de la récupération des équipes : ", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.render('create', { equipes });
    }
  });
});

// Route POST pour traiter la création du personnage
router.post('/create', (req, res) => {
  const { nom, description, photo, equipe_id } = req.body;
  const query = `
    INSERT INTO personnages (nom, description, photo, equipe_id)
    VALUES (?, ?, ?, ?)
  `;
  
  connection.query(query, [nom, description, photo, equipe_id || null], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion du personnage : ", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.redirect('/personnages');
    }
  });
});



// Route GET pour afficher les détails d'un personnage
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = `
      SELECT personnages.nom, personnages.description, personnages.photo, equipes.nom AS equipe
      FROM personnages
      LEFT JOIN equipes ON personnages.equipe_id = equipes.id
      WHERE personnages.id = ?
    `;
    
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération du personnage : ", err);
        res.status(500).send("Erreur serveur");
      } else if (results.length === 0) {
        res.status(404).send("Personnage non trouvé");
      } else {
        res.render('personnage-detail', results[0]);
      }
    });
  });

  
  
// Route GET pour afficher le formulaire de modification d'un personnage
router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  const queryPersonnage = `SELECT * FROM personnages WHERE id = ?`;
  const queryEquipes = `SELECT * FROM equipes`;
  
  connection.query(queryPersonnage, [id], (err, personnage) => {
    if (err) {
      console.error("Erreur lors de la récupération du personnage : ", err);
      res.status(500).send("Erreur serveur");
    } else if (personnage.length === 0) {
      res.status(404).send("Personnage non trouvé");
    } else {
      connection.query(queryEquipes, (err, equipes) => {
        if (err) {
          console.error("Erreur lors de la récupération des équipes : ", err);
          res.status(500).send("Erreur serveur");
        } else {
          res.render('edit', { personnage: personnage[0], equipes });
        }
      });
    }
  });
});

// Route POST pour mettre à jour un personnage
router.post('/:id/edit', (req, res) => {
  const id = req.params.id;
  const { nom, description, photo, equipe_id } = req.body;
  const query = `
    UPDATE personnages
    SET nom = ?, description = ?, photo = ?, equipe_id = ?
    WHERE id = ?
  `;
  
  connection.query(query, [nom, description, photo, equipe_id || null, id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du personnage : ", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.redirect('/personnages');
    }
  });
});

// Route POST pour supprimer un personnage
router.post('/:id/delete', (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM personnages WHERE id = ?`;
  
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression du personnage : ", err);
      res.status(500).send("Erreur serveur");
    } else {
      res.redirect('/personnages');
    }
  });
});

module.exports = router; // Exporter le routeur
