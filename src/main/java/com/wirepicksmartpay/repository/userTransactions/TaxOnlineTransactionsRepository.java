package com.wirepicksmartpay.repository.userTransactions;

import com.wirepicksmartpay.model.userTransactions.TaxOnlineTransactionsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaxOnlineTransactionsRepository extends JpaRepository<TaxOnlineTransactionsModel, Integer> {

    @Override
    List<TaxOnlineTransactionsModel> findAll();

}
