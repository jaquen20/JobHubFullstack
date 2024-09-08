package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.JobApplyData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobApplyRepo extends JpaRepository<JobApplyData, Long> {
}
