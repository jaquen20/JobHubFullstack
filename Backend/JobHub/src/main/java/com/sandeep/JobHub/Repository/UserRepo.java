package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Long> {
    Optional<Users> findByUserEmail(String Email);
}
