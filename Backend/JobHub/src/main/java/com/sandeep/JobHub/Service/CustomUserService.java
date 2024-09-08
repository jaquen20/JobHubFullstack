package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserService implements UserDetailsService {
    @Autowired
    public UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> users=userRepo.findByUserEmail(username);
        if (users.isPresent()){
            Users usr=users.get();
            return new User(usr.getUserEmail(),usr.getPassword(),Collections.emptyList() );
        }else  {
           throw new UsernameNotFoundException("user not found exception");
        }
    }
}
