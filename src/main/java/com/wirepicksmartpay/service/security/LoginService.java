package com.wirepicksmartpay.service.security;

import com.wirepicksmartpay.helper.enums.ResponseConstants;
import com.wirepicksmartpay.model.security.SecCustomerModel;
import com.wirepicksmartpay.model.security.SecUserModel;
import com.wirepicksmartpay.repository.security.SecCustomerRepostitory;
import com.wirepicksmartpay.repository.security.SecUserRepository;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * @Author MuututwaM
 * This class manages the Login sequence for the app
 */
@Service
public class LoginService {

    private Logger logger = Logger.getLogger(LoginService.class);
    private final SecUserRepository secUserRepository;
    private final SecCustomerRepostitory secCustomerRepostitory;

    public LoginService(SecUserRepository secUserRepository,
                        SecCustomerRepostitory secCustomerRepostitory) {
        this.secUserRepository = secUserRepository;
        this.secCustomerRepostitory = secCustomerRepostitory;
    }

    /**
     * Process login request
     * @param request
     * @return
     */
    public Map<String, Object> loginMethod(HttpServletRequest request){

        Map<String, Object> finalResponse = new HashMap<>();

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if("".equalsIgnoreCase(username) || username == null){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "Username field cannot be empty. Kindly enter your username");
            return finalResponse;
        }

        if("".equalsIgnoreCase(password) || password == null){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "Password field cannot be empty. Kindly enter password");
            return finalResponse;
        }

        SecUserModel userModel = secUserRepository.findByUsername(username);

        if(Objects.isNull(userModel)){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "Invalid Username entered");
            return finalResponse;
        }

        //Validate the password
        if(!userModel.getPassword().equalsIgnoreCase(password)){
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "Invalid password entered");
            return finalResponse;
        }

        SecCustomerModel customerModel = secCustomerRepostitory.findByUserId(userModel.getId());

        finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_SUCCESS);
        finalResponse.put(ResponseConstants.MESSAGE, "Login successful ! User: " + customerModel.getCustomerName());

        return finalResponse;
    }

    //End of class
}
