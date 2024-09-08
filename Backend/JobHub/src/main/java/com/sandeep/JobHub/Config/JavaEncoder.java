package com.sandeep.JobHub.Config;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class JavaEncoder {
    public static  String encode(String query){
        return URLEncoder.encode(query, StandardCharsets.UTF_8);
    }

    public static void main(String[] args) {
        String search= "Spring boot developer";
        System.out.println(encode(search));

    }
}
