package com.sandeep.JobHub.Controller;

import com.sandeep.JobHub.DTOs.EducationDto;
import com.sandeep.JobHub.Model.Educations;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Service.EducationService;
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
public class EducationController {

    @Autowired
    private EducationService educationService;
    @Autowired
    private UserService userService;
    @PostMapping("/addEducations")
    public ResponseEntity<?> addEducations(@RequestBody Educations educations){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            Users users=userService.findByUsername(auth.getName());
            Educations edu=educationService.saveEntity(educations,users);
            if (edu==null){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(edu, HttpStatus.CREATED);
        }else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/getEducations")
    public ResponseEntity<?>myeEducations(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Users users=userService.findByUsername(authentication.getName());
            List<Educations> educations=educationService.getDataByUsers(users);
            return new ResponseEntity<>(educations,HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    @GetMapping("/getEducation/{id}")
    public ResponseEntity<?>getEducation(@PathVariable Long id){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Users users=userService.findByUsername(authentication.getName());
            Educations educations=educationService.findEduById(id,users);
            EducationDto educationDto=educationService.convertToDto(educations);
//            List<Educations> educations=educationService.getDataByUsers(users);
//            return new ResponseEntity<>(educationDto,HttpStatus.OK);
            return ResponseEntity.ok(educationDto);
        } else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/editEducations/{id}")
    public ResponseEntity<?>editEducations(@PathVariable Long id,@RequestBody Educations educations){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            Users users=userService.findByUsername(auth.getName());
            educationService.updateData(educations,users,id);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?>deleteEdu(@PathVariable Long id){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            Users users=userService.findByUsername(auth.getName());
            Educations educations=educationService.findEduById(id,users);
            educationService.deleteEducations(educations);
            return new ResponseEntity<>("Deleted Successfully",HttpStatus.OK);
        }
     else return new ResponseEntity<>("login first",HttpStatus.UNAUTHORIZED);
    }
}
