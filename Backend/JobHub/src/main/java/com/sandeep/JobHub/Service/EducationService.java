package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.DTOs.EducationDto;
import com.sandeep.JobHub.DTOs.UserDetailsInputDTO;
import com.sandeep.JobHub.Model.Educations;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Repository.EducationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EducationService {
    @Autowired
    private EducationRepo educationRepo;


    public Educations saveEntity(Educations educations, Users users) {
//        Educations educations1=educationRepo.findByUsers(users);
        educations.setUsers(users);
       return educationRepo.save(educations);
    }


    public void convertToEducation(UserDetailsInputDTO userdata, Users user){
        Educations educations=new Educations();
        educations.setUniversityName(userdata.getUniversityName());
        educations.setStartYear(userdata.getStartYear());
        educations.setEndDate(userdata.getEndYear());
        System.out.println("saving education");
       saveEntity(educations,user);
    }


    public void updateData(Educations educations,Users users,Long id) {
        Optional<Educations> educations1=educationRepo.findByIdAndUsers(id,users);
        if (educations1.isPresent()){
            Educations edu=educations1.get();
            edu.setDegree(educations.getDegree());
            edu.setResult(educations.getResult());
            edu.setEndDate(educations.getEndDate());
            edu.setFieldOfStudy(educations.getFieldOfStudy());
            edu.setUniversityName(educations.getUniversityName());
            edu.setStartYear(educations.getStartYear());
            edu.setIsCompleted(educations.getIsCompleted());
            educationRepo.save(edu);
        }
    }

    public List<Educations> getDataByUsers(Users users) {
        return educationRepo.findByUsers(users);
    }
    public void deleteEducations(Educations educations){
        educationRepo.delete(educations);
    }

    public Educations findEduById(Long id,Users users) {
        Optional<Educations> educations=educationRepo.findByIdAndUsers(id,users);
        return educations.orElse(null);
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
}
