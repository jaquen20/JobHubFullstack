package com.sandeep.JobHub.Controller;

import com.sandeep.JobHub.DTOs.ExperienceDTO;
import com.sandeep.JobHub.Model.Experiences;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Service.ExperienceService;
import com.sandeep.JobHub.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Controller
@CrossOrigin
public class ExperienceController {
    @Autowired
    private ExperienceService experienceService;
    @Autowired
    private UserService userService;
    @PostMapping("/addExperience")
    public ResponseEntity<?> addEducations(@RequestBody Experiences experiences){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            Users users=userService.findByUsername(auth.getName());
            Experiences experiences1=experienceService.saveEntity(experiences,users);
            return new ResponseEntity<>(experiences1, HttpStatus.CREATED);
        }else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/getExperiences")
    public ResponseEntity<?>myeEducations(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Users users=userService.findByUsername(authentication.getName());
            List<Experiences> experiences=experienceService.getDataByUsers(users);
            return new ResponseEntity<>(experiences,HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }


    @GetMapping("/getExperiences/{id}")
    public ResponseEntity<?>getExperience(@PathVariable Long id){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Users users=userService.findByUsername(authentication.getName());
            Experiences experiences=experienceService.findEduById(id,users);

            ExperienceDTO experienceDTO=experienceService.convertToDto(experiences);
//            List<Experiences> experiences=experienceService.getDataByUsers(users);
            return ResponseEntity.ok(experienceDTO);
//            return new ResponseEntity<>(experiences,HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }




    @PostMapping("/editExperiences/{id}")
    public ResponseEntity<?>editExperiences(@PathVariable Long id,@RequestBody Experiences experiences){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            Users users=userService.findByUsername(auth.getName());
            experienceService.updateExperiences(experiences,users,id);
            return ResponseEntity.ok().build();
//            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("/deleteExperiences/{id}")
    public ResponseEntity<?>deleteExperiences(@PathVariable Long id){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            Users users=userService.findByUsername(auth.getName());
            Experiences experiences=experienceService.findEduById(id,users);
            experienceService.deleteEducations(experiences);
            return new ResponseEntity<>("Deleted Successfully",HttpStatus.OK);
        }
        else return new ResponseEntity<>("login first",HttpStatus.UNAUTHORIZED);
    }
}
