package com.sandeep.JobHub.MsgConfig;

import org.springframework.context.event.EventListener;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;



public class WebSocketEventListener {
    @EventListener
    public  void handleWebSocketDisconnectListener(SessionDisconnectEvent disconnectEvent){

    }
}
