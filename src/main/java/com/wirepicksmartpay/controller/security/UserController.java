package com.wirepicksmartpay.controller.security;


import com.wirepicksmartpay.helper.securityHelper.SecurityHelper;
import com.wirepicksmartpay.model.accounts.UserAccountModel;
import com.wirepicksmartpay.model.security.SecUserModel;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.List;


/**
 * @Author MututwaM
 */
@Controller
@RequestMapping("/security")
public class UserController {

    private Logger logger = Logger.getLogger(UserController.class);
    private final SecurityHelper securityHelper;

    public UserController(SecurityHelper securityHelper) {
        this.securityHelper = securityHelper;
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


    //End of class
}
