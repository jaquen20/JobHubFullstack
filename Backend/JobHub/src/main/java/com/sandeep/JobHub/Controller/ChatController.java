package com.sandeep.JobHub.Controller;

import com.sandeep.JobHub.Model.Chat;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Service.ChatService;
import com.sandeep.JobHub.Service.NotificationService;
import com.sandeep.JobHub.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
@Controller
@CrossOrigin
public class ChatController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private ChatService chatService;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private UserService userService;

    @GetMapping("/getMessages/{id}")
    public ResponseEntity<List<Chat>> getMessages(@PathVariable Long id){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Users sender=userService.findByUsername(authentication.getName());
            Users receiver=userService.findById(id);
            return ResponseEntity.ok(chatService.getMessages(sender,receiver));
        }
        else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    @MessageMapping("/private")
    public  void sendMessage(Chat chat){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Users sender=userService.findByUsername(authentication.getName());
            Users receiver=userService.findByUsername(chat.getReceiver().getUserEmail());
            if (receiver==null){
                throw new RuntimeException(("receiver not found"));
            }
            Chat chat1=new Chat();
            chat1.setSender(sender);
            chat1.setReceiver(receiver);
            chat1.setMessageChats(chat.getMessageChats());
            chat1.setLocalDateTime(LocalDateTime.now());
            chatService.saveMessages(chat1);
            simpMessagingTemplate.convertAndSendToUser(receiver.getUserEmail(),"/specific",chat1);
        }
    }
@GetMapping("/messages/{username}")
    public List<Chat> getChatMessages(@PathVariable String username){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
            if (authentication.isAuthenticated()){
                Users sender=userService.findByUsername(authentication.getName());
                Users receiver=userService.findByUsername(username);
                if (receiver==null){
                    throw new RuntimeException("Receiver not found");
                }
                return chatService.getMessages(sender,receiver);

            }
            else return null;
    }












}
