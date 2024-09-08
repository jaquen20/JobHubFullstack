package com.sandeep.JobHub.Controller;

import com.sandeep.JobHub.DTOs.AppliedUserDTO;
import com.sandeep.JobHub.DTOs.JobDTO;
import com.sandeep.JobHub.Model.*;
import com.sandeep.JobHub.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
@RestController @CrossOrigin
public class JobController {

    @Autowired
    private JobApplyService jobApplyService;
    @Autowired
    private AppliedUserService appliedUserService;
    @Autowired
    public JobService jobService;

    @Autowired
    public UserService userService;

    @Autowired
    public JobPreferenceService jobPreferenceService;

    @PostMapping("/addJobs")
    public ResponseEntity<?> addJobs(@RequestBody Job job){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        if (authentication!=null && authentication.isAuthenticated()){

            jobService.addJobService(authentication.getName(),job);
            return new ResponseEntity<>("job created Successfully",HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Login first",HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getMyPostedJobs")
    public ResponseEntity<?> getJobList(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            List<Job> myJobs=jobService.getMyJobList(authentication.getName());
            if (myJobs.isEmpty()){
                return new ResponseEntity<>("You Haven't posted any Jobs yet",HttpStatus.OK);
            }
            else {
                return ResponseEntity.ok(myJobs);
            }

        }else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/editJob/{id}")
    public ResponseEntity<?>editJob(@PathVariable Long id,@RequestBody Job job){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            Users users=userService.findByUsername(auth.getName());
            jobService.updateData(job,users,id);
            return ResponseEntity.ok("Data Updated");
        }
        else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("/deleteJob/{id}")
    public ResponseEntity<?> deleteJobs(@PathVariable Long id){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication!=null && authentication.isAuthenticated()){
           int i= jobService.deleteJob(id,authentication.getName());
           if (i==1){
               return new ResponseEntity<>(HttpStatus.OK);
           }
           else {
               return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
           }
        }
        else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }


    @GetMapping("/findMeJobs")
    public ResponseEntity<?> getJobsForUser(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Users users=userService.findByUsername(authentication.getName());
            JobPreferences jobPreferences=jobPreferenceService.findJobPreferenceOfUser(users);
            List<JobDTO> jobDTO=jobService.findJobsForMe(jobPreferences);
            if (!jobDTO.isEmpty()){
                return ResponseEntity.ok(jobDTO);
            }else return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }
@PostMapping("/apply/{id}")
    public ResponseEntity<?> applyForJob(@PathVariable Long id,@RequestParam("username") String username,@RequestParam("mobileNo")String mobileNo, @RequestParam("email") String email,  @RequestParam("file") MultipartFile file) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication.isAuthenticated()) {
        AppliedUserData appliedUserData=new AppliedUserData();
        appliedUserData.setEmail(email);
        appliedUserData.setUsername(username);
        appliedUserData.setMobileNo(mobileNo);
        System.out.println(file);
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("upload valid file");
        }

        try {

            String usernames = authentication.getName();

            AppliedUserData appliedUserData2 = appliedUserService.storeFile(file, usernames,id,appliedUserData);
            if (appliedUserData2!=null) {
                return ResponseEntity.ok("application submitted successfully");
            }else return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("bad request");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("failed to submit application");
        }
    }
    else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("login required");

    }


    @GetMapping("/getCandidatesByJobs/{id}")
    public ResponseEntity<?> getCandidatesByJobs(@PathVariable Long id){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Users users=userService.findByUsername(authentication.getName());
            Job job=jobService.findJobByIdAndUsers(id,users);
            List<AppliedUserData> appliedUserDataList=appliedUserService.findCandidatesByJobs(job);
            List<AppliedUserDTO>appliedUserDTOList=appliedUserService.convertToDto(appliedUserDataList);
            return ResponseEntity.ok(appliedUserDTOList);
        }else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("SIGN_IN");
    }



    @GetMapping("/resume/{filename}")
    public  ResponseEntity<byte[]> getResume(@PathVariable String filename) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()) {
            File file = new File("uploads/" + filename);
            if (!file.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            try {
                byte[] fileContent = Files.readAllBytes(file.toPath());
                return ResponseEntity.ok().header("Content-Type", "application/pdf")
                        .header("Content-Disposition", "attachment; filename=\"" + filename + "\"")
                        .body(fileContent);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//            throw new RuntimeException(e);
            }
        }else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @GetMapping("/getMyAppliedJobs")
    public ResponseEntity<?> getMyJobs(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Users users=userService.findByUsername(authentication.getName());
            List<Job> jobList=appliedUserService.findjobsApplied(users);
            if (!jobList.isEmpty()) {
                List<JobDTO> jobDTOList = jobService.convertToDto(jobList);
                return ResponseEntity.ok(jobDTOList);
            }else return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Contents");
        }
        else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("login first");
    }

}
