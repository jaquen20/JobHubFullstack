package com.sandeep.JobHub.Controller;

import com.sandeep.JobHub.Service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @CrossOrigin
public class NewsController {
    @Autowired
    private NewsService newsService;
    @GetMapping("/techNews")
    public String getTechNews(){
        return newsService.getTechNews();
    }
}
