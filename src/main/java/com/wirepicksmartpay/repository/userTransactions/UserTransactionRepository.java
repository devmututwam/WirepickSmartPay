package com.wirepicksmartpay.repository.userTransactions;

import com.wirepicksmartpay.model.userTransactions.UserTransactionModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTransactionRepository extends JpaRepository<UserTransactionModel, Integer> {

    @Override
    List<UserTransactionModel> findAll();

}