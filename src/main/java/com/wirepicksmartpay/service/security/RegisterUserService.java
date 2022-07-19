package com.wirepicksmartpay.service.security;


import com.wirepicksmartpay.helper.enums.ResponseConstants;
import com.wirepicksmartpay.helper.enums.Status;
import com.wirepicksmartpay.model.security.SecUserModel;
import com.wirepicksmartpay.repository.security.SecCustomerRepostitory;
import com.wirepicksmartpay.repository.security.SecUserRepository;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

/**
 * This class manages the registration of new users on the system
 * @Author MututwaM
 */
@Service
public class RegisterUserService {

    private Logger logger = Logger.getLogger(RegisterUserService.class);
    private final SecUserRepository secUserRepository;
    private final SecCustomerRepostitory secCustomerRepostitory;
    private final PassBasedEnc passBasedEnc;
    private final TrippleDes trippleDes;

    public RegisterUserService(SecUserRepository secUserRepository,
                               SecCustomerRepostitory secCustomerRepostitory, PassBasedEnc passBasedEnc, TrippleDes trippleDes) {
        this.secUserRepository = secUserRepository;
        this.secCustomerRepostitory = secCustomerRepostitory;
        this.passBasedEnc = passBasedEnc;
        this.trippleDes = trippleDes;
    }


    /**
     * Register new user
     * @param request
     * @return
     */
    public Map<String, Object> registerUser(HttpServletRequest request){

        Map<String, Object> finalResponse = new HashMap<>();

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String email = request.getParameter("email");
        String userType = request.getParameter("userType");

        if("".equalsIgnoreCase(username) || username == null){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "Username field cannot be empty. Kindly enter your username");
            return finalResponse;
        }

        if("".equalsIgnoreCase(password) || password == null){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "password field cannot be empty. Kindly enter your password");
            return finalResponse;
        }

        if("".equalsIgnoreCase(email) || email == null){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "email field cannot be empty. Kindly enter your email");
            return finalResponse;
        }

        if("".equalsIgnoreCase(userType) || userType == null){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "user type field cannot be empty. Kindly select one");
            return finalResponse;
        }

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        //Create an encrypted password
        String encryptedpassword = trippleDes.encrypt(password);

        System.out.println("Plain text password = " + password);
        System.out.println("Secure password = " + encryptedpassword);

        //Create the User Object
        SecUserModel userModel = new SecUserModel();

        userModel.setUsername(username);
        userModel.setPassword(encryptedpassword);
        userModel.setEmailAddress(email);
        userModel.setStatus(Status.ACTIVE.toString());
        userModel.setCreatedDate(timestamp);
        userModel.setModifiedDate(timestamp);
        userModel.setUserType(userType);

        SecUserModel savedUser = secUserRepository.save(userModel);

        //Create the template customer object here
        /*SecCustomerModel customerModel = new SecCustomerModel();

        customerModel.setUserId(savedUser.getId());
        customerModel.setCreatedBy(54);
        customerModel.setCreatedDate(timestamp);
        customerModel.setModifiedDate(timestamp);
        customerModel.setStatus(Status.ACTIVE.toString());

        secCustomerRepostitory.save(customerModel);*/


        /***Get the application date and time***/
        java.sql.Date edr = new java.sql.Date(System.currentTimeMillis());
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        String effectiveDate = df.format(edr);

        //Do the needfull here
        finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_SUCCESS);
        finalResponse.put(ResponseConstants.MESSAGE, "User created successfully with the following details: ");
        finalResponse.put("username", username);
        finalResponse.put("email", email);
        finalResponse.put("effectiveDate", effectiveDate);

        return finalResponse;
    }


    //End of class
}
