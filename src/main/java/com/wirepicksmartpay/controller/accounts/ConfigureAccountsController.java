package com.wirepicksmartpay.controller.accounts;

import com.wirepicksmartpay.helper.enums.ResponseConstants;
import com.wirepicksmartpay.service.accounts.UserAccountService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;


/**
 * @Author MututwaM
 */
@Controller
@RequestMapping("/accounts")
public class ConfigureAccountsController {

    private Logger logger = Logger.getLogger(ConfigureAccountsController.class);
    private final UserAccountService userAccountService;

    public ConfigureAccountsController(UserAccountService userAccountService) {
        this.userAccountService = userAccountService;
    }


    /**
     * Configure accounts view
     * @param map
     * @param session
     * @return
     */
    @GetMapping(value = "/configureAccounts")
    public ModelAndView configureAccount(ModelMap map, HttpSession session) {

        return new ModelAndView("accounts/configureAccounts");
    }

    /**
     * Saving Controller
     * @param request
     * @return
     */
    @PostMapping(value = {"submitAccDetails"})
    @ResponseBody
    protected Map<String, Object> submitServiceRequest(HttpServletRequest request) {

        Map<String, Object> finalResponse = new HashMap<>();

        try {
            return userAccountService.saveUserAccDetails(request);
        } catch (Exception e) {
            logger.error(e.getMessage(), e.getCause());
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "Error!! Failed to save account details " + e.getMessage());
            return finalResponse;
        }
    }


    //End of class
}
