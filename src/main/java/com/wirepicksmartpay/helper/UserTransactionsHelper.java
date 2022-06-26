package com.wirepicksmartpay.helper;


import com.wirepicksmartpay.model.userTransactions.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserTransactionsHelper {

    private final ExtractPendingTransactionsHelper extractPendingTransactionsHelper;

    public UserTransactionsHelper(ExtractPendingTransactionsHelper extractPendingTransactionsHelper) {
        this.extractPendingTransactionsHelper = extractPendingTransactionsHelper;
    }


    /**
     * Get All user transactions information
     * @return
     */
    public List<UserTransactionModel> retrieveAllUserTransactions(){

        List<UserTransactionModel> userTransactionModelList = new ArrayList<>();

        List<NapsaTransactionsModel> napsaTs = extractPendingTransactionsHelper.getNapsaTransactionsByUser();
        List<TaxOnlineTransactionsModel> taxOnlineTs = extractPendingTransactionsHelper.getTaxOnlineTransactionsByUser();
        List<PacraTransactionsModel> pacraTs = extractPendingTransactionsHelper.getPacraTransactionsByUser();
        List<AsycudaTransactionsModel> asycudaTs = extractPendingTransactionsHelper.getAsycudaTransactionsByUser();

        //Get NAPSA information
        napsaTs.forEach(napsaObject -> {
            UserTransactionModel napsaUserInfor = new UserTransactionModel();
            napsaUserInfor.setIdNumber(String.valueOf(napsaObject.getSsn()));
            napsaUserInfor.setName(napsaObject.getName());
            napsaUserInfor.setPrnNumber(napsaObject.getPrnNumber());
            napsaUserInfor.setPrnAmount(napsaObject.getAmount());
            napsaUserInfor.setStatus(napsaObject.getStatus());
            napsaUserInfor.setServiceCode("NAPSA");

            //add to the final list
            userTransactionModelList.add(napsaUserInfor);
        });

        //Get TaxOnline Information
        taxOnlineTs.forEach(taxOnlineObject -> {
            UserTransactionModel taxOnlineUserInfor = new UserTransactionModel();
            taxOnlineUserInfor.setIdNumber(String.valueOf(taxOnlineObject.getTpin()));
            taxOnlineUserInfor.setName(taxOnlineObject.getTaxpayerName());
            taxOnlineUserInfor.setPrnNumber(taxOnlineObject.getPrnNumber());
            taxOnlineUserInfor.setPrnAmount(taxOnlineObject.getAmount());
            taxOnlineUserInfor.setStatus(taxOnlineObject.getStatus());
            taxOnlineUserInfor.setServiceCode("TaxOnline");

            //add to the final list
            userTransactionModelList.add(taxOnlineUserInfor);
        });

        //Get PACRA Information
        pacraTs.forEach(pacraObject -> {
            UserTransactionModel pacraUserInfor = new UserTransactionModel();
            pacraUserInfor.setIdNumber(pacraObject.getId_number());
            pacraUserInfor.setName(pacraObject.getName());
            pacraUserInfor.setPrnNumber(pacraObject.getPrnNumber());
            pacraUserInfor.setPrnAmount(pacraObject.getAmount());
            pacraUserInfor.setStatus(pacraObject.getStatus());
            pacraUserInfor.setServiceCode("PACRA");

            //add to the final list
            userTransactionModelList.add(pacraUserInfor);
        });

        //Get ASYCUDA World Information
        asycudaTs.forEach(asycudaObject -> {
            UserTransactionModel asycudaUserInfor = new UserTransactionModel();
            asycudaUserInfor.setIdNumber(String.valueOf(asycudaObject.getTpin()));
            asycudaUserInfor.setName(asycudaObject.getTaxpayerName());
            asycudaUserInfor.setPrnNumber(asycudaObject.getPrnNumber());
            asycudaUserInfor.setPrnAmount(asycudaObject.getAmount());
            asycudaUserInfor.setStatus(asycudaObject.getStatus());
            asycudaUserInfor.setServiceCode("ASYCUDA");

            //add to the final list
            userTransactionModelList.add(asycudaUserInfor);
        });


        return userTransactionModelList;
    }


    //End of class
}
