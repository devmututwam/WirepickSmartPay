package com.wirepicksmartpay.model.security;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "sec_user", schema = "wirepayDirect", catalog = "")
public class SecUserModel {
    private int id;
    private String username;
    private String systemCode;
    private String emailAddress;
    private String password;
    private String phone;
    private String status;
    private Timestamp createdDate;
    private Timestamp modifiedDate;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "USERNAME", nullable = true, length = 250)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "SYSTEM_CODE", nullable = true, length = 15)
    public String getSystemCode() {
        return systemCode;
    }

    public void setSystemCode(String systemCode) {
        this.systemCode = systemCode;
    }

    @Basic
    @Column(name = "EMAIL_ADDRESS", nullable = true, length = 250)
    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    @Basic
    @Column(name = "PASSWORD", nullable = true, length = 250)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "PHONE", nullable = true, length = 250)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Basic
    @Column(name = "STATUS", nullable = true, length = 20)
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Basic
    @Column(name = "CREATED_DATE", nullable = false)
    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }

    @Basic
    @Column(name = "MODIFIED_DATE", nullable = true)
    public Timestamp getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Timestamp modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SecUserModel that = (SecUserModel) o;
        return id == that.id &&
                Objects.equals(username, that.username) &&
                Objects.equals(systemCode, that.systemCode) &&
                Objects.equals(emailAddress, that.emailAddress) &&
                Objects.equals(password, that.password) &&
                Objects.equals(phone, that.phone) &&
                Objects.equals(status, that.status) &&
                Objects.equals(createdDate, that.createdDate) &&
                Objects.equals(modifiedDate, that.modifiedDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, systemCode, emailAddress, password, phone, status, createdDate, modifiedDate);
    }
}
