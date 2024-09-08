package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.Notification;
import com.sandeep.JobHub.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepo extends JpaRepository<Notification,Long> {

    List<Notification> findByUsers(Users users);
}
