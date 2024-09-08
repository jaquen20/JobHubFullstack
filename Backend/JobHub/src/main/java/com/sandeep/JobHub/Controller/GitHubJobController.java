package com.sandeep.JobHub.Controller;

import com.sandeep.JobHub.Service.GitHubJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController @CrossOrigin(origins = "http://localhost:5173")
public class GitHubJobController {
    @Autowired
    private GitHubJobService gitHubJobService;

     @GetMapping("/GitJobs")
    public List<Object> getJobs(@RequestParam String description, @RequestParam String location){
         return gitHubJobService.getJobs(description,location);
     }
}
