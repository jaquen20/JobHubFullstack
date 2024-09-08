package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.DTOs.NotificationDTO;
import com.sandeep.JobHub.Model.*;
import com.sandeep.JobHub.Repository.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class NotificationService {
    @Autowired
    public NotificationRepo notificationRepo;
//    @Autowired
//    private ConnectionService connectionService;
    @Autowired
    private UserDataService userService;


    public void createNotification(Users connectUser, String s) {
        Notification notification=new Notification();
        notification.setUsers(connectUser);
        notification.setNotifyDate(LocalDate.now());
        notification.setMessage(s);
        notificationRepo.save(notification);
    }
    public void createNotificationRelatedPost(Long id, String s) {
        Notification notification=new Notification();
        notification.setPostId(id);
//        notification.setUsers(connectUser);
        notification.setNotifyDate(LocalDate.now());
        notification.setMessage(s);
        notificationRepo.save(notification);
    }

    public List<Notification> getAllNotifications(Users users) {
        List<Notification> notificationList= notificationRepo.findByUsers(users);
        List<NotificationDTO> notificationDTOS=new ArrayList<>();
        for(Notification notification : notificationList){
            notificationDTOS.add(convertToDTO(notification));
        }
        return notificationList;
    }

    public void markAllRead(List<Notification> notifications) {
        notifications.stream().map(this::markRead).collect(Collectors.toList());

    }

    private Notification markRead(Notification notification) {
        notification.setHasSeen(true);
        return notification;
    }

//    public void sendAllConnections(Users users) {
//       List<Users> usersList= connectionService.findConnection(users);
//    }

    public void sendPostUserNotification(Users users) {
        Notification notification=new Notification();
        notification.setUsers(users);
        notification.setMessage(users.getUserEmail() + "liked your post");
        notification.setHasSeen(false);
        notificationRepo.save(notification);
    }

    public List<NotificationDTO> convertNotification(List<Notification> notifications) {
       return notifications.stream().map(this::convertToDTO).collect(Collectors.toList());

    }
public NotificationDTO convertToDTO(Notification notification){
        NotificationDTO dto=new NotificationDTO();
        dto.setMessage(notification.getMessage());
    UserData userData=userService.findByUsers(notification.getUsers());
        dto.setNotifyDate(dayCalculator(notification.getNotifyDate()));
        dto.setProfile(userData.getProfileImage());
    dto.setUserid(notification.getUsers().getId());
    dto.setSeen(true);
    dto.setPostId(notification.getPostId());
    return dto;
}
    public static long dayCalculator(LocalDate date){
        LocalDate today=LocalDate.now();
        if(date==null){
            return 0;
        }else {
            return ChronoUnit.DAYS.between(date, today);
        }
    }

}
