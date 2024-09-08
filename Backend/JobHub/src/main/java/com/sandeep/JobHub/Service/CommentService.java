package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.Model.Comment;
import com.sandeep.JobHub.Model.UserData;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Repository.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
@Service
public class CommentService {
    @Autowired
    public PostDataService postDataService;
@Autowired
    public CommentRepo commentRepo;
    @Autowired
    public UserService userService;
    @Autowired
    public UserDataService userDataService;
    @Autowired
    public NotificationService notificationService;

    public void setComments(String name, Comment comment,Long id) {
       Optional<Users> users= userService.findByEmail(name);
        if (users.isPresent()){
            comment.setUsers(users.get());
            comment.setDateTime(getCurrent());
            UserData userData=userDataService.findByUsers(users.get());
            comment.setImage(userData.getProfileImage());
            String username= userDataService.getUsernameByMail(users.get().getUserEmail());
            notificationService.createNotificationRelatedPost(id,username+" commented on your post");
            commentRepo.save(comment);
        }
    }
    public LocalDateTime getCurrent(){
        return LocalDateTime.now();
    }

//    public List<Comment> findAllCommentsByPostId(Long id) {
//        postDataService.getPostById(id)
//    }
}
