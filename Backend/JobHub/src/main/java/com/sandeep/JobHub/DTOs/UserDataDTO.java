package com.sandeep.JobHub.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class UserDataDTO {
    private String fullName;
    private String city;
    private String headline;
    private String phoneNo;
    private String webLink;
    private String email;
    private String industry;
    private String school;
    private String profileImage;
    private List<EducationDto> educations;
    private List<ExperienceDTO> experiences;
    private long connectionNo;

}
