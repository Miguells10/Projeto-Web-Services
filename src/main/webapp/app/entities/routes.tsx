import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import ClienteList from './cliente/cliente-list';
import ClienteForm from './cliente/cliente-form';
import OrderList from './order/order-list';
import CategoryList from './category/category-list';
import ProductList from './product/product-list';

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        <Route path="clientes" element={<ClienteList />} />
        <Route path="clientes/new" element={<ClienteForm />} />
        <Route path="clientes/:id/edit" element={<ClienteForm />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="products" element={<ProductList />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};
