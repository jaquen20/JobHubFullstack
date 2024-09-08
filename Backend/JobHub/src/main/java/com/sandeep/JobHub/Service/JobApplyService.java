package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.Model.Job;
import com.sandeep.JobHub.Model.JobApplyData;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Repository.JobApplyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobApplyService {
    @Autowired
    private UserService userService;
    @Autowired
    private JobApplyRepo jobApplyRepo;


    public void applyForJob(Users users, Job job) {
        JobApplyData jobApplyData=new JobApplyData();
        jobApplyData.setJob(job);
        jobApplyData.setUsers(users);
        jobApplyRepo.save(jobApplyData);
    }
}
