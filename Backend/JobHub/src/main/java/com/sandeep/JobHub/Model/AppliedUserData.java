package com.sandeep.JobHub.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data @Entity
public class AppliedUserData {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String resume;
    private String username;
    private String mobileNo;
    private String email;

    @ManyToOne
    private Job job;
    @ManyToOne
    private Users users;
}
