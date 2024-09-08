package com.sandeep.JobHub.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data @Entity
public class Notification {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Users users;
    private String message;
    private Long postId;
    private String profile;
    private LocalDate notifyDate;
    private  Boolean hasSeen=false;
}
