package com.sandeep.JobHub.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NewsService {
    private static final String  KEY="4a7eba45cc684120b26a7fd3f6eaa60e";
//    private static final String  KoY="4a7eba45cc684120b26a7fd3f6eaa60e";
    private static final String TECH_NEWS_URL="https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=" + KEY;

    private final RestTemplate restTemplate;

    public NewsService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    public String getTechNews(){
        return restTemplate.getForObject(TECH_NEWS_URL, String.class);
    }
}
