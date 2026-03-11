import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Badge, Container } from 'reactstrap';

const statusColors = {
  WAITING_PAYMENT: 'warning',
  PAID: 'success',
  SHIPPED: 'info',
  DELIVERED: 'primary',
  CANCELED: 'danger',
};

export const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/orders').then(res => {
      setOrders(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Container>
      <h2>Pedidos</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Status</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Itens</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o: any) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{new Date(o.moment).toLocaleString('pt-BR')}</td>
                <td>
                  <Badge color={statusColors[o.orderStatus] || 'secondary'}>{o.orderStatus}</Badge>
                </td>
                <td>{o.client?.name}</td>
                <td>R$ {o.total?.toFixed(2)}</td>
                <td>{o.items?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default OrderList;
