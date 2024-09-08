package com.sandeep.JobHub.Controller;

import com.sandeep.JobHub.JwtConfig.JwtHelper;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@CrossOrigin
public class AuthController {
    @Autowired
    UserService customUserService;
    @Autowired
    JwtHelper jwtHelper;

    @Autowired
    AuthenticationManager authenticationManager;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users usr){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(usr.getUserEmail(), usr.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token=jwtHelper.generateToken(usr.getUserEmail());
            Map<String, String> response=new HashMap<>();
            response.put("message","login successful");
            response.put("token",token);
           // return ResponseEntity.ok("User login successful! with token : " +token);
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed");
        }
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Users usr){
        try{
        if (customUserService.findByEmail(usr.getUserEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("email already exists");
        }
        String token=jwtHelper.generateToken(usr.getUserEmail());
  customUserService.addUser(usr);
        Map<String, String> response=new HashMap<>();
            response.put("message","signup successful");
        response.put("token",token);
        return ResponseEntity.ok(response);
    }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed");
        }
    }
    @GetMapping("/hello")
    public ResponseEntity<String> login1(){
    return ResponseEntity.ok("hii buddy");
    }

    @GetMapping("/user")
    public ResponseEntity<String> userDetails(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication!=null && authentication.isAuthenticated()){
            String username= authentication.getName();
            return ResponseEntity.ok("current user is " +username);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("not authorised");
        }


    }

}
