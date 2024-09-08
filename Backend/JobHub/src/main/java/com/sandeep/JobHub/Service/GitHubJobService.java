package com.sandeep.JobHub.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class GitHubJobService {

    private final  RestTemplate restTemplate;
    public GitHubJobService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    private final String apiUrl="https://jobs.github.com/positions.json";
    public List<Object> getJobs(String description,String location){
        String url=String.format("%s?description=%s&locations=%s",apiUrl,description,location);
        Object[] jobs=restTemplate.getForObject(url,Object[].class);
        assert jobs != null;
        return Arrays.asList(jobs);
    }
}
