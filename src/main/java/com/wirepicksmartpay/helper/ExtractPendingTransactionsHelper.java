package com.wirepicksmartpay.helper;

import com.wirepicksmartpay.model.userTransactions.AsycudaTransactionsModel;
import com.wirepicksmartpay.model.userTransactions.NapsaTransactionsModel;
import com.wirepicksmartpay.model.userTransactions.PacraTransactionsModel;
import com.wirepicksmartpay.model.userTransactions.TaxOnlineTransactionsModel;
import com.wirepicksmartpay.repository.userTransactions.AsycudaTransactionsRepository;
import com.wirepicksmartpay.repository.userTransactions.NapsaTransactionsRepository;
import com.wirepicksmartpay.repository.userTransactions.PacraTransactionsRepository;
import com.wirepicksmartpay.repository.userTransactions.TaxOnlineTransactionsRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ExtractPendingTransactionsHelper {


    private final NapsaTransactionsRepository napsaTransactionsRepository;
    private final PacraTransactionsRepository pacraTransactionsRepository;
    private final TaxOnlineTransactionsRepository taxOnlineTransactionsRepository;
    private final AsycudaTransactionsRepository asycudaTransactionsRepository;

    public ExtractPendingTransactionsHelper(NapsaTransactionsRepository napsaTransactionsRepository,
                                            PacraTransactionsRepository pacraTransactionsRepository,
                                            TaxOnlineTransactionsRepository taxOnlineTransactionsRepository,
                                            AsycudaTransactionsRepository asycudaTransactionsRepository) {
        this.napsaTransactionsRepository = napsaTransactionsRepository;
        this.pacraTransactionsRepository = pacraTransactionsRepository;
        this.taxOnlineTransactionsRepository = taxOnlineTransactionsRepository;
        this.asycudaTransactionsRepository = asycudaTransactionsRepository;
    }

    /**
     * Retrieve available NAPSA transactions by user
     * @return list of available napsa transactions
     */
    public List<NapsaTransactionsModel> getNapsaTransactionsByUser(){
        List<NapsaTransactionsModel> napsaTransactions = new ArrayList<>();
        try {
            napsaTransactions = napsaTransactionsRepository.findAll();
        }catch (Exception e){
            e.printStackTrace();
        }
        return napsaTransactions;
    }

    /**
     * Retrieve available TaxOnline transactions by user
     * @return list of available TaxOnline transactions
     */
    public List<TaxOnlineTransactionsModel> getTaxOnlineTransactionsByUser(){
        List<TaxOnlineTransactionsModel> taxOnlineTransactions = new ArrayList<>();
        try {
            taxOnlineTransactions = taxOnlineTransactionsRepository.findAll();
        }catch (Exception e){
            e.printStackTrace();
        }
        return taxOnlineTransactions;
    }

    /**
     * Retrieve available PACRA transactions by user
     * @return list of available PACRA transactions
     */
    public List<PacraTransactionsModel> getPacraTransactionsByUser(){
        List<PacraTransactionsModel> pacraTransactions = new ArrayList<>();
        try {
            pacraTransactions = pacraTransactionsRepository.findAll();
        }catch (Exception e){
            e.printStackTrace();
        }
        return pacraTransactions;
    }

    /**
     * Retrieve available ASYCUDA World transactions by user
     * @return list of available ASYCUDA World transactions
     */
    public List<AsycudaTransactionsModel> getAsycudaTransactionsByUser(){
        List<AsycudaTransactionsModel> asycudaTransactions = new ArrayList<>();
        try {
            asycudaTransactions = asycudaTransactionsRepository.findAll();
        }catch (Exception e){
            e.printStackTrace();
        }
        return asycudaTransactions;
    }




    //End of class
}
