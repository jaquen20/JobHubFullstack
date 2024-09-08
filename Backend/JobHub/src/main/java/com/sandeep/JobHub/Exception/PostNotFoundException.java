package com.sandeep.JobHub.Exception;

public class PostNotFoundException extends RuntimeException {
    public PostNotFoundException(String postNotFound) {
        super(postNotFound);
    }
}
