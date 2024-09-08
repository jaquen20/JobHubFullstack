package com.sandeep.JobHub.DTOs;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class CommentDTO {
    private LocalDateTime localDateTime;
    private String contents;
    private String username;
}
