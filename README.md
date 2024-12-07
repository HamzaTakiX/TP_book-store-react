# Book Store Management System

Une application web complète pour la gestion d'une librairie, permettant de gérer les livres et les clients.

## 🚀 Fonctionnalités

### Gestion des Livres
- ✨ Liste des livres avec recherche en temps réel
- ➕ Ajout de nouveaux livres
- 📝 Modification des livres existants
- 🗑️ Suppression de livres (avec confirmation)
- 🔍 Recherche de livres
- 🔄 Tri par titre, auteur, et prix

### Gestion des Clients
- 👥 Liste des clients avec recherche en temps réel
- ➕ Ajout de nouveaux clients
- 📝 Modification des informations clients
- 🗑️ Suppression de clients (avec confirmation)
- 🔍 Recherche de clients
- 🔄 Tri par nom et email

## 🛠️ Technologies Utilisées

### Frontend
- **React** - Framework JavaScript pour l'interface utilisateur
- **React Router** - Gestion du routage
- **Axios** - Client HTTP pour les requêtes API
- **Bootstrap** - Framework CSS pour le design responsive

### Backend
- **Node.js** - Environnement d'exécution JavaScript
- **Express** - Framework web pour Node.js
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (v4 ou supérieur)
- npm ou yarn

## 🚀 Installation

1. **Cloner le repository**
   ```bash
   git clone [url-du-repo]
   ```

2. **Installation des dépendances du backend**
   ```bash
   cd Tp_book_store
   npm install
   ```

3. **Installation des dépendances du frontend**
   ```bash
   cd client
   npm install
   ```

4. **Configuration de la base de données**
   - Créer un fichier `.env` à la racine du projet
   - Ajouter la configuration suivante :
     ```
     MONGODB_URI=mongodb://localhost:27017/bookstore_2aci
     PORT=5000
     ```

## 🎯 Démarrage de l'application

1. **Démarrer MongoDB**
   ```bash
   mongod
   ```

2. **Démarrer le serveur backend**
   ```bash
   cd Tp_book_store
   npm start
   ```

3. **Démarrer le frontend**
   ```bash
   cd client
   npm start
   ```

L'application sera accessible à l'adresse : http://localhost:3000

## 📚 Structure du Projet

```
Tp_book_store/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── App.js         # Composant principal
│   │   └── index.js       # Point d'entrée React
│   └── package.json       # Dépendances frontend
├── server.js              # Point d'entrée backend
├── package.json           # Dépendances backend
└── README.md             # Documentation
```

## 🔄 API Endpoints

### Livres
- `GET /api/books` - Récupérer tous les livres
- `GET /api/books/search` - Rechercher des livres
- `GET /api/books/:id` - Récupérer un livre spécifique
- `POST /api/books` - Ajouter un nouveau livre
- `PUT /api/books/:id` - Modifier un livre
- `DELETE /api/books/:id` - Supprimer un livre

### Clients
- `GET /api/clients` - Récupérer tous les clients
- `GET /api/clients/search` - Rechercher des clients
- `GET /api/clients/:id` - Récupérer un client spécifique
- `POST /api/clients` - Ajouter un nouveau client
- `PUT /api/clients/:id` - Modifier un client
- `DELETE /api/clients/:id` - Supprimer un client

## 🎨 Fonctionnalités UI

- Interface responsive
- Messages de confirmation/erreur
- Validation des formulaires
- Tri des données
- Recherche en temps réel
- Navigation intuitive

## 🔒 Sécurité
- Validation des données
- Gestion des erreurs
- Messages d'erreur utilisateur
- Protection CORS

## 🔜 Améliorations Futures Possibles

- Authentification utilisateur
- Pagination des résultats
- Filtres avancés
- Statistiques et tableaux de bord
- Gestion des stocks
- Système de commandes
