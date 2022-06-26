package com.wirepicksmartpay.controller.darshboard;


import com.wirepicksmartpay.dto.DarshBoardSummaryDto;
import com.wirepicksmartpay.helper.DarshBoardInforHelper;
import com.wirepicksmartpay.helper.UserTransactionsHelper;
import com.wirepicksmartpay.model.accounts.UserAccountModel;
import com.wirepicksmartpay.model.userTransactions.UserTransactionModel;
import com.wirepicksmartpay.repository.userTransactions.NapsaTransactionsRepository;
import com.wirepicksmartpay.repository.userTransactions.PacraTransactionsRepository;
import com.wirepicksmartpay.repository.userTransactions.TaxOnlineTransactionsRepository;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Objects;

@Controller
public class DarshBoardController {

    private Logger logger = Logger.getLogger(DarshBoardController.class);

    private final NapsaTransactionsRepository napsaTransactionsRepository;
    private final PacraTransactionsRepository pacraTransactionsRepository;
    private final TaxOnlineTransactionsRepository taxOnlineTransactionsRepository;
    private final DarshBoardInforHelper darshBoardInforHelper;
    private final UserTransactionsHelper userTransactionsHelper;

    public DarshBoardController(NapsaTransactionsRepository napsaTransactionsRepository,
                                PacraTransactionsRepository pacraTransactionsRepository,
                                TaxOnlineTransactionsRepository taxOnlineTransactionsRepository,
                                DarshBoardInforHelper darshBoardInforHelper,
                                UserTransactionsHelper userTransactionsHelper) {
        this.napsaTransactionsRepository = napsaTransactionsRepository;
        this.pacraTransactionsRepository = pacraTransactionsRepository;
        this.taxOnlineTransactionsRepository = taxOnlineTransactionsRepository;
        this.darshBoardInforHelper = darshBoardInforHelper;
        this.userTransactionsHelper = userTransactionsHelper;
    }

    /**
     * Transactional darshboard
     * @param map
     * @param session
     * @return
     */
    @GetMapping(value = "/darshBoardSummary")
    public ModelAndView getAvailableServices(ModelMap map, HttpSession session) {

        ModelAndView modelAndView = new ModelAndView("darshboard/dashboardChart");

        //Retrieve transactions summuries
        DarshBoardSummaryDto napsaDto = darshBoardInforHelper.getNapsaTransactionsByUser();
        DarshBoardSummaryDto taxonlineDto = darshBoardInforHelper.getTaxOnlineTransactionsByUser();
        DarshBoardSummaryDto pacraDto = darshBoardInforHelper.getPacraTransactionsByUser();
        DarshBoardSummaryDto asycudaDto = darshBoardInforHelper.getAsycudaTransactionsByUser();

        //Account Details
        Double totalDueAccount = napsaDto.getAmountDue() + taxonlineDto.getAmountDue() + pacraDto.getAmountDue() + asycudaDto.getAmountDue();
        Double totalPaidAccount = napsaDto.getAmountDue() + taxonlineDto.getAmountDue() + pacraDto.getAmountDue() + asycudaDto.getAmountDue();
        UserAccountModel accountModel = darshBoardInforHelper.getAccountsOnUser().get(0);

        modelAndView.addObject("napsaDto", napsaDto);
        modelAndView.addObject("taxonlineDto", taxonlineDto);
        modelAndView.addObject("pacraDto", pacraDto);
        modelAndView.addObject("asycudaDto", asycudaDto);
        modelAndView.addObject("totalDueAccount", totalDueAccount);
        modelAndView.addObject("totalPaidAccount", totalPaidAccount);
        modelAndView.addObject("accountModel", accountModel);

        return modelAndView;
    }


    /**
     * Display main darshboard
     * @param map
     * @param session
     * @return
     */
    @GetMapping(value = "/dashboardMain")
    public ModelAndView getDarshMain(ModelMap map, HttpSession session) {

        ModelAndView modelAndView = new ModelAndView("darshboard/dashboardMain");

        List<UserTransactionModel> transactions = userTransactionsHelper.retrieveAllUserTransactions();

        if(Objects.nonNull(transactions)){
            modelAndView.addObject("transactions", transactions);

        }

        return modelAndView;
    }

    //End of class
}
