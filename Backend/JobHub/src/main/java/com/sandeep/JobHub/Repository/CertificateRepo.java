package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.Certificates;
import com.sandeep.JobHub.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificateRepo extends JpaRepository<Certificates ,Long > {
    List<Certificates> findByUsers(Users users);

    Optional<Certificates> findByIdAndUsers(Long id, Users users);
}
