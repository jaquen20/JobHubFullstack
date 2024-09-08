package com.sandeep.JobHub.MsgConfig;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.messaging.Message;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArrayList;

public class MessageHandler extends TextWebSocketHandler {
    private final CopyOnWriteArrayList<WebSocketSession> sessions=new CopyOnWriteArrayList<>();
    private final ObjectMapper objectMapper=new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
    }
     @Override public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
         Message message1=objectMapper.readValue(message.getPayload(),Message.class);
         for(WebSocketSession webSocketSession:sessions){
             if (webSocketSession.isOpen()){
                 webSocketSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(message1)));
             }
         }
     }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }
}
