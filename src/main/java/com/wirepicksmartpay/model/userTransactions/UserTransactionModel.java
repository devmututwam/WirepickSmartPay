package com.wirepicksmartpay.model.userTransactions;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;

@Table(name = "user_transactions")
@Entity
public class UserTransactionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Column(name = "ID_NUMBER", nullable = false, length = 20)
    private String idNumber;

    @Column(name = "NAME", length = 250)
    private String name;

    @Column(name = "SERVICE_CODE", length = 50)
    private String serviceCode;

    @Column(name = "PRN_NUMBER", length = 50)
    private String prnNumber;

    @Column(name = "PRN_AMOUNT")
    private Double prnAmount;

    @Column(name = "STATUS", length = 100)
    private String status;

    @Column(name = "CREATED_BY", nullable = false)
    private Integer createdBy;

    @Column(name = "CREATED_DATE", nullable = false)
    private Timestamp createdDate;

    @Column(name = "MODIFIED_BY", nullable = false)
    private Integer modifiedBy;

    @Column(name = "MODIFIED_DATE")
    private Instant modifiedDate;

    public Instant getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Instant modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public Integer getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(Integer modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getPrnAmount() {
        return prnAmount;
    }

    public void setPrnAmount(Double prnAmount) {
        this.prnAmount = prnAmount;
    }

    public String getPrnNumber() {
        return prnNumber;
    }

    public void setPrnNumber(String prnNumber) {
        this.prnNumber = prnNumber;
    }

    public String getServiceCode() {
        return serviceCode;
    }

    public void setServiceCode(String serviceCode) {
        this.serviceCode = serviceCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}