package com.wirepicksmartpay.dto;

public class RegisterRequestDto {

    private String fullname;
    private String username;
    private String email;
    private String app_code;
    private String user_password;
    //wirepick pay params
    private String merchant_id;
    private String app_id;
    //end wirepick pay params
    private String actioned_by;

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getApp_code() {
        return app_code;
    }

    public void setApp_code(String app_code) {
        this.app_code = app_code;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }

    public String getMerchant_id() {
        return merchant_id;
    }

    public void setMerchant_id(String merchant_id) {
        this.merchant_id = merchant_id;
    }

    public String getApp_id() {
        return app_id;
    }

    public void setApp_id(String app_id) {
        this.app_id = app_id;
    }

    public String getActioned_by() {
        return actioned_by;
    }

    public void setActioned_by(String actioned_by) {
        this.actioned_by = actioned_by;
    }
}
