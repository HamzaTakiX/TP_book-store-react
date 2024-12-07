import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    publishedDate: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(response.data);
    } catch (error) {
      setMessage({ text: 'Erreur lors du chargement du livre', type: 'danger' });
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/books/${id}`, book);
        setMessage({ text: 'Livre modifié avec succès!', type: 'success' });
      } else {
        await axios.post('http://localhost:5000/api/books', book);
        setMessage({ text: 'Livre ajouté avec succès!', type: 'success' });
      }
      setTimeout(() => {
        navigate('/books');
      }, 2000);
    } catch (error) {
      setMessage({ 
        text: 'Erreur lors de l\'enregistrement du livre. Veuillez réessayer.', 
        type: 'danger' 
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Modifier le livre' : 'Ajouter un nouveau livre'}</h2>
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
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Titre</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Auteur</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={book.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Prix</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={book.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date de publication</label>
          <input
            type="date"
            className="form-control"
            name="publishedDate"
            value={book.publishedDate ? book.publishedDate.split('T')[0] : ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
