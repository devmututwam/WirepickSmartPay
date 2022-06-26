package com.wirepicksmartpay.repository.security;


import com.wirepicksmartpay.model.security.SecCustomerModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SecCustomerRepostitory extends JpaRepository<SecCustomerModel, Integer> {

    @Override
    List<SecCustomerModel> findAll();

    SecCustomerModel findById(int id);

    SecCustomerModel findByUserId(Integer userId);

}
