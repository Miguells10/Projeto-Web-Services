import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Table, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClientes = async () => {
    try {
      const res = await axios.get('/api/clientes');
      setClientes(res.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleDelete = async id => {
    if (window.confirm('Deseja realmente excluir?')) {
      await axios.delete(`/api/clientes/${id}`);
      fetchClientes();
    }
  };

  return (
    <Container>
      <h2>Clientes</h2>
      <Link to="/clientes/new">
        <Button color="primary" className="mb-3">
          <FontAwesomeIcon icon="plus" /> Novo Cliente
        </Button>
      </Link>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c: any) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <Link to={`/clientes/${c.id}/edit`}>
                    <Button size="sm" color="info" className="me-1">
                      <FontAwesomeIcon icon="pencil-alt" />
                    </Button>
                  </Link>
                  <Button size="sm" color="danger" onClick={() => handleDelete(c.id)}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ClienteList;
