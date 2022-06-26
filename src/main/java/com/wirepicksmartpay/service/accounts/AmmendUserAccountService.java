package com.wirepicksmartpay.service.accounts;


import com.wirepicksmartpay.helper.enums.ResponseConstants;
import com.wirepicksmartpay.helper.enums.Status;
import com.wirepicksmartpay.model.accounts.UserAccountModel;
import com.wirepicksmartpay.repository.accounts.UserAccountRepository;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;


/**
 * @Author MututwaM
 * This class manages the ammendment of user account details
 */
@Service
public class AmmendUserAccountService {

    private Logger logger = Logger.getLogger(AmmendUserAccountService.class);
    private final UserAccountRepository userAccountRepository;

    public AmmendUserAccountService(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }


    /**
     * Save the user account details
     * @param request
     * @return
     */
    public Map<String, Object> saveUserAccDetails(HttpServletRequest request){

        Map<String, Object> finalResponse = new HashMap<>();

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        String accountName = request.getParameter("accountName");
        String bankName = request.getParameter("bankName");
        String branchName = request.getParameter("branchName");
        String branchCode = request.getParameter("branchCode");
        String accountNumber = request.getParameter("accountNumber");
        String tpin = request.getParameter("tpin");

        if("".equalsIgnoreCase(tpin) || tpin == null){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "TPIN field cannot be empty");
            return finalResponse;
        }

        if(tpin.length() != 10){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "TPIN number must be 10 digits only");
            return finalResponse;
        }

        UserAccountModel userAccount = userAccountRepository.findByAccountNumber(accountNumber);

        userAccount.setAccountName(accountName);
        userAccount.setBankName(bankName);
        userAccount.setBranchName(branchName);
        userAccount.setBranchCode(branchCode);
        userAccount.setAccountNumber(accountNumber);
        userAccount.setIdNumber(tpin);
        userAccount.setModifiedDate(timestamp);
        userAccount.setStatus(Status.INACTIVE.toString());
        userAccount.setModifiedBy(54);

        userAccountRepository.save(userAccount);

        /***Get the application date and time***/
        java.sql.Date edr = new java.sql.Date(System.currentTimeMillis());
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        String effectiveDate = df.format(edr);

        //Do the needfull here
        finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_SUCCESS);
        finalResponse.put(ResponseConstants.MESSAGE, "Account details amended successfully");
        finalResponse.put("effectiveDate", effectiveDate);

        return finalResponse;
    }


    //End of class
}
