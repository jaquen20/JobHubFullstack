package com.sandeep.JobHub.DTOs;

import com.sandeep.JobHub.Model.Users;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ConnectionDTO {
    private String fullName;
    private String about;
    private LocalDate connectionDate;
    private LocalDate dateOfSending;
    private long dates;
    private Users users;

}
