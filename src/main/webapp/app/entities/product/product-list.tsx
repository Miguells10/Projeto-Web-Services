import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Badge, Container } from 'reactstrap';

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products').then(res => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Container>
      <h2>Produtos</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Categorias</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: any) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>R$ {p.price?.toFixed(2)}</td>
                <td>
                  {p.categories?.map((cat: any) => (
                    <Badge key={cat.id} color="info" className="me-1">
                      {cat.name}
                    </Badge>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ProductList;
