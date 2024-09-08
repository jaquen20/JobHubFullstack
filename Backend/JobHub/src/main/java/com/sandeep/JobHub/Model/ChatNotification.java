package com.sandeep.JobHub.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @Builder @NoArgsConstructor
public class ChatNotification {
    private Long id;
    private  Users sender;
    private Users receiver;
    private String messages;

}
