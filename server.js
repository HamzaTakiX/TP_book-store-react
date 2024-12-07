// Import des dépendances nécessaires
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Création de l'application Express
const app = express();

// Configuration des middleware
app.use(cors());  // Permet les requêtes cross-origin
app.use(express.json());  // Parse les requêtes JSON

// Configuration de la connexion MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore_2aci';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion MongoDB:', err));

// Définition des schémas
// Schéma pour les livres
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  price: Number,
  publishedDate: Date
});

// Schéma pour les clients
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  address: String,
  registrationDate: { type: Date, default: Date.now }
});

// Création des modèles
const Book = mongoose.model('Book', bookSchema);
const Client = mongoose.model('Client', clientSchema);

// Routes pour les livres
// GET - Récupérer tous les livres
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des livres" });
  }
});

// GET - Rechercher des livres
app.get('/api/books/search', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const regex = new RegExp(keyword, 'i');
    const books = await Book.find({
      $or: [
        { title: regex },
        { author: regex },
        { description: regex }
      ]
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la recherche des livres" });
  }
});

// GET - Récupérer un livre spécifique
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du livre" });
  }
});

// POST - Ajouter un nouveau livre
app.post('/api/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création du livre" });
  }
});

// PUT - Modifier un livre existant
app.put('/api/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la modification du livre" });
  }
});

// DELETE - Supprimer un livre
app.delete('/api/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.json({ message: "Livre supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du livre" });
  }
});

// Routes pour les clients
// GET - Récupérer tous les clients
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des clients" });
  }
});

// GET - Rechercher des clients
app.get('/api/clients/search', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const regex = new RegExp(keyword, 'i');
    const clients = await Client.find({
      $or: [
        { name: regex },
        { email: regex },
        { phone: regex }
      ]
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la recherche des clients" });
  }
});

// GET - Récupérer un client spécifique
app.get('/api/clients/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du client" });
  }
});

// POST - Ajouter un nouveau client
app.post('/api/clients', async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création du client" });
  }
});

// PUT - Modifier un client existant
app.put('/api/clients/:id', async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClient) {
      return res.status(404).json({ message: "Client non trouvé" });
    }
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la modification du client" });
  }
});

// DELETE - Supprimer un client
app.delete('/api/clients/:id', async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: "Client non trouvé" });
    }
    res.json({ message: "Client supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du client" });
  }
});

// Configuration du port et démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
