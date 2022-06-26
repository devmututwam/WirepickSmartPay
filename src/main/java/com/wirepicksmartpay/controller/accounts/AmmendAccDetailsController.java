package com.wirepicksmartpay.controller.accounts;

import com.wirepicksmartpay.helper.accounts.AccountsHelper;
import com.wirepicksmartpay.helper.enums.ResponseConstants;
import com.wirepicksmartpay.model.accounts.UserAccountModel;
import com.wirepicksmartpay.service.accounts.AmmendUserAccountService;
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
@RequestMapping("/accounts")
public class AmmendAccDetailsController {

    private Logger logger = Logger.getLogger(AmmendAccDetailsController.class);
    private final AccountsHelper accountsHelper;
    private final AmmendUserAccountService ammendUserAccountService;

    public AmmendAccDetailsController(AccountsHelper accountsHelper,
                                      AmmendUserAccountService ammendUserAccountService) {
        this.accountsHelper = accountsHelper;
        this.ammendUserAccountService = ammendUserAccountService;
    }

    /**
     * Controller to view availbale accounts
     * @param map
     * @param session
     * @return
     */
    @GetMapping(value = "/accountAmmendments")
    public ModelAndView viewAccounts(ModelMap map, HttpSession session) {

        ModelAndView mav = new ModelAndView("accounts/accountAmmendments");

        List<UserAccountModel> availableAccounts = accountsHelper.getAccountsByUser("10000000");

        mav.addObject("availableAccounts", availableAccounts);

        return mav;
    }

    /**
     * Get account to ammend details
     * @param accountNumber
     * @return
     */
    @GetMapping(value = {"/ammendAccount"})
    public ModelAndView showExecutedTaskManualInteView(@RequestParam(name = "accountNumber") String accountNumber) {

        ModelAndView mav = new ModelAndView("accounts/ammendAccount");

        UserAccountModel account = accountsHelper.getAccountByAccNumber(accountNumber);

        mav.addObject("account", account);

        return mav;
    }

    @PostMapping(value = {"submitAmmendedAccDetails"})
    @ResponseBody
    protected Map<String, Object> submitServiceRequest(HttpServletRequest request) {

        Map<String, Object> finalResponse = new HashMap<>();

        try {
            return ammendUserAccountService.saveUserAccDetails(request);
        } catch (Exception e) {
            logger.error(e.getMessage(), e.getCause());
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "Error!! Failed to amend account details " + e.getMessage());
            return finalResponse;
        }
    }

    //End of class
}
