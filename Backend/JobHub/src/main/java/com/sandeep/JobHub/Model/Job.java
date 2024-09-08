package com.sandeep.JobHub.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data @Entity
public class Job {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
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
    @ManyToOne
    private Users users; //user who post job



}
