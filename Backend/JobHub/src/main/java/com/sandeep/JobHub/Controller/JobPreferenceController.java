package com.sandeep.JobHub.Controller;

import com.sandeep.JobHub.DTOs.JobPreferenceDTO;
import com.sandeep.JobHub.Model.JobPreferences;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Service.JobPreferenceService;
import com.sandeep.JobHub.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @CrossOrigin
public class JobPreferenceController {
    @Autowired
    public UserService userService;
    @Autowired
    public JobPreferenceService jobPreferenceService;
    @GetMapping("/getPreferences")
    public  ResponseEntity<?>getMyJobPreferences(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Users users=userService.findByUsername(authentication.getName());
            JobPreferences jobPreferences=jobPreferenceService.findJobPreferenceOfUser(users);
            if (jobPreferences!=null) {
                JobPreferenceDTO jobPreferenceDTO= jobPreferenceService.convertToDto(jobPreferences);
                JobPreferences jobPreference=jobPreferenceService.findJobPreferenceOfUser(users);
            List<String> titles=jobPreference.getJobTitle();
            for (String title:titles){
//                jobAPIS.addAll(jobApiService.getJobsList(title))
//
                JobPreferences jobPreferences1=jobPreferenceService.findJobPreferenceOfUser(users);
                List<String> list=jobPreferences1.getJobTitle();
                System.out.println(list);
            }
//            return jobAPIS;
                return ResponseEntity.ok(jobPreferenceDTO);
            }else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
            } else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    @PostMapping("/addPreferences")
    public ResponseEntity<?> addJobPreferences(@RequestBody JobPreferences jobPreferences){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Users users=userService.findByUsername(authentication.getName());
            jobPreferenceService.AddMyPreferences(users,jobPreferences);
            return ResponseEntity.ok("added successfully");
        }else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/editPreferences")
    public ResponseEntity<?> editJobPreferences(@RequestBody JobPreferences jobPreferences){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Users users=userService.findByUsername(authentication.getName());
                jobPreferenceService.editMyPreferences(jobPreferences,users);
            return ResponseEntity.ok("added successfully");
        }else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
