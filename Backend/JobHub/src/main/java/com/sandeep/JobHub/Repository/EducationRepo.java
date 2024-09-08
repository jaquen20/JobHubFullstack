package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.Educations;
import com.sandeep.JobHub.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EducationRepo extends JpaRepository<Educations,Long> {

    List<Educations> findByUsers(Users users);

    Optional<Educations> findByIdAndUsers(Long id, Users users);
}
