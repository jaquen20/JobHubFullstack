package com.sandeep.JobHub.DTOs;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;
@Data
public class JobDTO {
    private  String title;
    private String jobType;
    private String  companyName;
    private  String workplaceType;
    private String noOfPostReq;
    private String jobDescription;
    private List<String> reqSkills;
    private String minExperience;
    private String jobLocation;
    private String seniorityLevel;
    private LocalDate dateOfPost;
}
