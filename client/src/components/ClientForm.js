import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ClientForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [client, setClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (id) {
      fetchClient();
    }
  }, [id]);

  const fetchClient = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/clients/${id}`);
      setClient(response.data);
    } catch (error) {
      setMessage({ text: 'Erreur lors du chargement du client', type: 'danger' });
    }
  };

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/clients/${id}`, client);
        setMessage({ text: 'Client modifié avec succès!', type: 'success' });
      } else {
        await axios.post('http://localhost:5000/api/clients', client);
        setMessage({ text: 'Client ajouté avec succès!', type: 'success' });
      }
      setTimeout(() => {
        navigate('/clients');
      }, 2000);
    } catch (error) {
      setMessage({ 
        text: 'Erreur lors de l\'enregistrement du client. Veuillez réessayer.', 
        type: 'danger' 
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Modifier le client' : 'Ajouter un nouveau client'}</h2>
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
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={client.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={client.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Téléphone</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={client.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Adresse</label>
          <textarea
            className="form-control"
            name="address"
            value={client.address}
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

export default ClientForm;
