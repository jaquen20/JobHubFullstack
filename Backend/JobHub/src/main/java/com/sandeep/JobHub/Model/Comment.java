package com.sandeep.JobHub.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data @Entity
public class Comment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Users users;

private String image;
    private LocalDateTime dateTime;
    private String contents;
    @ManyToOne
    @JoinColumn(name = "post_id")
    private PostData post;
}
