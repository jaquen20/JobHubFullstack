package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.PostData;
import com.sandeep.JobHub.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostDataRepo extends JpaRepository<PostData,Long> {
    List<PostData> findByUsers(Users user);
}
