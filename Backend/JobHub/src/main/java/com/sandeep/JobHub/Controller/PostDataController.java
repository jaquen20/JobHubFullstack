package com.sandeep.JobHub.Controller;

import com.sandeep.JobHub.DTOs.PostDataDTO;
import com.sandeep.JobHub.Model.PostData;
import com.sandeep.JobHub.Service.PostDataService;
import com.sandeep.JobHub.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RequestMapping("/post")
@Controller
@CrossOrigin
public class PostDataController {
    @Autowired
    public PostDataService postService;
    @Autowired
    public UserService userService;

    @PostMapping("/createPost")
    public ResponseEntity<?> createPost(@RequestBody PostData postData){
        Authentication auth= SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            String username = auth.getName();
            postService.createPost(postData,username);
            return ResponseEntity.ok().body("success") ;

        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

    }

    @PostMapping("/createNewPost")
    public ResponseEntity<?> createPostWithImage(@RequestParam("text")String text, @RequestParam("image")MultipartFile image) throws IOException {
        Authentication auth= SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            String username = auth.getName();
            postService.createPostWithImage(text,image,username);
            return ResponseEntity.ok().body("success") ;

        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

    }



    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id){
        Authentication auth=SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            String  username= auth.getName();
            postService.deletePost(id,username);
            return ResponseEntity.ok().body("post deleted successfully");
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("not authorised");
        }
    }
    @GetMapping("/myFeed")
    public ResponseEntity<List<PostData>> feed(){
        Authentication auth =SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            String username =auth.getName();
            List<PostData> FeedData=postService.getFeed(username);
            return ResponseEntity.ok(FeedData);
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());
        }
    }


    @GetMapping("/HomeFeed")
    public ResponseEntity<?> HomeFeed(){
        Authentication auth =SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){

            List<PostData> postDataList=postService.findAllFeed();
            List<PostDataDTO> DTO=postService.convertToDTO(postDataList);

            Map<String, List<PostDataDTO>> response=new HashMap<>();
            response.put("details",DTO);
           return ResponseEntity.ok(response);
           // return ResponseEntity.ok(DTO) ;
        }else return ResponseEntity.of(Optional.empty());
    }

        @GetMapping("/post/{id}")
    public ResponseEntity<?> findPost(@PathVariable Long id){
            Authentication auth=SecurityContextHolder.getContext().getAuthentication();
            if (auth!=null && auth.isAuthenticated()){
                //String  username= auth.getName();
               PostData postData= postService.getPostById(id);
               if (postData!=null){
                   Map<String, PostData> response=new HashMap<>();
                   response.put("data",postData);
                   return ResponseEntity.ok(response);
               }else {
                   Map<String, String> response=new HashMap<>();
                   response.put("message","no post with thi id found");
                   return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
               }

            }else {
                Map<String, String> response=new HashMap<>();
                response.put("message","postData");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        }

}
