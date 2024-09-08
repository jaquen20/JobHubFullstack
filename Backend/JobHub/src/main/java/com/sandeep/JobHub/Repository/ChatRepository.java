package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.Chat;
import com.sandeep.JobHub.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {

    List<Chat> findBySenderAndReceiver(Users sender, Users receiver);

    List<Chat> findByReceiverAndSender(Users sender, Users receiver);

    List<Chat> findByChatId(String s);
}
