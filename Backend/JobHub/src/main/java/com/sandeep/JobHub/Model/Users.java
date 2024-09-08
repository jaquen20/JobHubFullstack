package com.sandeep.JobHub.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data @Entity
public class Users {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public   Long id;

    private String userEmail;
    private String password;

}
