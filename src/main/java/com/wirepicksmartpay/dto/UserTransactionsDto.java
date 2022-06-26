package com.wirepicksmartpay.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserTransactionsDto {

    private Integer id;
    private Integer tpin;
    private Integer ssn;
    private String name;
    private String id_number;
    private String businessName;
    private String prnNumber;
    private LocalDate prnDate;
    private LocalDate prnExpiryDate;
    private Double amount;
    private String status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTpin() {
        return tpin;
    }

    public void setTpin(Integer tpin) {
        this.tpin = tpin;
    }

    public Integer getSsn() {
        return ssn;
    }

    public void setSsn(Integer ssn) {
        this.ssn = ssn;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId_number() {
        return id_number;
    }

    public void setId_number(String id_number) {
        this.id_number = id_number;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getPrnNumber() {
        return prnNumber;
    }

    public void setPrnNumber(String prnNumber) {
        this.prnNumber = prnNumber;
    }

    public LocalDate getPrnDate() {
        return prnDate;
    }

    public void setPrnDate(LocalDate prnDate) {
        this.prnDate = prnDate;
    }

    public LocalDate getPrnExpiryDate() {
        return prnExpiryDate;
    }

    public void setPrnExpiryDate(LocalDate prnExpiryDate) {
        this.prnExpiryDate = prnExpiryDate;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
