package com.sandeep.JobHub.Service;

import com.sandeep.JobHub.Model.Likes;
import com.sandeep.JobHub.Model.PostData;
import com.sandeep.JobHub.Model.Users;
import com.sandeep.JobHub.Repository.ReactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReactionService {
    @Autowired
    public ReactionRepo reactionRepo;
    @Autowired
    public PostDataService postDataService;

    public Likes addReaction(Users users, PostData postData) {
        Optional<Likes> likes=reactionRepo.findByUserReactedAndPostData(users,postData);
        if (likes.isPresent()){
            return null;
        }else {
            Likes reaction=new Likes();
            reaction.setUserReacted(users);
            reaction.setPostData(postData);
           return reactionRepo.save(reaction);
        }
    }

    public void removeReaction(Users users, PostData postData) {
        Optional<Likes> likes=reactionRepo.findByUserReactedAndPostData(users,postData);
        likes.ifPresent(value -> reactionRepo.delete(value));

    }

    public List<Likes> getReactionByPost(PostData postData) {
        return reactionRepo.findByPostData(postData);
    }

    public boolean checkIsPostLiked(Long id, Users user) {
        PostData postData=postDataService.getPostById(id);
     Optional<Likes> likes= reactionRepo.findByUserReactedAndPostData(user,postData);
     if (likes.isPresent()){
         return  true;
     }else {
         return false;
     }
    }
}
