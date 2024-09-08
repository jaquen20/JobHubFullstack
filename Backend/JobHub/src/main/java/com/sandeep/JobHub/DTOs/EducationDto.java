package com.sandeep.JobHub.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class EducationDto {

    private String universityName;
    private String degree;
    private String fieldOfStudy;
    private String startYear;
    private String endDate;
    private String result;
    private List<String> skills;
    private Boolean isCompleted=false;
}
