package com.wirepicksmartpay.model.accounts;

import javax.persistence.*;
import java.sql.Timestamp;

@Table(name = "user_account", indexes = {
        @Index(name = "ACCOUNT_NUMBER", columnList = "ACCOUNT_NUMBER", unique = true)
})
@Entity
public class UserAccountModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Column(name = "ID_NUMBER", nullable = false, length = 20)
    private String idNumber;

    @Column(name = "ACCOUNT_NAME", length = 250)
    private String accountName;

    @Column(name = "ACCOUNT_NUMBER")
    private String accountNumber;

    @Column(name = "ACCOUNT_BALANCE")
    private Double accountBalance;

    @Column(name = "BANK_NAME", nullable = false, length = 200)
    private String bankName;

    @Column(name = "BRANCH_NAME", nullable = false, length = 100)
    private String branchName;

    @Column(name = "STATUS", length = 100)
    private String status;

    @Column(name = "BRANCH_CODE", length = 50)
    private String branchCode;

    @Column(name = "CREATED_BY", nullable = false)
    private Integer createdBy;

    @Column(name = "CREATED_DATE", nullable = false)
    private Timestamp createdDate;

    @Column(name = "MODIFIED_BY", nullable = false)
    private Integer modifiedBy;

    @Column(name = "MODIFIED_DATE")
    private Timestamp modifiedDate;

    public Timestamp getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Timestamp modifiedDate) {
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

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public Double getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(Double accountBalance) {
        this.accountBalance = accountBalance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
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

    public String getBranchCode() {return branchCode;}

    public void setBranchCode(String branchCode) {this.branchCode = branchCode;}
}