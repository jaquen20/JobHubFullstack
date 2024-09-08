package com.sandeep.JobHub.Model;

import lombok.Data;

@Data
public class JobAPI {
    private String id;
    private String title;
    private String description;
    private Company company;
    private Location location;
    private String contract_time;
    private String created;
    private String contract_type;
    private String redirect_url;

    private static  class  Company{
        public String getDisplay_name() {
            return display_name;
        }

        public void setDisplay_name(String display_name) {
            this.display_name = display_name;
        }

        String display_name;

    }

    public static class Location{
        private String display_name;

        public String getDisplay_name() {
            return display_name;
        }

        public void setDisplay_name(String display_name) {
            this.display_name = display_name;
        }
    }
}
