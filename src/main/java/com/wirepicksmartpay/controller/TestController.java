package com.wirepicksmartpay.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;


/**
 * Test controller
 * @Author MututwaM
 */
@Controller
public class TestController {


    @GetMapping(value = "/")
    public ModelAndView showLandingPage(ModelMap map) {


        //return new ModelAndView("landing");
        return new ModelAndView("index");
    }


    //End of class
}
