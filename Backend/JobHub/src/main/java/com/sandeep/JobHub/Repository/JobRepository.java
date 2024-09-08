package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.Job;
import com.sandeep.JobHub.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByUsers(Users users);

    boolean findByUsersAndId(Users users, Long id);

    Optional<Job> findByIdAndUsers(Long id, Users users);

    List<Job> findByTitle(String jobTitle);
}
