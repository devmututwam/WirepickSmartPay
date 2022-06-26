package com.wirepicksmartpay.controller.userTransactions;


import com.wirepicksmartpay.helper.ExtractPendingTransactionsHelper;
import com.wirepicksmartpay.helper.UserTransactionsHelper;
import com.wirepicksmartpay.model.userTransactions.UserTransactionModel;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Objects;

@Controller
@RequestMapping("/userTransactions")
public class UserTransactionsController {

    private Logger logger = Logger.getLogger(UserTransactionsController.class);

    private final ExtractPendingTransactionsHelper extractPendingTransactionsHelper;
    private final UserTransactionsHelper userTransactionsHelper;

    public UserTransactionsController(ExtractPendingTransactionsHelper extractPendingTransactionsHelper,
                                      UserTransactionsHelper userTransactionsHelper) {
        this.extractPendingTransactionsHelper = extractPendingTransactionsHelper;
        this.userTransactionsHelper = userTransactionsHelper;
    }


    /*@GetMapping(value = "/availableServices")
    public ModelAndView getAvailableServices(ModelMap map, HttpSession session) {


        return new ModelAndView("userTransactions/getAvailableServices");
    }*/


    /*@PostMapping(value = {"submitServiceRequest"})
    @ResponseBody
    protected Map<String, Object> submitServiceRequest(HttpServletRequest request) {

        Map<String, Object> finalResponse = new HashMap<>();

        try {
            String service = request.getParameter("service");
            //Do the needfull here and check if this user actually has transactions on the selected service
            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_SUCCESS);
            finalResponse.put(ResponseConstants.MESSAGE, "Transactions successfully retrieved ");
            finalResponse.put("service", service);
            return finalResponse;
        } catch (Exception e) {
            logger.error(e.getMessage(), e.getCause());

            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "Error!! Failed to generate workflow task " + e.getMessage());
            return finalResponse;
        }
    }*/


    @GetMapping(value = {"/getUserTransactionsByUser"})
    public ModelAndView showAvailableTransactions() {
        ModelAndView modelAndView = new ModelAndView("userTransactions/availableTransactions");

        List<UserTransactionModel> transactions = userTransactionsHelper.retrieveAllUserTransactions();

        if(Objects.nonNull(transactions)){
            modelAndView.addObject("transactions", transactions);

        }

        return modelAndView;
    }

    //End of class
}
