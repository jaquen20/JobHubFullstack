package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.UserData;
import com.sandeep.JobHub.Model.Users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserDataRepo extends JpaRepository<UserData,Long> {

    UserData findByUsers(Users user);
}
