package com.sandeep.JobHub.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data @Entity
public class UserData {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String city;
//    @OneToMany(fetch = FetchType.LAZY)
//    private List<Educations> education=new ArrayList<>();
//    @OneToMany(fetch = FetchType.LAZY)
//    private List<Experiences> workExperience=new ArrayList<>();
//
//    @OneToMany(fetch = FetchType.LAZY)
//    private List<Certificates> certificatesList=new ArrayList<>();

    private String headline;
    private String phoneNo;
    private String webLink;
    private String school;
    private String profileImage;
    @OneToOne
    private Users users;


}
