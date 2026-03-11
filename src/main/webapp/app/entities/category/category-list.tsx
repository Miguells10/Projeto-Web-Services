import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'reactstrap';

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/categories').then(res => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Container>
      <h2>Categorias</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Qtd Produtos</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c: any) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.products?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default CategoryList;
