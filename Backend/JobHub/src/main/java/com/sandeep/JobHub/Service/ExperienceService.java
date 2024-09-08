package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.DTOs.ExperienceDTO;
import com.sandeep.JobHub.Model.Experiences;
import com.sandeep.JobHub.Model.UserData;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Repository.ExperienceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExperienceService {
    @Autowired
    private ExperienceRepo experienceRepo;

    @Autowired
    private UserDataService userDataService;


    public Experiences saveEntity(Experiences experiences, Users users) {
        UserData userData=userDataService.findByUsers(users);
        experiences.setUsers(users);
        return experienceRepo.save(experiences);
    }

    public void updateData(Experiences experiences) {
        experiences.setEndDate(experiences.getEndDate());
        experiences.setLocation(experiences.getLocation());
        experiences.setEmploymentType(experiences.getEmploymentType());
        experiences.setStartDate(experiences.getStartDate());
        experiences.setCompanyName(experiences.getCompanyName());
        experienceRepo.save(experiences);
    }

    public void updateExperiences(Experiences experiences,Users users,Long id) {
        Optional<Experiences> experiences1=experienceRepo.findByIdAndUsers(id,users);
        if (experiences1.isPresent()){
            Experiences experiences2=experiences1.get();
            experiences2.setTitle(experiences.getTitle());
            experiences2.setCompanyName(experiences.getCompanyName());
            experiences2.setEndDate(experiences.getEndDate());
            experiences2.setLocation(experiences.getLocation());
            experiences2.setLocationType(experiences.getLocationType());
            experiences2.setStartDate(experiences.getStartDate());
            experiences2.setEmploymentType(experiences.getEmploymentType());
            experienceRepo.save(experiences2);
        }
    }






    public List<Experiences> getDataByUsers(Users users) {
        return experienceRepo.findByUsers(users);
    }
    public void deleteEducations(Experiences educations){
        experienceRepo.delete(educations);
    }

    public Experiences findEduById(Long id,Users users) {
        Optional<Experiences> educations=experienceRepo.findByIdAndUsers(id,users);
        return educations.orElse(null);
    }


    public List<ExperienceDTO> convertToDto(List<Experiences> workExperience) {
        return workExperience.stream().map(this::convertToDto).collect(Collectors.toList());
    }
    public ExperienceDTO convertToDto(Experiences experiences){
        ExperienceDTO experienceDTO=new ExperienceDTO();
        experienceDTO.setTitle(experiences.getTitle());
        experienceDTO.setCompanyName(experiences.getCompanyName());
        experienceDTO.setLocation(experiences.getLocation());
        experienceDTO.setEmploymentType(experiences.getEmploymentType());
        experienceDTO.setStartDate(experiences.getStartDate());
        experienceDTO.setEndDate(experiences.getEndDate());
        return experienceDTO;
    }
}
