import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      searchClients();
    } else {
      fetchClients();
    }
  }, [searchTerm]);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clients');
      setClients(response.data);
    } catch (error) {
      setMessage({ 
        text: 'Erreur lors du chargement des clients', 
        type: 'danger' 
      });
    }
  };

  const searchClients = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/clients/search?keyword=${searchTerm}`);
      setClients(response.data);
    } catch (error) {
      setMessage({ 
        text: 'Erreur lors de la recherche', 
        type: 'danger' 
      });
    }
  };

  const deleteClient = async (id, name) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le client "${name}" ?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/clients/${id}`);
        setMessage({ 
          text: 'Client supprimé avec succès!', 
          type: 'success' 
        });
        fetchClients();
      } catch (error) {
        setMessage({ 
          text: 'Erreur lors de la suppression du client', 
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

    const sortedClients = [...clients].sort((a, b) => {
      return direction === 'asc'
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    });
    setClients(sortedClients);
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
          placeholder="Rechercher un client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <button 
          className="btn btn-outline-primary me-2"
          onClick={() => handleSort('name')}
        >
          Trier par Nom{getSortIcon('name')}
        </button>
        <button 
          className="btn btn-outline-primary me-2"
          onClick={() => handleSort('email')}
        >
          Trier par Email{getSortIcon('email')}
        </button>
      </div>
      <div className="row">
        {clients.map((client) => (
          <div key={client._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{client.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{client.email}</h6>
                {client.phone && (
                  <p className="card-text">
                    <strong>Téléphone:</strong> {client.phone}
                  </p>
                )}
                {client.address && (
                  <p className="card-text">
                    <strong>Adresse:</strong> {client.address}
                  </p>
                )}
                <p className="card-text">
                  <strong>Date d'inscription:</strong>{' '}
                  {new Date(client.registrationDate).toLocaleDateString()}
                </p>
                <div className="d-flex justify-content-between">
                  <a href={`/clients/edit/${client._id}`} className="btn btn-primary">
                    Modifier
                  </a>
                  <button
                    onClick={() => deleteClient(client._id, client.name)}
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

export default ClientList;
