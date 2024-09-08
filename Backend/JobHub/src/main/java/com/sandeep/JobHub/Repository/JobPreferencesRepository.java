package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.JobPreferences;
import com.sandeep.JobHub.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPreferencesRepository extends JpaRepository<JobPreferences,Long> {

    JobPreferences findByUsers(Users users);
}
