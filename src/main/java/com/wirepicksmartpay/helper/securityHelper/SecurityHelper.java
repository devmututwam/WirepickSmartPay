package com.wirepicksmartpay.helper.securityHelper;


import com.wirepicksmartpay.helper.enums.Status;
import com.wirepicksmartpay.model.accounts.UserAccountModel;
import com.wirepicksmartpay.model.security.SecCustomerModel;
import com.wirepicksmartpay.model.security.SecUserModel;
import com.wirepicksmartpay.repository.security.SecUserRepository;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


/**
 * Helper class to ...
 * @Author MututwaM
 */
@Component
public class SecurityHelper {

    private Logger logger = Logger.getLogger(SecurityHelper.class);
    private final SecUserRepository secUserRepository;

    public SecurityHelper(SecUserRepository secUserRepository) {
        this.secUserRepository = secUserRepository;
    }


    /**
     * get available users
     * @return
     */
    public List<SecUserModel> getUsers(){

        List<SecUserModel> availableUsers = new ArrayList<>();
        try{
            availableUsers = secUserRepository.findAll();
        }catch (Exception e){
            e.printStackTrace();
            logger.error(e.getMessage(), e.getCause());
        }

        return availableUsers;
    }

    /**
     * Activate or Deactivate the selected account
     * @param accountNumber
     * @return
     */
    /*public String activateDeactivateAccount(String accountNumber){

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
    }*/

    /**
     * Get User account by account number
     * @param accountNumber
     * @return
     */
    /*public UserAccountModel getAccountByAccNumber(String accountNumber){

        try{
            UserAccountModel accountModel = userAccountRepository.findByAccountNumber(accountNumber);
            return accountModel;
        }catch (Exception e){
            e.printStackTrace();
            logger.error(e.getMessage(), e.getCause());
        }
        return  new UserAccountModel();
    }*/


    //End of class
}
