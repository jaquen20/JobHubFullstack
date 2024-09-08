package com.sandeep.JobHub.DTOs;

import com.sandeep.JobHub.Model.Users;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class PostDataDTO {
    private Long id;
    private String contents;
    private String Image;
    private String username;
    private String about="Java developer";
    private LocalDateTime dateTime;
    List<CommentDTO> commentList;
    private String profileImage;
    private int noOfLikes;
    private UserDataDTO userData;
    private Users user;
}
