import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

export const ClienteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  useEffect(() => {
    if (!isNew) {
      axios.get(`/api/clientes/${id}`).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (isNew) {
      await axios.post('/api/clientes', form);
    } else {
      await axios.put(`/api/clientes/${id}`, form);
    }
    navigate('/clientes');
  };

  return (
    <Container>
      <h2>{isNew ? 'Novo Cliente' : 'Editar Cliente'}</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Nome</Label>
          <Input id="name" name="name" value={form.name} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Telefone</Label>
          <Input id="phone" name="phone" value={form.phone} onChange={handleChange} />
        </FormGroup>
        {isNew && (
          <FormGroup>
            <Label for="password">Senha</Label>
            <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
          </FormGroup>
        )}
        <Button color="primary" type="submit">
          Salvar
        </Button>{' '}
        <Button color="secondary" onClick={() => navigate('/clientes')}>
          Cancelar
        </Button>
      </Form>
    </Container>
  );
};

export default ClienteForm;
