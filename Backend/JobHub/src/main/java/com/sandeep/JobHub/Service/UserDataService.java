package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.DTOs.EducationDto;
import com.sandeep.JobHub.DTOs.ExperienceDTO;
import com.sandeep.JobHub.DTOs.UserDataDTO;
import com.sandeep.JobHub.DTOs.UserDetailsInputDTO;
import com.sandeep.JobHub.Exception.UserNotFoundException;
import com.sandeep.JobHub.Model.*;
;
import com.sandeep.JobHub.Repository.UserDataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserDataService {
    @Autowired
    public UserService userService;
    @Autowired
    public EducationService educationService;
    @Autowired
    public JobPreferenceService jobPreferenceService;


    @Autowired
    public UserDataRepo userDataRepo;
    public void saveUserData(UserDetailsInputDTO userdata, String username) {
        Optional<Users> usr= userService.findByEmail(username);
        UserData userData=new UserData();
        if (usr.isPresent()){
            Users user=usr.get();

            educationService.convertToEducation(userdata,user);
            jobPreferenceService.saveJobPreference(userdata,user);
            userData.setFullName(userdata.getFullName());
            userData.setCity(userdata.getCity());
            userData.setUsers(user);
            System.out.println("saving userdata");
            userDataRepo.save(userData);

        }else {
            throw new UserNotFoundException("User with email " + username + " not found");
        }
    }





    public UserData updateData(UserData userData, String username) {
        Optional<Users> user=userService.findByEmail(username);
        if (user.isPresent()){
           UserData userData1= userDataRepo.findByUsers(user.get());
           userData1.setFullName(userData.getFullName());
           userData1.setCity(userData.getCity());
           userData1.setHeadline(userData.getHeadline());
//           userData1.setWorkExperience(userData.getWorkExperience());
//           userData1.setEducation(userData.getEducation());
           userData1.setWebLink(userData.getWebLink());
           userData1.setPhoneNo(userData.getPhoneNo());
           userDataRepo.save(userData1);
           return userData1;
        }else {
            throw new UserNotFoundException("User with email " + username + " not found");
        }
    }

    public UserData getUserData(String username) {
        Optional<Users> user=userService.findByEmail(username);
        if (user.isPresent()){
            return userDataRepo.findByUsers(user.get());
        }else {
            throw new UserNotFoundException("User with email " + username + " not found");
        }
    }
    public String getUsernameByMail(String username) {
        Optional<Users> user=userService.findByEmail(username);
        if (user.isPresent()){

            UserData userData= userDataRepo.findByUsers(user.get());
            return userData.getFullName();
        }else {
            throw new UserNotFoundException("User with email " + username + " not found");
        }
    }
    public String getNameByMail(String username) {
        Optional<Users> user=userService.findByEmail(username);
        if (user.isPresent()){
UserData userData=getUserData(user.get().getUserEmail());
//            UserData userData= userDataRepo.findByUsers(user.get());
            return userData.getFullName();
        }else {
            throw new UserNotFoundException("User with email " + username + " not found");
        }
    }

    public UserData findByUsers(Users users) {
       return userDataRepo.findByUsers(users);
    }

    public UserDataDTO convertToDTO(UserData userData1) {
        UserDataDTO userDataDTO=new UserDataDTO();
        userDataDTO.setCity(userData1.getCity());

        userDataDTO.setFullName(userData1.getFullName());
//        List<EducationDto> dto=convertToDto(userData1.getEducation());
//        userDataDTO.setEducations(dto);
//        List<ExperienceDTO> experienceDTO =convertToExprDto(userData1.getWorkExperience());
//        userDataDTO.setExperiences(experienceDTO);
        userDataDTO.setPhoneNo(userData1.getPhoneNo());
        userDataDTO.setHeadline(userData1.getHeadline());
        userDataDTO.setSchool(userData1.getSchool());
        userDataDTO.setProfileImage(userData1.getProfileImage());
        userDataDTO.setWebLink(userData1.getWebLink());
        return userDataDTO;
    }

    public List<EducationDto> convertToDto(List<Educations> educations) {
        return educations.stream().map(this::convertToDto).collect(Collectors.toList());
    }
    public EducationDto convertToDto(Educations educations){
        EducationDto educationDto=new EducationDto();
        educationDto.setDegree(educations.getDegree());
        educationDto.setResult(educations.getResult());
        educationDto.setStartYear(educations.getStartYear());
        educationDto.setEndDate(educations.getEndDate());
        educationDto.setFieldOfStudy(educations.getFieldOfStudy());
        educationDto.setUniversityName(educations.getUniversityName());
        return educationDto;
    }


    public List<ExperienceDTO> convertToExprDto(List<Experiences> workExperience) {
        return workExperience.stream().map(this::convertToExprDto).collect(Collectors.toList());
    }
    public ExperienceDTO convertToExprDto(Experiences experiences){
        ExperienceDTO experienceDTO=new ExperienceDTO();
        experienceDTO.setCompanyName(experiences.getCompanyName());
        experienceDTO.setLocation(experiences.getLocation());
        experienceDTO.setEmploymentType(experiences.getEmploymentType());
        experienceDTO.setStartDate(experiences.getStartDate());
        experienceDTO.setEndDate(experiences.getEndDate());
        return experienceDTO;
    }

    public UserData updateUserData(UserDataDTO userData, String username) {
        Optional<Users> user=userService.findByEmail(username);
        if (user.isPresent()){
            UserData userData1= userDataRepo.findByUsers(user.get());
            userData1.setFullName(userData.getFullName());
            userData1.setCity(userData.getCity());
            userData1.setHeadline(userData.getHeadline());
//            userData1.setWorkExperience(userData.getWorkExperience());
//            userData1.setEducation(userData.getEducation());
            userData1.setWebLink(userData.getWebLink());
            userData1.setProfileImage(userData.getProfileImage());
            userData1.setSchool(userData.getSchool());
            userData1.setPhoneNo(userData.getPhoneNo());
            userDataRepo.save(userData1);
            return userData1;
        }else {
            throw new UserNotFoundException("User with email " + username + " not found");
        }
    }


    public String saveImage(MultipartFile imageFile) throws IOException {

        String filename = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();

        String imagePath = "src/main/resources/static/images" + File.separator + filename;

        Files.copy(imageFile.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING);
        return filename;
    }

    public void saveUserProfileImage(String fileName, Users users) {
        UserData userData= findByUsers(users);
        userData.setProfileImage(fileName);
        userDataRepo.save(userData);
    }

    public void saveUserInfo(UserData userdata, String username) {
        Users user =userService.findByUsername(username);
        userdata.setUsers(user);
        userDataRepo.save(userdata);
    }
}
