package com.wirepicksmartpay.controller.security;

import com.wirepicksmartpay.helper.enums.ResponseConstants;
import com.wirepicksmartpay.service.security.RegisterUserService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;


@Controller
public class RegisterUserController {

    private Logger logger = Logger.getLogger(RegisterUserController.class);
    private final RegisterUserService registerUserService;

    public RegisterUserController(RegisterUserService registerUserService) {
        this.registerUserService = registerUserService;
    }


    /**
     * Register for new account
     * @param map
     * @param session
     * @return
     */
    @GetMapping(value = "/register")
    public ModelAndView login(ModelMap map, HttpSession session) {


        return new ModelAndView("security/registerUser");
        //return new ModelAndView("registerUser");
    }

    /**
     * Register a user
     * @param request
     * @return
     */
    @PostMapping(value = {"registerUser"})
    @ResponseBody
    protected Map<String, Object> submitServiceRequest(HttpServletRequest request) {

        Map<String, Object> finalResponse = new HashMap<>();

        try {

            finalResponse = registerUserService.registerUser(request);

        } catch (Exception e) {
            logger.error(e.getMessage(), e.getCause());
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "Error!! Failed to authenticate user " + e.getMessage());
            return finalResponse;
        }

        return finalResponse;
    }


    //End of class
}
