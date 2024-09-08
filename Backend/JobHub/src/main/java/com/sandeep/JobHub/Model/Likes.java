package com.sandeep.JobHub.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data @Entity
public class Likes {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private PostData postData;
    @ManyToOne
    private Users userReacted;
}
