package com.sandeep.JobHub.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data @Entity
public class JobPreferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private List<String> jobTitle;

    private List<String> locationTypes; // onsite or remote or hybrid


    private List<String> jobLocations;

    private String startDate;


    private List<String> employmentTypes;

    @OneToOne
    private Users users;

}
