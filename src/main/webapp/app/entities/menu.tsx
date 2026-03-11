import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      <MenuItem icon="users" to="/clientes">
        Clientes
      </MenuItem>
      <MenuItem icon="shopping-cart" to="/orders">
        Pedidos
      </MenuItem>
      <MenuItem icon="tags" to="/categories">
        Categorias
      </MenuItem>
      <MenuItem icon="box" to="/products">
        Produtos
      </MenuItem>
    </>
  );
};

export default EntitiesMenu;
