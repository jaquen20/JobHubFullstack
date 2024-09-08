package com.sandeep.JobHub.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data @Entity
public class PostData {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id ;
    public String contents;
    public String Image;
    private LocalDateTime dateTime;

    @OneToMany(mappedBy = "post",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    List<Comment> commentList=new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY)
    List<Likes> likesList=new ArrayList<>();
    private String profileImage;


    @ManyToOne
    private Users users;
}
