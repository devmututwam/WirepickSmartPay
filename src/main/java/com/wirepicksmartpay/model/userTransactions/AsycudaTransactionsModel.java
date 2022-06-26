package com.wirepicksmartpay.model.userTransactions;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "asycuda_transactions" , schema = "wirepayDirect", catalog = "")
public class AsycudaTransactionsModel implements Serializable {

    private Integer id;
    private Integer tpin;
    private String taxpayerName;
    private String prnNumber;
    private LocalDate prnDate;
    private LocalDate prnExpiryDate;
    private Double amount;
    private String status;
    private Integer createdBy;
    private Timestamp createdDate;
    private Integer modifiedBy;
    private Timestamp modifiedDate;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false, precision = 0)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "TPIN", nullable = true)
    public Integer getTpin() {
        return tpin;
    }

    public void setTpin(Integer tpin) {
        this.tpin = tpin;
    }

    @Basic
    @Column(name = "TAXPAYER_NAME", nullable = true)
    public String getTaxpayerName() {
        return taxpayerName;
    }

    public void setTaxpayerName(String taxpayerName) {
        this.taxpayerName = taxpayerName;
    }

    @Basic
    @Column(name = "PRN_NUMBER", nullable = true)
    public String getPrnNumber() {
        return prnNumber;
    }

    public void setPrnNumber(String prnNumber) {
        this.prnNumber = prnNumber;
    }

    @Basic
    @Column(name = "PRN_DATE", nullable = true)
    public LocalDate getPrnDate() {
        return prnDate;
    }

    public void setPrnDate(LocalDate prnDate) {
        this.prnDate = prnDate;
    }

    @Basic
    @Column(name = "PRN_EXPIRYDATE", nullable = true)
    public LocalDate getPrnExpiryDate() {
        return prnExpiryDate;
    }

    public void setPrnExpiryDate(LocalDate prnExpiryDate) {
        this.prnExpiryDate = prnExpiryDate;
    }

    @Basic
    @Column(name = "AMOUNT", nullable = true)
    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    @Basic
    @Column(name = "STATUS", nullable = true)
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Basic
    @Column(name = "CREATED_BY", nullable = true)
    public Integer getCreatedBy() {return createdBy;}

    public void setCreatedBy(Integer createdBy) {this.createdBy = createdBy;}

    @Basic
    @Column(name = "CREATED_DATE", nullable = true)
    public Timestamp getCreatedDate() {return createdDate;}

    public void setCreatedDate(Timestamp createdDate) {this.createdDate = createdDate;}

    @Basic
    @Column(name = "MODIFIED_BY", nullable = true)
    public Integer getModifiedBy() {return modifiedBy;}

    public void setModifiedBy(Integer modifiedBy) {this.modifiedBy = modifiedBy;}

    @Basic
    @Column(name = "MODIFIED_DATE", nullable = true)
    public Timestamp getModifiedDate() {return modifiedDate;}

    public void setModifiedDate(Timestamp modifiedDate) {this.modifiedDate = modifiedDate;}
}
