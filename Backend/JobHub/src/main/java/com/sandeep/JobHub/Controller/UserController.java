package com.sandeep.JobHub.Controller;


import com.sandeep.JobHub.DTOs.EducationDto;
import com.sandeep.JobHub.DTOs.ExperienceDTO;
import com.sandeep.JobHub.DTOs.UserDataDTO;
import com.sandeep.JobHub.DTOs.UserDetailsInputDTO;
import com.sandeep.JobHub.Model.*;
import com.sandeep.JobHub.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin
@RequestMapping("/user")
public class UserController {
    public String uploadPath="src/main/resources/static/images";
    @Autowired
    public UserDataService userDataService;
    @Autowired
    public ConnectionService connectionService;
    @Autowired
    private UserService userService;
    @Autowired
    public EducationService educationService;
    @Autowired
    public CertificateService certificateService;
    @Autowired
    public ExperienceService experienceService;

    @PostMapping("/createProfile")
    public ResponseEntity<String> data(@RequestBody UserDetailsInputDTO userdata){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        if (authentication!=null && authentication.isAuthenticated()){
            String username= authentication.getName();
            userDataService.saveUserData(userdata,username);
            return ResponseEntity.ok("Recorded Successfully ");
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authorised");
        }
    }

    @PostMapping("/createprofile")
    public ResponseEntity<String> datea(@RequestBody UserData userdata){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        if (authentication!=null && authentication.isAuthenticated()){
            String username= authentication.getName();
            userDataService.saveUserInfo(userdata,username);
            return ResponseEntity.ok("Recorded Successfully ");
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authorised");
        }
    }



    @PostMapping("/editProfile")
    public  ResponseEntity<UserData> editDetails(@RequestBody UserData userData){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        if (authentication!=null && authentication.isAuthenticated()){
            String username= authentication.getName();
            UserData userData1=userDataService.updateData(userData,username);
            return ResponseEntity.ok(userData1);
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(userData);

        }
    }


    @PostMapping("/update")
    public  ResponseEntity<?> updateDetails(@RequestBody UserDataDTO userData){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        if (authentication!=null && authentication.isAuthenticated()){
            System.out.println(userData);
            String username= authentication.getName();
            UserData userData1=userDataService.updateUserData(userData,username);
            return ResponseEntity.ok(userData1);
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(userData);

        }
    }


    @GetMapping("/myProfile")
    public ResponseEntity<?> myprofile(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        if (authentication!=null && authentication.isAuthenticated()){
            String username= authentication.getName();
            UserData userData1=userDataService.getUserData(username);
            Users users=userService.findByUsername(username);
            List<Educations> educations=educationService.getDataByUsers(users);
            List<Certificates> certificates=certificateService.getDataByUsers(users);
            List<EducationDto> educationDtos=educationService.convertToDto(educations);
            List<Experiences>experiences=experienceService.getDataByUsers(users);
            List<ExperienceDTO>experienceDTOS=experienceService.convertToDto(experiences);


//            userData1.setCertificatesList(certificates);
//            userData1.setEducation(educations);
            UserDataDTO userDataDTO=userDataService.convertToDTO(userData1);
            userDataDTO.setConnectionNo(connectionService.noOfConnection(users));
            userDataDTO.setEducations(educationDtos);
            userDataDTO.setExperiences(experienceDTOS);
            userDataDTO.setEmail(username);
//            userDataDTO.setSchools();
            Map<String, UserDataDTO> response=new HashMap<>();
           // response.put("message","authenticated successful");
            response.put("details",userDataDTO);
            return ResponseEntity.ok(response);
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
@PostMapping("/upload")
    public  ResponseEntity<?> uploadImage(@RequestParam("file")MultipartFile file) throws IOException {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication.isAuthenticated()) {
        Users users=userService.findByUsername(authentication.getName());

        if (!file.isEmpty()) {
            try {
                String fileName = userDataService.saveImage(file);
//                String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
//                Path path = Paths.get(uploadPath + uniqueFileName);
//                Files.write(path, file.getBytes());
                userDataService.saveUserProfileImage(fileName,users);
                return ResponseEntity.ok("file uploaded");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }else {
            return new ResponseEntity<>("file is empty",HttpStatus.BAD_REQUEST);
        }
             }else {
        return new ResponseEntity<>("Login first",HttpStatus.UNAUTHORIZED);
    }

         }
    }
