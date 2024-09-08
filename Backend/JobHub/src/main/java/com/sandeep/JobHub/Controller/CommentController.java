package com.sandeep.JobHub.Controller;

import com.sandeep.JobHub.DTOs.PostDataDTO;
import com.sandeep.JobHub.Model.Comment;
import com.sandeep.JobHub.Model.PostData;
import com.sandeep.JobHub.Service.CommentService;
import com.sandeep.JobHub.Service.NotificationService;
import com.sandeep.JobHub.Service.PostDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin
public class CommentController {
    @Autowired
    public CommentService commentService;
    @Autowired
    public PostDataService postDataService;
    @Autowired
    public NotificationService notificationService;

    @PostMapping("/comments/{id}")
    public ResponseEntity<PostDataDTO> comment(@PathVariable Long id ,@RequestBody Comment comments){
        Authentication auth= SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            Comment comment=new Comment();
            PostData postData=postDataService.getPostById(id);
            comment.setPost(postData);
            comment.setContents(comments.getContents());
            commentService.setComments(auth.getName(),comment,id);
            PostDataDTO DTO=postDataService.convertToDto(postData);

            return ResponseEntity.ok(DTO);
        }else return ResponseEntity.ofNullable(new PostDataDTO());
    }

//    @GetMapping("/getComments/{id}")
//    public ResponseEntity<?> getAllCommentsByPostId(@PathVariable Long id){
//        Authentication auth=SecurityContextHolder.getContext().getAuthentication();
//        if (auth.isAuthenticated()) {
//            List<Comment> commentList=commentService.findAllCommentsByPostId(id);
//        }
//        }
//    }

}
