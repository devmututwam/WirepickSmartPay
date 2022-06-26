package com.wirepicksmartpay.controller.enrollService;


import org.apache.log4j.Logger;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;


/**
 * This controller manages the enrollment to various available services by users
 * @Author MututwaM
 */
@Controller
public class EnrollServiceController {

    private Logger logger = Logger.getLogger(EnrollServiceController.class);
    private final Environment env;

    public EnrollServiceController(Environment env) {
        this.env = env;
    }


    //End of class
}
