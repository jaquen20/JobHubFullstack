package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.DTOs.AppliedUserDTO;
import com.sandeep.JobHub.Model.AppliedUserData;
import com.sandeep.JobHub.Model.Job;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Repository.AppliedUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AppliedUserService {
    private static  final  String UPLOAD_DIR="src/main/resources/static/docs";
    @Autowired
    private UserService userService;
    @Autowired
    private JobService jobService;
    @Autowired
    private AppliedUserRepository appliedUserRepository;


    public AppliedUserData storeFile(MultipartFile file, String username, Long id, AppliedUserData  appliedUserData1) throws IOException {
        Users users=userService.findByUsername(username);
        Job job=jobService.findJobById(id);

        if (job!=null) {
            String originalFileName = file.getOriginalFilename();
            String uniqueName = UUID.randomUUID() + "_" + originalFileName;
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            System.out.println(uniqueName);
//            File destinationFile = new File(uploadDir, uniqueName);
//            file.transferTo(destinationFile);

            Files.copy(file.getInputStream(), Paths.get(UPLOAD_DIR), StandardCopyOption.REPLACE_EXISTING);
            appliedUserData1.setUsers(users);
            appliedUserData1.setResume(uniqueName);
            appliedUserData1.setJob(job);
//            AppliedUserData appliedUserData = new AppliedUserData();
//            appliedUserData.setEmail(appliedUserData1.getEmail());
//            appliedUserData.setMobileNo(appliedUserData1.getMobileNo());
//            appliedUserData.setUsername(appliedUserData1.getUsername());
//            appliedUserData.setResume(uniqueName);
//            appliedUserData.setUsers(users);
//            appliedUserData.setJob(job);
            System.out.println(appliedUserData1);
            return appliedUserRepository.save(appliedUserData1);
        }
        else return null;
    }

    public List<AppliedUserDTO> convertToDto(List<AppliedUserData> jobs) {
        return jobs.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public  AppliedUserDTO convertToDto(AppliedUserData appliedUserData){
        AppliedUserDTO appliedUserDTO=new AppliedUserDTO();
        appliedUserDTO.setEmail(appliedUserData.getEmail());
        appliedUserDTO.setResume(appliedUserData.getResume());
        appliedUserDTO.setUsername(appliedUserData.getUsername());
        appliedUserDTO.setMobileNo(appliedUserData.getMobileNo());

        return appliedUserDTO;
    }

    public List<AppliedUserData> findCandidatesByJobs(Job job) {
        return appliedUserRepository.findByJob(job);
    }

    public List<Job> findjobsApplied(Users users) {
        List<AppliedUserData>  appliedUserData= appliedUserRepository.findByUsers(users);
        if (appliedUserData!=null) {
            List<Job> jobList = new ArrayList<>();
            for (AppliedUserData appliedUserData1 : appliedUserData) {
                jobList.add(appliedUserData1.getJob());
            }
            return jobList;
        }
        else return null;

    }
}
