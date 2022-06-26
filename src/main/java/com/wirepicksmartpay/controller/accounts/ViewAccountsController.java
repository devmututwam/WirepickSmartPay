package com.wirepicksmartpay.controller.accounts;


import com.wirepicksmartpay.helper.accounts.AccountsHelper;
import com.wirepicksmartpay.model.accounts.UserAccountModel;
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
@RequestMapping("/accounts")
public class ViewAccountsController {

    private Logger logger = Logger.getLogger(ViewAccountsController.class);
    private final AccountsHelper accountsHelper;

    public ViewAccountsController(AccountsHelper accountsHelper) {
        this.accountsHelper = accountsHelper;
    }


    /**
     * Controller to view availbale accounts
     * @param map
     * @param session
     * @return
     */
    @GetMapping(value = "/viewAccounts")
    public ModelAndView viewAccounts(ModelMap map, HttpSession session) {

        ModelAndView mav = new ModelAndView("accounts/viewAccounts");

        List<UserAccountModel> availableAccounts = accountsHelper.getAccountsByUser("10000000");

        mav.addObject("availableAccounts", availableAccounts);

        return mav;
    }


    @GetMapping(value = {"/actDeactAccount"})
    public ModelAndView showExecutedTaskManualInteView(@RequestParam(name = "accountNumber") String accountNumber) {

        ModelAndView mav = new ModelAndView("accounts/viewAccounts");

        String activateDeactivate = accountsHelper.activateDeactivateAccount(accountNumber);

        List<UserAccountModel> availableAccounts = accountsHelper.getAccountsByUser("10000000");

        mav.addObject("availableAccounts", availableAccounts);

        return mav;
    }


    //End of class
}
