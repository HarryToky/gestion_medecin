const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./db");

const app = express();
app.use(bodyParser.json());

app.post("/ajouterMedecin", async (req, res) => {
  try {
    const { numero_medecin, nom, nombre_jour, taux_journalier } = req.body;

    const nouveauMedecin = await pool.query(
      "INSERT INTO medecin (numero_medecin, nom, nombre_jour, taux_journalier) VALUES ($1, $2, $3, $4)",
      [numero_medecin, nom, nombre_jour, taux_journalier]
    );
    res.json(nouveauMedecin.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
});

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});

app.get("/afficherMedecins", async (req, res) => {
  try {
    const medecins = await pool.query(
      'SELECT numero_medecin, nom, nombre_jour, taux_journalier, nombre_jour * taux_journalier AS prestation FROM medecin'
    );
    res.json(medecins.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
});

app.put("/modifierMedecin/:id", async (req, res) => {
  const { id } = req.params;
  const { numero_medecin, nom, nombre_jour, taux_journalier } = req.body;
  try {
    await pool.query(
      "UPDATE medecin SET numero_medecin = $1, nom = $2, nombre_jour = $3, taux_journalier = $4 WHERE id = $5",
      [numero_medecin, nom, nombre_jour, taux_journalier, id]
    );
    res.json("Médecin mis à jour avec succès");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
});

app.delete("/supprimerMedecin/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteMedecin = await pool.query(
      "DELETE FROM medecin WHERE id = $1",
      [id]
    );
    res.json("Médecin supprimé avec succès");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
});
