package com.wirepicksmartpay.repository.userTransactions;

import com.wirepicksmartpay.model.userTransactions.PacraTransactionsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PacraTransactionsRepository extends JpaRepository<PacraTransactionsModel, Integer> {

    @Override
    List<PacraTransactionsModel> findAll();

}