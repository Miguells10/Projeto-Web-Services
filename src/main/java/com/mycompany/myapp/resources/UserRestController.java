package com.mycompany.myapp.resources;

import com.mycompany.myapp.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/clientes")
public class UserRestController {

    @GetMapping
    public ResponseEntity<User> findAll() {
        User u = new User(1L, "Maria", "maria@email.com", "988888888", "123456");
        return ResponseEntity.ok().body(u);
    }
}
