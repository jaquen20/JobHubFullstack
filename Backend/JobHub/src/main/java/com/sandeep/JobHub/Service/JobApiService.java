package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.Model.JobAPI;
import com.sandeep.JobHub.Repository.AdzunaResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class JobApiService {
    @Autowired
    private RestTemplate restTemplate;
//    @Value("${https://api.adzuna.com/v1/api/jobs}")
//    private final String apiUrl="https://api.adzuna.com/v1/api/";

//    @Value("${8f3d9525}")
//    private final String apiId="8f3d9525";
////    @Value("${09d8b4234066b6b39b7867d7ad6ff9fe}")
//    private final String apiKey="09d8b4234066b6b39b7867d7ad6ff9fe";

    @Value("${adzuna.api.url}")
    private String apiUrl;

    @Value("${adzuna.api.app_id}")
    private String apiId;

    @Value("${adzuna.api.app_key}")
    private String apiKey;

    public JobApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<JobAPI> getJobsList(String searchQuery) {
        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(apiUrl + "/in/search/1")
                .queryParam("app_id", apiId)
                .queryParam("app_key", apiKey)
                .queryParam("results_per_page", 10)
                .queryParam("what", searchQuery);

        String url = uriComponentsBuilder.toUriString();
//        return restTemplate.getForObject(url,String.class);
        AdzunaResponse response = restTemplate.getForObject(url, AdzunaResponse.class);
        return response != null ? response.getResults() : null;
    }


    public List<JobAPI> getQueriedJobsList(String searchQuery, String location, String jobTitle) {
        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(apiUrl + "/us/search/1")
                .queryParam("app_id", apiId)
                .queryParam("app_key", apiKey)
                .queryParam("results_per_page", 10);

        if (searchQuery != null && !searchQuery.isEmpty()) {
            uriComponentsBuilder.queryParam("what", searchQuery);
        }
        if (location != null && !location.isEmpty()) {
            uriComponentsBuilder.queryParam("where", location);
        }
        if (jobTitle != null && !jobTitle.isEmpty()) {
            uriComponentsBuilder.queryParam("title", jobTitle);
        }

        String url = uriComponentsBuilder.toUriString();
        AdzunaResponse response = restTemplate.getForObject(url, AdzunaResponse.class);
        return response != null ? response.getResults() : null;
    }
}
