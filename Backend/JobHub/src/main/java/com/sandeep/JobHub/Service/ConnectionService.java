package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.DTOs.ConnectionDTO;
import com.sandeep.JobHub.DTOs.UserDataDTO;
import com.sandeep.JobHub.Model.Connections;
import com.sandeep.JobHub.Model.UserData;
import com.sandeep.JobHub.Model.Users;

import com.sandeep.JobHub.Repository.ConnectionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class ConnectionService {
    @Autowired
    public ConnectionRepo connectionRepo;
    @Autowired
    public UserDataService userDataService;
    @Autowired
    private NotificationService notificationService;


    public Connections checkConnection(Users senderMe, Users receiver){
        if (connectionRepo.findByReceiverAndSender(senderMe,receiver).isPresent() ){
            return null;
        } else if (connectionRepo.findBySenderAndReceiver(senderMe,receiver).isPresent()) {
            return null;
        } else{
            Connections connections=new Connections();
            connections.setSender(senderMe);
            connections.setReceiver(receiver);
            connections.setAccepted(false);
            String username= userDataService.getUsernameByMail(senderMe.getUserEmail());
            notificationService.createNotification(receiver,"You have a connection request from " + username);

            return connectionRepo.save(connections);
        }
    }






    public List<ConnectionDTO> findConnectionRequestSend(Users user) {
        Optional<List<Connections>> con=connectionRepo.findBySenderAndIsAcceptedFalse(user);
        List<ConnectionDTO> connectionDTOList=new ArrayList<>();
        if (con.isPresent()) {
            for (Connections request : con.get()) {
                if (request.getSender().equals(user)) {

                    ConnectionDTO connectionDTO = new ConnectionDTO();
                    UserData userData = userDataService.findByUsers(request.getReceiver());
                    connectionDTO.setFullName(userData.getFullName());
                    connectionDTO.setAbout("Java developer");
                    connectionDTO.setConnectionDate(request.getDateOfConnection());
                    connectionDTO.setUsers(userData.getUsers());
                    connectionDTOList.add(connectionDTO);
                   // connection.add(request.getReceiver());
                } else {
                    ConnectionDTO connectionDTO = new ConnectionDTO();
                    UserData userData = userDataService.findByUsers(request.getSender());
                    connectionDTO.setFullName(userData.getFullName());
                    connectionDTO.setAbout("Java developer");
//                    connectionDTO.setConnectionDate(request.getDateOfConnection());
                    connectionDTO.setUsers(userData.getUsers());
                    connectionDTOList.add(connectionDTO);
                   // connection.add(request.getSender());
                }
            }
            return connectionDTOList;
        }else {return  null;}

    }



    public List<ConnectionDTO> findConnectionRequestGet(Users user) {
        Optional<List<Connections>> con=connectionRepo.findByReceiverAndIsAcceptedFalse(user);
        List<Users> connection=new ArrayList<>();
        List<ConnectionDTO> connectionDTOList=new ArrayList<>();
        if (con.isPresent()) {
            for (Connections request : con.get()) {
                if (request.getSender().getUserEmail().equals(user.getUserEmail())) {
                    ConnectionDTO connectionDTO = new ConnectionDTO();
                    UserData userData = userDataService.findByUsers(request.getReceiver());
                    connectionDTO.setFullName(userData.getFullName());
                    connectionDTO.setAbout("Java developer");
                    connectionDTO.setConnectionDate(request.getDateOfConnection());
                    connectionDTO.setUsers(userData.getUsers());
                    connectionDTOList.add(connectionDTO);

                    connection.add(request.getReceiver());
                } else {

                    ConnectionDTO connectionDTO = new ConnectionDTO();
                    UserData userData = userDataService.findByUsers(request.getSender());
                    connectionDTO.setFullName(userData.getFullName());
                    connectionDTO.setAbout("Java developer");
//                    connectionDTO.setConnectionDate(request.getDateOfConnection());
                    connectionDTO.setUsers(userData.getUsers());
                    connectionDTOList.add(connectionDTO);

                    connection.add(request.getSender());
                }
            }
            return connectionDTOList;
        }else return Collections.emptyList();
        //return con.orElse(null);
    }

    public Connections findRequest(Users receiver, Users sender)  {
        Optional<Connections> con=connectionRepo.findByReceiverAndSender(receiver,sender);


        return con.orElse(null);
    }

    public void UpdateConnectionStatus(Connections con) {

        con.setAccepted(true);
        con.setDateOfConnection(LocalDate.now());
        connectionRepo.save(con);
    }

    public List<ConnectionDTO> findAcceptedConnection(Users user) {
        Optional<List<Connections>> con=connectionRepo.findBySenderAndIsAcceptedTrueOrReceiverAndIsAcceptedTrue(user,user);

        List<Users> connection=new ArrayList<>();
        List<ConnectionDTO> connectionDTOList=new ArrayList<>();
        if (con.isPresent()) {
            for (Connections request : con.get()) {
                if (request.getSender().equals(user)) {

                    ConnectionDTO connectionDTO = new ConnectionDTO();
                    UserData userData = userDataService.findByUsers(request.getReceiver());
                    connectionDTO.setFullName(userData.getFullName());
                    connectionDTO.setAbout("Java developer");
                    connectionDTO.setConnectionDate(request.getDateOfConnection());
                    connectionDTO.setUsers(userData.getUsers());
                    connectionDTOList.add(connectionDTO);
                    connection.add(request.getReceiver());
                } else {
                    ConnectionDTO connectionDTO = new ConnectionDTO();
                    UserData userData = userDataService.findByUsers(request.getSender());
                    connectionDTO.setFullName(userData.getFullName());
                    connectionDTO.setAbout("Java developer");
                    connectionDTO.setDates(dayCalculator(request.getDateOfConnection()));
                    connectionDTO.setConnectionDate(request.getDateOfConnection());
                    connectionDTO.setUsers(userData.getUsers());
                    connectionDTOList.add(connectionDTO);
                    connection.add(request.getSender());
                }
            }
            return connectionDTOList;
        }else {return  null;}


    }
    public List<Connections> findAcceptedConnections(Users user) {
        Optional<List<Connections>> con=connectionRepo.findBySenderAndIsAcceptedTrueOrReceiverAndIsAcceptedTrue(user,user);

        List<Users> connection=new ArrayList<>();
        List<ConnectionDTO> connectionDTOList=new ArrayList<>();
        if (con.isPresent()) {
            return con.get();
//            for (Connections request : con.get()) {
//                if (request.getSender().equals(user)) {
//
//                    ConnectionDTO connectionDTO = new ConnectionDTO();
//                    UserData userData = userDataService.findByUsers(request.getReceiver());
//                    connectionDTO.setFullName(userData.getFullName());
//                    connectionDTO.setAbout("Java developer");
//                    connectionDTO.setConnectionDate(request.getDateOfConnection());
//                    connectionDTO.setUsers(userData.getUsers());
//                    connectionDTOList.add(connectionDTO);
//                    connection.add(request.getReceiver());
//                } else {
//                    ConnectionDTO connectionDTO = new ConnectionDTO();
//                    UserData userData = userDataService.findByUsers(request.getSender());
//                    connectionDTO.setFullName(userData.getFullName());
//                    connectionDTO.setAbout("Java developer");
//                    connectionDTO.setConnectionDate(request.getDateOfConnection());
//                    connectionDTO.setUsers(userData.getUsers());
//                    connectionDTOList.add(connectionDTO);
//                    connection.add(request.getSender());
//                }
//            }
//            return connection;
        }else {return  null;}

    }


    public List<Users> findConnection(Users users) {
        Optional<List<Connections>> usersList=connectionRepo.findBySenderOrReceiverAndIsAcceptedTrue(users,users);
        if (usersList.isPresent()){
            List<Users> connectedUsers=new ArrayList<>();
            List<ConnectionDTO> connectionDTOList=new ArrayList<>();
            for (Connections con: usersList.get()){
                if (con.getReceiver()!=users){

                    connectedUsers.add(con.getReceiver());

                }else {
                    connectedUsers.add(con.getSender());


                }

            }
            return connectedUsers;
        }else return null;
    }

    public List<UserDataDTO> UserdataFromUsers(List<Users> users){
        List<UserDataDTO> connectedUsers=new ArrayList<>();
        List<ConnectionDTO>connectionDTOList=new ArrayList<>();
        for (Users connections: users){
               UserData userData= userDataService.findByUsers(connections);
               UserDataDTO dataDTO=userDataService.convertToDTO(userData);

                connectedUsers.add(dataDTO);
        }
        return connectedUsers;
    }

    public static long dayCalculator(LocalDate date){
        LocalDate today=LocalDate.now();
        return 32;
//        return ChronoUnit.DAYS.between(date,today);
    }
    public long noOfConnection(Users user){
        List<ConnectionDTO> connectionDTOList= findAcceptedConnection(user);
        return connectionDTOList.size();
    }

    public boolean checkIsConnection(Users user1, Users user2) {
        Optional<Connections> connections=connectionRepo.findByReceiverAndSender(user1,user2);
        Optional<Connections> connections2=connectionRepo.findByReceiverAndSender(user2,user1);

        if (connections.isPresent()){
            return true;
        } else if (connections2.isPresent()) {
            return true;
        }

        else return false;

    }
}
