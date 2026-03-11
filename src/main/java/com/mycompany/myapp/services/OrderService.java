package com.mycompany.myapp.services;

import com.mycompany.myapp.entities.Order;
import com.mycompany.myapp.repository.OrderRepository;
import com.mycompany.myapp.services.exceptions.ResourceNotFoundException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;

    @Transactional(readOnly = true)
    public List<Order> findAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Order findById(Long id) {
        Optional<Order> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException(id));
    }
}
