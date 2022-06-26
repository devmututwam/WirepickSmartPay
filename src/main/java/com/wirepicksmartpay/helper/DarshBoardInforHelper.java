package com.wirepicksmartpay.helper;

import com.wirepicksmartpay.dto.DarshBoardSummaryDto;
import com.wirepicksmartpay.model.accounts.UserAccountModel;
import com.wirepicksmartpay.model.userTransactions.AsycudaTransactionsModel;
import com.wirepicksmartpay.model.userTransactions.NapsaTransactionsModel;
import com.wirepicksmartpay.model.userTransactions.PacraTransactionsModel;
import com.wirepicksmartpay.model.userTransactions.TaxOnlineTransactionsModel;
import com.wirepicksmartpay.repository.accounts.UserAccountRepository;
import com.wirepicksmartpay.repository.userTransactions.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DarshBoardInforHelper {

    private final NapsaTransactionsRepository napsaTransactionsRepository;
    private final PacraTransactionsRepository pacraTransactionsRepository;
    private final TaxOnlineTransactionsRepository taxOnlineTransactionsRepository;
    private final AsycudaTransactionsRepository asycudaTransactionsRepository;
    private final UserAccountRepository userAccountRepository;
    private final UserTransactionRepository userTransactionRepository;

    public DarshBoardInforHelper(NapsaTransactionsRepository napsaTransactionsRepository,
                                 PacraTransactionsRepository pacraTransactionsRepository,
                                 TaxOnlineTransactionsRepository taxOnlineTransactionsRepository,
                                 AsycudaTransactionsRepository asycudaTransactionsRepository,
                                 UserAccountRepository userAccountRepository,
                                 UserTransactionRepository userTransactionRepository) {
        this.napsaTransactionsRepository = napsaTransactionsRepository;
        this.pacraTransactionsRepository = pacraTransactionsRepository;
        this.taxOnlineTransactionsRepository = taxOnlineTransactionsRepository;
        this.asycudaTransactionsRepository = asycudaTransactionsRepository;
        this.userAccountRepository = userAccountRepository;
        this.userTransactionRepository = userTransactionRepository;
    }

    /**
     * Retrieve available NAPSA transactions by user
     * @return
     */
    public DarshBoardSummaryDto getNapsaTransactionsByUser(){
        List<NapsaTransactionsModel> napsaTransactions = new ArrayList<>();
        DarshBoardSummaryDto darshBoardDto = new DarshBoardSummaryDto();

        Double totalAmountDue = 0.0D;
        Integer totalTransactions = 0;
        try {
            napsaTransactions = napsaTransactionsRepository.findAll();
            if(napsaTransactions.size() > 0){
                totalTransactions = napsaTransactions.size();
                    for(int i =0; i < napsaTransactions.size(); i++){
                        totalAmountDue = Double.sum(totalAmountDue, napsaTransactions.get(i).getAmount());
                    }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        darshBoardDto.setAmountDue(totalAmountDue);
        darshBoardDto.setPendingTransactions(totalTransactions);
        darshBoardDto.setTotalPaid(new Double(14538.2));
        return darshBoardDto;
    }

    /**
     * Retrieve available TaxOnline transactions by user
     * @return
     */
    public DarshBoardSummaryDto getTaxOnlineTransactionsByUser(){
        List<TaxOnlineTransactionsModel> taxOnlineTransactions = new ArrayList<>();
        DarshBoardSummaryDto darshBoardDto = new DarshBoardSummaryDto();

        Double totalAmountDue = 0.0D;
        Integer totalTransactions = 0;
        try {
            taxOnlineTransactions = taxOnlineTransactionsRepository.findAll();
            if(taxOnlineTransactions.size() > 0){
                totalTransactions = taxOnlineTransactions.size();
                for(int i =0; i < taxOnlineTransactions.size(); i++){
                    totalAmountDue = Double.sum(totalAmountDue, taxOnlineTransactions.get(i).getAmount());
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        darshBoardDto.setAmountDue(totalAmountDue);
        darshBoardDto.setPendingTransactions(totalTransactions);
        darshBoardDto.setTotalPaid(new Double(14538.2));
        return darshBoardDto;
    }

    /**
     * Retrieve available PACRA transactions by user
     * @return
     */
    public DarshBoardSummaryDto getPacraTransactionsByUser(){
        List<PacraTransactionsModel> pacraTransactions = new ArrayList<>();
        DarshBoardSummaryDto darshBoardDto = new DarshBoardSummaryDto();

        Double totalAmountDue = 0.0D;
        Integer totalTransactions = 0;
        try {
            pacraTransactions = pacraTransactionsRepository.findAll();
            if(pacraTransactions.size() > 0){
                totalTransactions = pacraTransactions.size();
                for(int i =0; i < pacraTransactions.size(); i++){
                    totalAmountDue = Double.sum(totalAmountDue, pacraTransactions.get(i).getAmount());
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        darshBoardDto.setAmountDue(totalAmountDue);
        darshBoardDto.setPendingTransactions(totalTransactions);
        darshBoardDto.setTotalPaid(new Double(14538.2));
        return darshBoardDto;
    }

    /**
     * Retrieve available ASYCUDA World transactions by user
     * @return
     */
    public DarshBoardSummaryDto getAsycudaTransactionsByUser(){
        List<AsycudaTransactionsModel> asycudaTransactions = new ArrayList<>();
        DarshBoardSummaryDto darshBoardDto = new DarshBoardSummaryDto();

        Double totalAmountDue = 0.0D;
        Integer totalTransactions = 0;
        try {
            asycudaTransactions = asycudaTransactionsRepository.findAll();
            if(asycudaTransactions.size() > 0){
                totalTransactions = asycudaTransactions.size();
                for(int i =0; i < asycudaTransactions.size(); i++){
                    totalAmountDue = Double.sum(totalAmountDue, asycudaTransactions.get(i).getAmount());
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        darshBoardDto.setAmountDue(totalAmountDue);
        darshBoardDto.setPendingTransactions(totalTransactions);
        darshBoardDto.setTotalPaid(new Double(14538.2));
        return darshBoardDto;
    }

    /**
     * Get all the bank accounts on this user
     * @return
     */
    public List<UserAccountModel> getAccountsOnUser(){
        List<UserAccountModel> accounts = new ArrayList<>();
        try {
            accounts = userAccountRepository.findAll();
            return accounts;
        }catch (Exception e){
            e.printStackTrace();
        }
        return accounts;
    }




    //End of class
}
