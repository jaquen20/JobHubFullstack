package com.sandeep.JobHub.DTOs;

import lombok.Data;

@Data
public class UserDetailsInputDTO {
    private String fullName;
    private String city;
    private String universityName;
    private String startYear;
    private String endYear;
    private String jobTitle;
    private String jobTypes;
    private String jobStartDate;
    private String jobLocation;
}
