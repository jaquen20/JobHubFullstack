package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.Experiences;
import com.sandeep.JobHub.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExperienceRepo extends JpaRepository<Experiences,Long> {


    List<Experiences> findByUsers(Users users);

    Optional<Experiences> findByIdAndUsers(Long id, Users users);
}
