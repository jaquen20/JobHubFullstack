package com.sandeep.JobHub.DTOs;

import lombok.Data;

@Data
public class NotificationDTO {
    private String message;
    private long notifyDate;
    private Long userid;
    private Long postId;
    private String profile;
    private boolean isSeen;


}
