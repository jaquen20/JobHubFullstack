package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.Likes;
import com.sandeep.JobHub.Model.PostData;
import com.sandeep.JobHub.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReactionRepo extends JpaRepository<Likes,Long> {
    void findByUserReacted(Users users);

    Optional<Likes> findByUserReactedAndPostData(Users users, PostData postData);

    List<Likes> findByPostData(PostData postData);
}
