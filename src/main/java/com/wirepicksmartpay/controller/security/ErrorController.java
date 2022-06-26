package com.wirepicksmartpay.controller.security;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpSession;

//@RequestMapping("/")
public class ErrorController {

    @GetMapping(value = "error")
    public String errorHandler(Model model, HttpSession session) {
        return "error";
    }

}
