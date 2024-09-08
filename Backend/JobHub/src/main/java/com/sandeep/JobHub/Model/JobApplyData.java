package com.sandeep.JobHub.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data @Entity
public class JobApplyData {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Job job;
    @ManyToOne
    private Users users;
}
