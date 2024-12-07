import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">Gestion Librairie</Link>
            <div className="navbar-nav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/books">
                    Livres
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/books/add">
                    Ajouter un livre
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/clients">
                    Clients
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/clients/add">
                    Ajouter un client
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/add" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/add" element={<ClientForm />} />
          <Route path="/clients/edit/:id" element={<ClientForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
