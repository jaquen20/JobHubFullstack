package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.DTOs.JobDTO;
import com.sandeep.JobHub.Model.Job;
import com.sandeep.JobHub.Model.JobPreferences;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class JobService {
    @Autowired
    public JobRepository jobRepository;
    @Autowired
    private UserService userService;

    public void addJobService(String name, Job job) {
        Users users=userService.findByUsername(name);
        job.setUsers(users);
        job.setDateOfPost(currentDate());
        jobRepository.save(job);

    }

    public List<Job> getMyJobList(String name) {
        Users users=userService.findByUsername(name);
        List<Job> jobList=jobRepository.findByUsers(users);
        if (jobList.isEmpty()){
            return Collections.emptyList();
        }
        return jobList;
    }

    public int deleteJob(Long id, String name) {
        boolean ans=false;
        Users users=userService.findByUsername(name);
        ans=jobRepository.findByUsersAndId(users,id);
         if (ans){
             jobRepository.deleteById(id);
             return 1;
         }
         else {
            return 0;
         }
    }

    public void updateData(Job job, Users users, Long id) {

            Optional<Job> job1=jobRepository.findByIdAndUsers(id,users);
            if (job1.isPresent()){
                Job job2=job1.get();
                job2.setCompanyName(job.getCompanyName());
                job2.setJobLocation(job.getJobLocation());
                job2.setJobDescription(job.getJobDescription());
                job2.setJobType(job.getJobType());
                job2.setTitle(job.getTitle());
                job2.setMinExperience(job.getMinExperience());
                job2.setWorkplaceType(job.getWorkplaceType());
                job2.setSeniorityLevel(job.getSeniorityLevel());
                job2.setReqSkills(job.getReqSkills());
                job2.setNoOfPostReq(job.getNoOfPostReq());
                job2.setDateOfPost(currentDate());

                jobRepository.save(job2);
            }
        }
        public LocalDate currentDate(){
        return LocalDate.now();
        }

    public List<JobDTO> findJobsForMe(JobPreferences jobPreferences) {
        List<Job> jobList=new ArrayList<>();
        List<String> jobTitle=jobPreferences.getJobTitle();
        for(String title:jobTitle){

            jobList.addAll(jobRepository.findByTitle(title));
        }
//        String jobTitle=jobPreferences.getJobTitle();
//        List<Job> job=jobRepository.findByTitle(jobTitle);
        return convertToDto(jobList);
    }

    public List<JobDTO> convertToDto(List<Job> jobs) {
        return jobs.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public  JobDTO convertToDto(Job job){
        JobDTO jobDTO=new JobDTO();
        jobDTO.setJobDescription(job.getJobDescription());
        jobDTO.setJobLocation(job.getJobLocation());
        jobDTO.setJobType(job.getJobType());
        jobDTO.setCompanyName(job.getCompanyName());
        jobDTO.setTitle(job.getTitle());
        jobDTO.setDateOfPost(job.getDateOfPost());
        jobDTO.setWorkplaceType(job.getWorkplaceType());
        jobDTO.setSeniorityLevel(job.getSeniorityLevel());
        jobDTO.setReqSkills(job.getReqSkills());
        jobDTO.setMinExperience(job.getMinExperience());
        jobDTO.setNoOfPostReq(job.getNoOfPostReq());
        return jobDTO;
    }

    public Job findJobById(Long id) {
        Optional<Job> job= jobRepository.findById(id);
        return job.orElse(null);
    }

    public Job findJobByIdAndUsers(Long id, Users users) {
        if (findJobById(id)!=null){
            Optional<Job> job= jobRepository.findByIdAndUsers(id,users);
            return job.orElse(null);
        }
        else return null;
    }
}
