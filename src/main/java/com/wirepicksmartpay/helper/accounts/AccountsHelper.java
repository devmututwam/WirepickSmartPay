package com.wirepicksmartpay.helper.accounts;


import com.wirepicksmartpay.helper.enums.Status;
import com.wirepicksmartpay.model.accounts.UserAccountModel;
import com.wirepicksmartpay.repository.accounts.UserAccountRepository;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


/**
 * Helper class to extract all available accounts
 * @Author MututwaM
 */
@Component
public class AccountsHelper {

    private Logger logger = Logger.getLogger(AccountsHelper.class);
    private final UserAccountRepository userAccountRepository;

    public AccountsHelper(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    /**
     * get available transactions by user
     * @param tpin
     * @return
     */
    public List<UserAccountModel> getAccountsByUser(String tpin){

        List<UserAccountModel> availableAccounts = new ArrayList<>();
        try{
            //availableAccounts = userAccountRepository.findAllByidNumber(tpin);
            availableAccounts = userAccountRepository.findAll();
        }catch (Exception e){
            e.printStackTrace();
            logger.error(e.getMessage(), e.getCause());
        }

        return availableAccounts;
    }

    /**
     * Activate or Deactivate the selected account
     * @param accountNumber
     * @return
     */
    public String activateDeactivateAccount(String accountNumber){

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        UserAccountModel accountModel = this.getAccountByAccNumber(accountNumber);

        if(Objects.nonNull(accountModel)){
            if(accountModel.getStatus().equalsIgnoreCase(Status.ACTIVE.toString())){
                accountModel.setStatus(Status.INACTIVE.toString());
            }else if(accountModel.getStatus().equalsIgnoreCase(Status.INACTIVE.toString())){
                accountModel.setStatus(Status.ACTIVE.toString());
            }
            accountModel.setModifiedBy(54);
            accountModel.setModifiedDate(timestamp);
            userAccountRepository.save(accountModel);
        }

        return accountModel.getStatus();
    }

    /**
     * Get User account by account number
     * @param accountNumber
     * @return
     */
    public UserAccountModel getAccountByAccNumber(String accountNumber){

        try{
            UserAccountModel accountModel = userAccountRepository.findByAccountNumber(accountNumber);
            return accountModel;
        }catch (Exception e){
            e.printStackTrace();
            logger.error(e.getMessage(), e.getCause());
        }
        return  new UserAccountModel();
    }


    //End of class
}
