package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.Model.Chat;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class ChatService {
    @Autowired
    public ChatRepository chatRepository;
    @Autowired
    public ChatRoomService chatRoomService;
    @Autowired
    UserService userService;



    public void saveMessages(Chat chat){
        String chatId=chatRoomService.getChatRoomId(chat.getSender(),chat.getReceiver(),true)
                .orElseThrow();
        chat.setChatId(chatId);
        chatRepository.save(chat);
    }

    public  List<Chat> getMessagesBetweenUsers(String username1, String username2){
        Users user1= userService.findByUsername(username1);
        Users user2=userService.findByUsername(username2);
        List<Chat>messages=chatRepository.findBySenderAndReceiver(user1,user2);
        messages.addAll(chatRepository.findByReceiverAndSender(user1,user2));
        messages.sort((m1,m2)->
            m1.getLocalDateTime().compareTo(m2.getLocalDateTime())
        );
        return messages;
    }


    public  List<Chat> getChats(Users sender,Users receiver){
        var chatId=chatRoomService.getChatRoomId(sender,receiver,false);
        return chatId.map(chatRepository::findByChatId).orElse(new ArrayList<>());
    }



    public Chat sendMsg(Users user, Users receiver,String message) {
        Chat chat=new Chat();
        chat.setMessageChats(message);
        chat.setReceiver(receiver);
        chat.setSender(user);
        chat.setLocalDateTime(LocalDateTime.now());
        return chatRepository.save(chat);

    }

    public List<Chat> getMessages(Users sender, Users receiver) {
        List<Chat> receivedMessages=chatRepository.findBySenderAndReceiver(sender,receiver);
        List<Chat>sendMessages=chatRepository.findByReceiverAndSender(sender,receiver);
        List<Chat> allMessages=new ArrayList<>();
        allMessages.addAll(receivedMessages);
        allMessages.addAll(sendMessages);
        allMessages.sort(Comparator.comparing(Chat::getLocalDateTime));
        return allMessages;
    }
}
