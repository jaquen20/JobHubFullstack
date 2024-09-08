package com.sandeep.JobHub.Repository;

import com.sandeep.JobHub.Model.JobAPI;
import lombok.Data;

import java.util.List;
@Data
public class AdzunaResponse {
    private Long mean;
    private List<JobAPI> results;


}
