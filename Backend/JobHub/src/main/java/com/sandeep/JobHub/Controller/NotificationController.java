package com.sandeep.JobHub.Controller;

import com.sandeep.JobHub.DTOs.NotificationDTO;
import com.sandeep.JobHub.Model.Notification;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Service.NotificationService;
import com.sandeep.JobHub.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin
public class NotificationController {

    @Autowired
    public NotificationService notificationService;
    @Autowired
    public UserService userService;


    @GetMapping("/getAllNotification")
    public ResponseEntity<?> getNotifications(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            Users users=userService.findByUsername(auth.getName());
            List<Notification> notifications=notificationService.getAllNotifications(users);
            notificationService.markAllRead(notifications);
            List<NotificationDTO> notificationDTOList=notificationService.convertNotification(notifications);
            Map<String, List<NotificationDTO>> response=new HashMap<>();
            response.put("details",notificationDTOList);
            return ResponseEntity.ok(response);
        }
        else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }


}
