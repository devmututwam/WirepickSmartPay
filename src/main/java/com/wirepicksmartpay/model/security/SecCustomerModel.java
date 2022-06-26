package com.wirepicksmartpay.model.security;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "sec_customer", schema = "wirepayDirect", catalog = "")
public class SecCustomerModel {
    private int id;
    private String tpin;
    private String customerName;
    private String systemCode;
    private String idNumber;
    private String idType;
    private String emailAddress;
    private String phone;
    private String address;
    private String status;
    private Integer userId;
    private int createdBy;
    private Timestamp createdDate;
    private int modifiedBy;
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
    @Column(name = "TPIN", nullable = true, length = 15)
    public String getTpin() {
        return tpin;
    }

    public void setTpin(String tpin) {
        this.tpin = tpin;
    }

    @Basic
    @Column(name = "CUSTOMER_NAME", nullable = true, length = 255)
    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
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
    @Column(name = "ID_NUMBER", nullable = true, length = 50)
    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    @Basic
    @Column(name = "ID_TYPE", nullable = true, length = 50)
    public String getIdType() {
        return idType;
    }

    public void setIdType(String idType) {
        this.idType = idType;
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
    @Column(name = "PHONE", nullable = true, length = 250)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Basic
    @Column(name = "ADDRESS", nullable = true, length = 100)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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
    @Column(name = "USER_ID", nullable = true)
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "CREATED_BY", nullable = false)
    public int getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(int createdBy) {
        this.createdBy = createdBy;
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
    @Column(name = "MODIFIED_BY", nullable = false)
    public int getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(int modifiedBy) {
        this.modifiedBy = modifiedBy;
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
        SecCustomerModel that = (SecCustomerModel) o;
        return id == that.id &&
                createdBy == that.createdBy &&
                modifiedBy == that.modifiedBy &&
                Objects.equals(tpin, that.tpin) &&
                Objects.equals(customerName, that.customerName) &&
                Objects.equals(systemCode, that.systemCode) &&
                Objects.equals(idNumber, that.idNumber) &&
                Objects.equals(idType, that.idType) &&
                Objects.equals(emailAddress, that.emailAddress) &&
                Objects.equals(phone, that.phone) &&
                Objects.equals(address, that.address) &&
                Objects.equals(status, that.status) &&
                Objects.equals(userId, that.userId) &&
                Objects.equals(createdDate, that.createdDate) &&
                Objects.equals(modifiedDate, that.modifiedDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, tpin, customerName, systemCode, idNumber, idType, emailAddress, phone, address, status, userId, createdBy, createdDate, modifiedBy, modifiedDate);
    }
}
