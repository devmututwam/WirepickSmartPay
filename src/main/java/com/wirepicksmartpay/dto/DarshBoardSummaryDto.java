package com.wirepicksmartpay.dto;


import lombok.Data;

@Data
public class DarshBoardSummaryDto {

    private Integer pendingTransactions;
    private Double amountDue;
    private Double totalPaid;

    public Integer getPendingTransactions() {
        return pendingTransactions;
    }

    public void setPendingTransactions(Integer pendingTransactions) {
        this.pendingTransactions = pendingTransactions;
    }

    public Double getAmountDue() {
        return amountDue;
    }

    public void setAmountDue(Double amountDue) {
        this.amountDue = amountDue;
    }

    public Double getTotalPaid() {
        return totalPaid;
    }

    public void setTotalPaid(Double totalPaid) {
        this.totalPaid = totalPaid;
    }
}
