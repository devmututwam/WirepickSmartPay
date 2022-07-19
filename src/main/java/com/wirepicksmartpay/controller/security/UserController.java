package com.wirepicksmartpay.controller.security;


import com.wirepicksmartpay.helper.enums.ResponseConstants;
import com.wirepicksmartpay.helper.securityHelper.SecurityHelper;
import com.wirepicksmartpay.model.security.SecUserModel;
import com.wirepicksmartpay.service.security.CreateUserService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * @Author MututwaM
 */
@Controller
@RequestMapping("/security")
public class UserController {

    private Logger logger = Logger.getLogger(UserController.class);
    private final SecurityHelper securityHelper;
    private final CreateUserService createUserService;

    public UserController(SecurityHelper securityHelper, CreateUserService createUserService) {
        this.securityHelper = securityHelper;
        this.createUserService = createUserService;
    }


    /**
     * Controller to view availbale accounts
     * @param map
     * @param session
     * @return
     */
    @GetMapping(value = "/users")
    public ModelAndView viewAccounts(ModelMap map, HttpSession session) {

        ModelAndView mav = new ModelAndView("security/viewUsers");

        List<SecUserModel> availableUsers = securityHelper.getUsers();

        mav.addObject("availableUsers", availableUsers);

        return mav;
    }


    @GetMapping(value = "/createUsers")
    public ModelAndView createUser(ModelMap map, HttpSession session) {

        ModelAndView mav = new ModelAndView("security/createUser");

        return mav;
    }

    @PostMapping(value = {"configureUser"})
    @ResponseBody
    protected Map<String, Object> submitServiceRequest(HttpServletRequest request) {

        Map<String, Object> finalResponse = new HashMap<>();

        try {

            finalResponse = createUserService.createUser(request);

        } catch (Exception e) {
            logger.error(e.getMessage(), e.getCause());
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "Error!! Failed to create user " + e.getMessage());
            return finalResponse;
        }

        return finalResponse;
    }


    //End of class
}
