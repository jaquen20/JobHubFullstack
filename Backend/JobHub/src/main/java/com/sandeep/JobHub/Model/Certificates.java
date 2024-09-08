package com.sandeep.JobHub.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
@Data @Entity
public class Certificates {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String certificateName;
    private String issuingOrganisation;
    private Date issueDate;
    private String expirationDate;
    private String credentialId;
    private String credentialUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    private Users users;
}
