package com.sandeep.JobHub.DTOs;

import lombok.Data;

import java.util.Date;
@Data
public class ExperienceDTO {
    private String title;
    private String employmentType;
    private String companyName;
    private String location;
    private String locationType;
    private Date startDate;
    private Date endDate;
}
