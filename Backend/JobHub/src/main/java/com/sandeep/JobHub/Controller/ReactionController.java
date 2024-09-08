package com.sandeep.JobHub.Controller;

import com.sandeep.JobHub.Model.Likes;
import com.sandeep.JobHub.Model.PostData;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Service.NotificationService;
import com.sandeep.JobHub.Service.PostDataService;
import com.sandeep.JobHub.Service.ReactionService;
import com.sandeep.JobHub.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin
public class ReactionController {
    @Autowired
    public ReactionService reactionService;
    @Autowired
    public PostDataService postDataService;
    @Autowired
    public UserService userService;
    @Autowired
    public NotificationService notificationService;
    @PostMapping("/addReaction/{id}")
    public ResponseEntity<?> react(@PathVariable Long id){
        Authentication auth= SecurityContextHolder.getContext().getAuthentication();
        if(auth!=null && auth.isAuthenticated()){
            Users users=userService.findByUsername(auth.getName());
            PostData postData=postDataService.getPostById(id);
            Likes likes=reactionService.addReaction(users,postData);
            if (likes==null){
                return new ResponseEntity<>("Already Exists",HttpStatus.FOUND);
            }else{
//                notificationService.sendAllConnections(users);
                notificationService.sendPostUserNotification(postData.getUsers());
                return new ResponseEntity<>(postData,HttpStatus.CREATED);
            }
        }
        else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/delReaction/{id}")
    public ResponseEntity<?> undoReact(@PathVariable Long id){
        Authentication auth= SecurityContextHolder.getContext().getAuthentication();
        if(auth!=null && auth.isAuthenticated()){
            Users users=userService.findByUsername(auth.getName());
            PostData postData=postDataService.getPostById(id);
            reactionService.removeReaction(users,postData);
            return new ResponseEntity<>(postData,HttpStatus.OK);
        }
        else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    @GetMapping("/post/{id}")
    public  ResponseEntity<List<?>> getMyReaction(@PathVariable Long id){
        Authentication auth=SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            PostData postData=postDataService.getPostById(id);
            List<Likes> reactions=reactionService.getReactionByPost(postData);
            return new ResponseEntity<>(reactions,HttpStatus.OK);
        }
        else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    @GetMapping("/checkIsLiked/{id}")
    ResponseEntity<Boolean> checkPostIsLiked(@PathVariable Long id){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Users user=userService.findByUsername(authentication.getName());
            boolean isLiked=reactionService.checkIsPostLiked(id,user);
            return ResponseEntity.ok(isLiked);
        }
        else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
    }

}
