package com.sandeep.JobHub.Controller;

import com.sandeep.JobHub.Model.JobAPI;
import com.sandeep.JobHub.Model.JobPreferences;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Service.JobApiService;
import com.sandeep.JobHub.Service.JobPreferenceService;
import com.sandeep.JobHub.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController @CrossOrigin(origins = "*")
public class JobApiController {
    @Autowired
    private JobApiService jobApiService;
    @Autowired
    private UserService userService;
    @Autowired
    private JobPreferenceService jobPreferenceService;

    @CrossOrigin()
    @GetMapping("/getApiJobs")
    public List<JobAPI> getJobs(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            List<JobAPI> jobAPIS=new ArrayList<>();
            Users users=userService.findByUsername(authentication.getName());
            JobPreferences jobPreference=jobPreferenceService.findJobPreferenceOfUser(users);
            List<String> titles=jobPreference.getJobTitle();
            for (String title:titles){
                String encodedTitle=encode(title);
                System.out.println(title);
                jobAPIS.addAll(jobApiService.getJobsList(encodedTitle));
            }
            return jobAPIS;

        }
        return jobApiService.getJobsList("Java+developer");
    }








//    @GetMapping("/jobQuery")
//    public List<JobAPI> getQueriedJobs(@RequestParam(required = false) String searchQuery,@RequestParam(required = false)String location,@RequestParam(required = false)String jobTitle){
//        return jobApiService.getQueriedJobsList(searchQuery,location,jobTitle);
//    }
    public static  String encode(String query){
        return URLEncoder.encode(query, StandardCharsets.UTF_8);
    }
}
