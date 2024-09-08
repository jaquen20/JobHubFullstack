package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    public PasswordEncoder encoder;
    public  void addUser(Users users){
        users.setPassword(encoder.encode(users.getPassword()));
        userRepo.save(users);
//        return ResponseEntity.ok("registration successfully");
    }

    public Optional<Users> findByEmail(String userEmail) {
        return userRepo.findByUserEmail(userEmail);
    }

    public Users findByUsername(String userEmail) {
        Optional<Users> users=userRepo.findByUserEmail(userEmail);
        return users.orElse(null);

    }

    public Users findById(Long id) {
        Optional<Users> connetion=userRepo.findById(id);
        return connetion.orElse(null);
    }
}
