package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.ChatRoom;
import com.sandeep.JobHub.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRoomRepo extends JpaRepository<ChatRoom, Long> {

    Optional<ChatRoom> findBySenderAndReceiver(Users sender, Users receiver);
}
