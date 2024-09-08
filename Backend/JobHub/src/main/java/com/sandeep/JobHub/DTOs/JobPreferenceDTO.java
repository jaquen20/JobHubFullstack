package com.sandeep.JobHub.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class JobPreferenceDTO {
    private List<String> jobTitle;
    private List<String>  locationTypes; // onsite or remote or hybrid
    private List<String>  jobLocations;
    private String startDate;
    private List<String>  employmentTypes;
}
