package com.mycompany.myapp.repository;

import com.mycompany.myapp.entities.OrderItem;
import com.mycompany.myapp.entities.pk.OrderItemPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemPK> {}
