package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.Model.Certificates;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Repository.CertificateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CertificateService {
    @Autowired
    private CertificateRepo certificateRepo;
    @Autowired
    private UserDataService userDataService;


    public Certificates saveEntity(Certificates certificates, Users users) {
        certificates.setUsers(users);
        return certificateRepo.save(certificates);

    }

    public List<Certificates> getDataByUsers(Users users) {

        return certificateRepo.findByUsers(users);
    }
    public void updateData(Certificates certificates, Users users, Long id) {

        Optional<Certificates> certificatesOptional=certificateRepo.findByIdAndUsers(id,users);
        if (certificatesOptional.isPresent()){
            Certificates certificates1=certificatesOptional.get();
            certificates1.setCertificateName(certificates.getCertificateName());
            certificates1.setCredentialId(certificates.getCredentialId());
            certificates1.setCredentialUrl(certificates.getCredentialUrl());
            certificates1.setIssueDate(certificates.getIssueDate());
            certificates1.setIssuingOrganisation(certificates.getIssuingOrganisation());

            certificateRepo.save(certificates1);
        }
    }

    public Certificates findCertificateById(Long id, Users users) {
        Optional<Certificates> certificates=certificateRepo.findByIdAndUsers(id,users);
        return certificates.orElse(null);
    }

    public void deleteEducations(Certificates educations) {
        certificateRepo.delete(educations);
    }






}
