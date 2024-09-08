package com.sandeep.JobHub.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data @Entity
public class Educations {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String universityName;
    private String degree;
    private String fieldOfStudy;
    private String startYear;
    private String endDate;
    private String result;
    private Boolean isCompleted=false;

    @ManyToOne(fetch = FetchType.LAZY)
    private Users users;
}
