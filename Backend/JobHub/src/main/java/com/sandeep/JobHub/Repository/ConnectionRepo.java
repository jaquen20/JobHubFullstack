package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.Connections;
import com.sandeep.JobHub.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface ConnectionRepo extends JpaRepository<Connections, Long> {

    Optional<Connections> findBySenderAndReceiver(Users u1, Users u2);

    Optional<List<Connections>>  findByReceiverAndIsAccepted(Users user, boolean b);

    Optional<List<Connections>> findBySenderAndIsAcceptedFalse(Users user);

    Optional<Connections> findByReceiverAndSender(Users receiver, Users sender);

    Optional<List<Connections>> findBySenderOrReceiverAndIsAcceptedTrue(Users user,Users users);
    Optional<List<Connections>> findBySenderAndIsAcceptedTrueOrReceiverAndIsAcceptedTrue(Users sender, Users receiver);

    Optional<List<Connections>> findByReceiverAndIsAcceptedFalse(Users user);
}
