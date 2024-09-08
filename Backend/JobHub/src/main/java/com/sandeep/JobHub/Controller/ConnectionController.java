package com.sandeep.JobHub.Controller;

import com.sandeep.JobHub.DTOs.ConnectionDTO;
import com.sandeep.JobHub.Model.Connections;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Service.ConnectionService;
import com.sandeep.JobHub.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin
public class ConnectionController {
    @Autowired
    public UserService userService;
    @Autowired
    public ConnectionService connectionService;



    @PostMapping("/sendRequest/{id}") //for sending request
    public ResponseEntity<?> sendRequest(@PathVariable Long id) {
        Authentication auth=SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
           Users senderMe= userService.findByUsername(auth.getName());
           Users receiver=userService.findById(id);
           Connections con= connectionService.checkConnection(senderMe,receiver);
           if (con==null){
               Map<String, String> response = new HashMap<>();
               response.put("message", "Already connected");
               return new ResponseEntity<>(response,HttpStatus.CONFLICT);
           }
           else{
               Map<String, String> response = new HashMap<>();
               response.put("message", "Connected ");

               return new ResponseEntity<>(response, HttpStatus.OK);
           }
        }else { Map<String, String> response = new HashMap<>();
            response.put("message", "Login required");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }


@GetMapping("/getPendingRequestList")  //get all the connection request you get
    public ResponseEntity<?> requestList(){
        Authentication auth =SecurityContextHolder.getContext().getAuthentication();
        if(auth!=null&& auth.isAuthenticated()) {
            Users user=userService.findByUsername(auth.getName());
            List<ConnectionDTO> con=connectionService.findConnectionRequestGet(user);
            if (con==null){
                Map<String, String> response = new HashMap<>();
                response.put("message", "no request yest");
                return new ResponseEntity<>(response,HttpStatus.CONTINUE);
            }
            else {
               // List<UserDataDTO> userDataDTOList=connectionService.UserdataFromUsers(con);
                Map<String, List<ConnectionDTO>> response = new HashMap<>();
                response.put("message", con);

                return ResponseEntity.ok(response);
            }
        }
        else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login please");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PutMapping("/accept/{id}")   // accept  the request
    public ResponseEntity<?> AcceptRequest(@PathVariable Long id)  {
        Authentication auth =SecurityContextHolder.getContext().getAuthentication();
        if(auth!=null&& auth.isAuthenticated()) {
            Users meReceiver=userService.findByUsername(auth.getName());
            Users requestSender=userService.findById(id);
            Connections con=connectionService.findRequest(meReceiver,requestSender);//check if i receive the connection is valid or not
            if (con==null) {
                return new ResponseEntity<>("User Not Found",HttpStatus.NO_CONTENT);
            }
            else {
                connectionService.UpdateConnectionStatus(con);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("Accepted buddy hurray");
            }
        }    else return new ResponseEntity<>("login first",HttpStatus.UNAUTHORIZED);
    }
    @GetMapping("/sendRequestList")  //get all the connection request you send
    public ResponseEntity<?> requestSendList(){
        Authentication auth =SecurityContextHolder.getContext().getAuthentication();
        if(auth!=null&& auth.isAuthenticated()) {
            Users user=userService.findByUsername(auth.getName());
            List<ConnectionDTO> con=connectionService.findConnectionRequestSend(user);
            if (con==null){
                Map<String, String> response=new HashMap<>();
                response.put("message","No connections");
                return new ResponseEntity<>(response,HttpStatus.NO_CONTENT);
            }
            else {
               // List<UserDataDTO>userDataDTOList=connectionService.UserdataFromUsers(con);
                Map<String, List<ConnectionDTO>> response = new HashMap<>();
                response.put("message", con);
                return ResponseEntity.ok(response);
            }
        }
        else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Login first");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/myConnections")  //get all connections accepted
    public ResponseEntity<?>myConnections(){
        Authentication auth =SecurityContextHolder.getContext().getAuthentication();
        if (auth!=null && auth.isAuthenticated()){
            Users user=userService.findByUsername(auth.getName());
           List<ConnectionDTO> connections=connectionService.findAcceptedConnection(user);
            //List<Connections> connectionsList=connectionService.findAcceptedConnection(user);

            if (connections==null){
               Map<String, String> response=new HashMap<>();
               response.put("message","No Connection Yet");
               return new ResponseEntity<>(response,HttpStatus.NO_CONTENT);
           }else{
              // List<UserDataDTO> userDataDTOList=connectionService.UserdataFromUsers(connections);
               Map<String, List<ConnectionDTO>> response=new HashMap<>();
            response.put("message",connections);
            return ResponseEntity.ok(response);
           }
        }else{
            Map<String, String> response=new HashMap<>();
            response.put("error","Unauthorized");
            return new ResponseEntity<>(response,HttpStatus.UNAUTHORIZED);}
    }


    @GetMapping("/checkIsConnected/{id}")
    ResponseEntity<Boolean> checkPostIsLiked(@PathVariable Long id){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Users user=userService.findByUsername(authentication.getName());
            Users user2=userService.findById(id);
            if (user==user2){
                return ResponseEntity.ok(true);
            }
            boolean isConnected=connectionService.checkIsConnection(user2,user);
            return ResponseEntity.ok(isConnected);
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
    }



}
