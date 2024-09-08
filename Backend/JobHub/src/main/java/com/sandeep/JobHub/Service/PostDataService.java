package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.DTOs.CommentDTO;
import com.sandeep.JobHub.DTOs.PostDataDTO;
import com.sandeep.JobHub.DTOs.UserDataDTO;
import com.sandeep.JobHub.Exception.PostNotFoundException;
import com.sandeep.JobHub.Exception.UserNotFoundException;
import com.sandeep.JobHub.Model.Comment;
import com.sandeep.JobHub.Model.PostData;
import com.sandeep.JobHub.Model.UserData;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Repository.PostDataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PostDataService {
    @Autowired
    public UserService userService;
    @Autowired
    public PostDataRepo postRepo;
    @Autowired
    public UserDataService userDataService;



    public void createPost(PostData postData, String username) {
        Optional<Users> user=userService.findByEmail(username);
        if (user.isPresent()){
            postData.setUsers(user.get());
            postData.setDateTime(getCurrentTime());
            postRepo.save(postData);
        }else {
            throw new UserNotFoundException("User with email " + username + " not found");
        }
    }

    public void deletePost(Long id, String username) {
        Optional<Users> user=userService.findByEmail(username);
        if (user.isPresent()){
            Optional<PostData> PD=postRepo.findById(id);
            if (PD.isPresent()){
                postRepo.deleteById(id);
            }else {
                throw new PostNotFoundException("Post not found");
            }
        }
    }

    public List<PostData> getFeed(String username) {
        Optional<Users> user=userService.findByEmail(username);
        if (user.isPresent()){
            return postRepo.findByUsers(user.get());
        }else {
            throw new UserNotFoundException("user not found");
        }
    }

    public PostData getPostById(Long id) {
        Optional<PostData> postData= postRepo.findById(id);
        return postData.orElse(null);
    }

    public List<PostData> findAllFeed() {
        return postRepo.findAll();
    }
    public static LocalDateTime getCurrentTime(){
        return LocalDateTime.now();
    }

    public List<PostDataDTO> convertToDTO(List<PostData> postDataList) {
        return postDataList.stream().map(this::convertToDto).collect(Collectors.toList());

    }

    public PostDataDTO convertToDto(PostData postData) {
        PostDataDTO postDataDTO=new PostDataDTO();
        postDataDTO.setId(postData.getId());
        postDataDTO.setContents(postData.getContents());
        postDataDTO.setDateTime(postData.getDateTime());
        postDataDTO.setImage(postData.getImage());
        postDataDTO.setUser(postData.getUsers());
        String username=postData.getUsers().getUserEmail();

//        postDataDTO.setNoOfLikes(postData.getLikesList().);
        UserData userData=userDataService.getUserData(username);
        if (userData!=null){
            UserDataDTO dataDTO=userDataService.convertToDTO(userData);
            postDataDTO.setUserData(dataDTO);
            postDataDTO.setUsername(userData.getFullName());
            postDataDTO.setAbout(userData.getHeadline());
            postDataDTO.setProfileImage(userData.getProfileImage());
        }

        List<CommentDTO> commentDTOS=postData.getCommentList().stream().map(this::ConvertCommentDTO).collect(Collectors.toList());

        postDataDTO.setCommentList(commentDTOS);
        return postDataDTO;
    }

    private CommentDTO ConvertCommentDTO(Comment comment) {
        CommentDTO commentDTO=new CommentDTO();
        commentDTO.setContents(comment.getContents());
        commentDTO.setLocalDateTime(comment.getDateTime());
        String username =comment.getUsers().getUserEmail();
        UserData userData=userDataService.getUserData(username);
        if (userData!=null){
        commentDTO.setUsername(userData.getFullName());
        }
         else{
             commentDTO.setUsername("Anonymous");
        }
         return commentDTO;
    }


    public void createPostWithImage(String text, MultipartFile image, String username) throws IOException {
        String fileName = saveImage(image);
        PostData postData=new PostData();

        Optional<Users> user=userService.findByEmail(username);
        if (user.isPresent()){
            postData.setImage(fileName);
            postData.setContents(text);
            postData.setUsers(user.get());
            postData.setDateTime(getCurrentTime());
            postRepo.save(postData);
        }else {
            throw new UserNotFoundException("User with email " + username + " not found");
        }


    }

    public String saveImage(MultipartFile imageFile) throws IOException {

        String filename = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();

        String imagePath = "src/main/resources/static/images" + File.separator + filename;

        Files.copy(imageFile.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING);
        return filename;
    }
}
