package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.Model.ChatRoom;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Repository.ChatRoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatRoomService {
    @Autowired
    private ChatRoomRepo chatRoomRepo;

    public Optional<String> getChatRoomId(Users sender,Users receiver, boolean createNewRoomIfNotExists){
        return  chatRoomRepo.findBySenderAndReceiver(sender,receiver)
                .map(ChatRoom::getChatId)
                .or(()->{
                    if (createNewRoomIfNotExists){
                        var chatId=createChatId(sender,receiver);
                        return Optional.of(chatId);
                    }
                    return Optional.empty();
                });

    }

    private String createChatId(Users sender, Users receiver) {
        var chatId=String.format("%s_%s",sender.getUserEmail(),receiver.getUserEmail());
        ChatRoom senderReceiver = ChatRoom
                .builder()
                .chatId(chatId)
                .sender(sender)
                .receiver(receiver)
                .build();
        ChatRoom receiverSender = ChatRoom
                .builder()
                .chatId(chatId)
                .sender(receiver)
                .receiver(sender)
                .build();

        chatRoomRepo.save(senderReceiver);
        chatRoomRepo.save(receiverSender);
        return chatId;

    }
}
