package com.sandeep.JobHub.Controller;

import com.sandeep.JobHub.Model.Certificates;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Service.CertificateService;
import com.sandeep.JobHub.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @Autowired
    private UserService userService;


    @PostMapping("/addEducations")
    public ResponseEntity<?> addCertificates(@RequestBody Certificates certificates){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            Users users=userService.findByUsername(auth.getName());
            Certificates certificates1=certificateService.saveEntity(certificates,users);
            if (certificates1==null){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(certificates1, HttpStatus.CREATED);
        }else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/getEducations")
    public ResponseEntity<?>myeEducations(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Users users=userService.findByUsername(authentication.getName());
            List<Certificates> certificatesList=certificateService.getDataByUsers(users);
            return new ResponseEntity<>(certificatesList,HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }


    @PutMapping("/editEducations/{id}")
    public ResponseEntity<?>editEducations(@PathVariable Long id, @RequestBody Certificates certificates){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            Users users=userService.findByUsername(auth.getName());
            certificateService.updateData(certificates,users,id);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?>deleteEdu(@PathVariable Long id){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            Users users=userService.findByUsername(auth.getName());
            Certificates educations=certificateService.findCertificateById(id,users);
            certificateService.deleteEducations(educations);
            return new ResponseEntity<>("Deleted Successfully",HttpStatus.OK);
        }
        else return new ResponseEntity<>("login first",HttpStatus.UNAUTHORIZED);
    }
}
