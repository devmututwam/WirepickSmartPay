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
public class CreateUserService {

    private Logger logger = Logger.getLogger(CreateUserService.class);
    private final SecUserRepository secUserRepository;
    private final SecCustomerRepostitory secCustomerRepostitory;
    private final TrippleDes trippleDes;

    public CreateUserService(SecUserRepository secUserRepository,
                             SecCustomerRepostitory secCustomerRepostitory, TrippleDes trippleDes) {
        this.secUserRepository = secUserRepository;
        this.secCustomerRepostitory = secCustomerRepostitory;
        this.trippleDes = trippleDes;
    }


    /**
     * Register new user
     * @param request
     * @return
     */
    public Map<String, Object> createUser(HttpServletRequest request){

        Map<String, Object> finalResponse = new HashMap<>();

        String username = request.getParameter("username");
        String emailAddress = request.getParameter("emailAddress");
        String userType = request.getParameter("userType");
        String role = request.getParameter("role");
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");

        if("".equalsIgnoreCase(username) || username == null){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "Username field cannot be empty. Kindly enter your username");
            return finalResponse;
        }


        if("".equalsIgnoreCase(emailAddress) || emailAddress == null){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "email field cannot be empty. Kindly enter your email");
            return finalResponse;
        }

        if("".equalsIgnoreCase(userType) || userType == null){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "user type field cannot be empty. Kindly select one");
            return finalResponse;
        }

        if("".equalsIgnoreCase(role) || role == null){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "role field cannot be empty. Kindly select one");
            return finalResponse;
        }

        if("".equalsIgnoreCase(firstName) || firstName == null){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "first name field cannot be empty. Kindly enter first name");
            return finalResponse;
        }

        if("".equalsIgnoreCase(lastName) || lastName == null){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "last name field cannot be empty. Kindly enter last name");
            return finalResponse;
        }

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        String password = "wirepick123";

        //Create an encrypted password
        String encryptedpassword = trippleDes.encrypt(password);

        System.out.println("Plain text password = " + password);
        System.out.println("Secure password = " + encryptedpassword);

        //Create the User Object
        SecUserModel userModel = new SecUserModel();

        userModel.setUsername(username);
        userModel.setPassword(encryptedpassword);
        userModel.setEmailAddress(emailAddress);
        userModel.setStatus(Status.ACTIVE.toString());
        userModel.setCreatedDate(timestamp);
        userModel.setModifiedDate(timestamp);
        userModel.setUserType(userType);
        userModel.setRole(role);
        userModel.setFirstName(firstName);
        userModel.setLastName(lastName);

        SecUserModel savedUser = secUserRepository.save(userModel);


        /***Get the application date and time***/
        java.sql.Date edr = new java.sql.Date(System.currentTimeMillis());
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        String effectiveDate = df.format(edr);

        //Do the needfull here
        finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_SUCCESS);
        finalResponse.put(ResponseConstants.MESSAGE, "User created successfully with the following details: ");
        finalResponse.put("username", username);
        finalResponse.put("email", emailAddress);
        finalResponse.put("effectiveDate", effectiveDate);

        return finalResponse;
    }


    //End of class
}
