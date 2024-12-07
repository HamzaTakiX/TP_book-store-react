import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      searchBooks();
    } else {
      fetchBooks();
    }
  }, [searchTerm]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      setMessage({ 
        text: 'Erreur lors du chargement des livres', 
        type: 'danger' 
      });
    }
  };

  const searchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/search?keyword=${searchTerm}`);
      setBooks(response.data);
    } catch (error) {
      setMessage({ 
        text: 'Erreur lors de la recherche', 
        type: 'danger' 
      });
    }
  };

  const deleteBook = async (id, title) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le livre "${title}" ?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        setMessage({ 
          text: 'Livre supprimé avec succès!', 
          type: 'success' 
        });
        fetchBooks();
      } catch (error) {
        setMessage({ 
          text: 'Erreur lors de la suppression du livre', 
          type: 'danger' 
        });
      }
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedBooks = [...books].sort((a, b) => {
      if (key === 'price') {
        return direction === 'asc' 
          ? a[key] - b[key]
          : b[key] - a[key];
      } else {
        return direction === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });
    setBooks(sortedBooks);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
    <div className="container mt-4">
      {message.text && (
        <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
          {message.text}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setMessage({ text: '', type: '' })}
          ></button>
        </div>
      )}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher un livre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <button 
          className="btn btn-outline-primary me-2"
          onClick={() => handleSort('title')}
        >
          Trier par Titre{getSortIcon('title')}
        </button>
        <button 
          className="btn btn-outline-primary me-2"
          onClick={() => handleSort('author')}
        >
          Trier par Auteur{getSortIcon('author')}
        </button>
        <button 
          className="btn btn-outline-primary"
          onClick={() => handleSort('price')}
        >
          Trier par Prix{getSortIcon('price')}
        </button>
      </div>
      <div className="row">
        {books.map((book) => (
          <div key={book._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="book-details">
                  <h5 className="card-title mb-3">
                    <strong>Titre:</strong> {book.title}
                  </h5>
                  <h6 className="card-subtitle mb-3">
                    <strong>Auteur:</strong> {book.author}
                  </h6>
                  <p className="card-text mb-3">
                    <strong>Description:</strong><br />
                    {book.description || 'Aucune description disponible'}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Prix:</strong> {book.price ? `${book.price} €` : 'Non spécifié'}
                  </p>
                  {book.publishedDate && (
                    <p className="card-text mb-3">
                      <strong>Date de publication:</strong>{' '}
                      {new Date(book.publishedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <a href={`/books/edit/${book._id}`} className="btn btn-primary">
                    Modifier
                  </a>
                  <button
                    onClick={() => deleteBook(book._id, book.title)}
                    className="btn btn-danger"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
