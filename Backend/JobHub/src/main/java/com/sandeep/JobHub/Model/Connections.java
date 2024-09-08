package com.sandeep.JobHub.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data @Entity
public class Connections {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Users sender;
    @ManyToOne
    private Users receiver;
    private boolean isAccepted;

    public boolean getAccepted() {
        return isAccepted;
    }

    public void setAccepted(boolean accepted) {
        isAccepted = accepted;
    }

    private LocalDate dateOfConnection;
    private LocalDate dateOfSending;

}
