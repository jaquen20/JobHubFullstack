package com.sandeep.JobHub.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data @Entity
public class Experiences {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
private String title;
    private String employmentType;
    private String companyName;
    private String location;
    private String locationType;
    private Date startDate;
    private Date endDate;

    @ManyToOne(fetch = FetchType.LAZY)
    private Users users;

}
