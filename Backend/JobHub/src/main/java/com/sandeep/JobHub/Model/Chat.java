package com.sandeep.JobHub.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data @Entity 
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Users sender;
    @ManyToOne
    private Users receiver;
    private String chatId;
    private String messageChats;
    private LocalDateTime localDateTime;
}

