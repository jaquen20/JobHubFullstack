package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.AppliedUserData;
import com.sandeep.JobHub.Model.Job;
import com.sandeep.JobHub.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppliedUserRepository extends JpaRepository<AppliedUserData,Long> {
    List<AppliedUserData> findByJob(Job job);

    List<AppliedUserData> findByUsers(Users users);
}
