package com.js.project_rest_app_spring.controllers;
 
import com.js.project_rest_app_spring.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
 
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
 
    private final List<User> users = new ArrayList<>();
    private final AtomicLong idGen = new AtomicLong(1000);
 
    public UserController() {
        users.add(new User(idGen.getAndIncrement(), "Akshitha"));
        users.add(new User(idGen.getAndIncrement(), "Priya"));
    }
 
    @GetMapping
    public List<User> all() {
        return users;
    }
 
    @GetMapping("/{id}")
    public ResponseEntity<User> byId(@PathVariable Long id) {
        Optional<User> found = users.stream().filter(u -> u.getId().equals(id)).findFirst();
        return found.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
 
    @PostMapping
    public ResponseEntity<User> create(@RequestBody User incoming) {
        if (incoming.getName() == null || incoming.getName().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        User created = new User(idGen.getAndIncrement(), incoming.getName().trim());
        users.add(created);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
 
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean removed = users.removeIf(u -> u.getId().equals(id));
        return removed ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
 