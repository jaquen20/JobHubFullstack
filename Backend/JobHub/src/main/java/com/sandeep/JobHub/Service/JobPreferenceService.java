package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.DTOs.JobPreferenceDTO;
import com.sandeep.JobHub.DTOs.UserDetailsInputDTO;
import com.sandeep.JobHub.Model.JobPreferences;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Repository.JobPreferencesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class JobPreferenceService {
    @Autowired
    public JobPreferencesRepository jobPreferencesRepository;

    public void saveJobPreference(UserDetailsInputDTO userdata, Users user) {
        JobPreferences existingJobPreferences = jobPreferencesRepository.findByUsers(user);
        if (existingJobPreferences!=null){
            existingJobPreferences.setJobLocations(Arrays.asList(userdata.getJobLocation()));
            existingJobPreferences.setJobTitle(Arrays.asList(userdata.getJobTitle()));
            existingJobPreferences.setStartDate(userdata.getJobStartDate());
            existingJobPreferences.setEmploymentTypes(Arrays.asList(userdata.getJobTypes()));
            jobPreferencesRepository.save(existingJobPreferences);
        }else {
            JobPreferences jobPreferences = new JobPreferences();
            jobPreferences.setJobLocations(Arrays.asList(userdata.getJobLocation()));
            jobPreferences.setJobTitle(Arrays.asList(userdata.getJobTitle()));
            jobPreferences.setStartDate(userdata.getJobStartDate());
            jobPreferences.setEmploymentTypes(Arrays.asList(userdata.getJobTypes()));
            jobPreferences.setUsers(user);
            System.out.println("saving job preferences");
            jobPreferencesRepository.save(jobPreferences);
        }


    }

    public JobPreferences findJobPreferenceOfUser(Users users) {
        return jobPreferencesRepository.findByUsers(users);
    }

    public void AddMyPreferences(Users users, JobPreferences jobPreferences) {
//        jobPreferences.setUsers(users);
//        jobPreferencesRepository.save(jobPreferences);
        JobPreferences existingJobPreferences = jobPreferencesRepository.findByUsers(users);
        if (existingJobPreferences!=null){
            existingJobPreferences.setJobLocations(jobPreferences.getJobLocations());
            existingJobPreferences.setJobTitle(jobPreferences.getJobTitle());
            existingJobPreferences.setStartDate(jobPreferences.getStartDate());
            existingJobPreferences.setLocationTypes(jobPreferences.getLocationTypes());
            existingJobPreferences.setEmploymentTypes(jobPreferences.getEmploymentTypes());
            jobPreferencesRepository.save(existingJobPreferences);
        }else {
            jobPreferences.setUsers(users);
            System.out.println("saving job preferences");
            jobPreferencesRepository.save(jobPreferences);
        }

    }

    public void editMyPreferences(JobPreferences jobPreferences1, Users users) {
       JobPreferences jobPreferences=findJobPreferenceOfUser(users);
       if (jobPreferences!=null){
           jobPreferences.setJobTitle(jobPreferences1.getJobTitle());
           jobPreferences.setJobLocations(jobPreferences.getJobLocations());
           jobPreferences.setStartDate(jobPreferences1.getStartDate());
           jobPreferences.setEmploymentTypes(jobPreferences1.getEmploymentTypes());
           jobPreferences.setLocationTypes(jobPreferences1.getLocationTypes());
           jobPreferencesRepository.save(jobPreferences);
       }
    }
    public JobPreferenceDTO  convertToDto(JobPreferences jobPreferences){
        JobPreferenceDTO jobPreferenceDTO=new JobPreferenceDTO();
        jobPreferenceDTO.setJobLocations(jobPreferences.getJobLocations());
        jobPreferenceDTO.setJobTitle(jobPreferences.getJobTitle());
        jobPreferenceDTO.setLocationTypes(jobPreferences.getLocationTypes());
        jobPreferenceDTO.setEmploymentTypes(jobPreferences.getEmploymentTypes());
        jobPreferenceDTO.setStartDate(jobPreferences.getStartDate());
        return jobPreferenceDTO;
    }
}
