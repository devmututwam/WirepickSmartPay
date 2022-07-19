package com.wirepicksmartpay.controller.security;


import com.wirepicksmartpay.api.AuthenticationAPI;
import com.wirepicksmartpay.helper.enums.ResponseConstants;
import com.wirepicksmartpay.helper.sessionHelper.SessionHelper;
import com.wirepicksmartpay.model.security.SecUserModel;
import com.wirepicksmartpay.service.security.LoginService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Controller
public class HomeController {

    private Logger logger = Logger.getLogger(HomeController.class);
    private final AuthenticationAPI authenticationAPI;
    private final LoginService loginService;
    private final SessionHelper sessionHelper;

    public HomeController(AuthenticationAPI authenticationAPI,
                          LoginService loginService, SessionHelper sessionHelper) {
        this.authenticationAPI = authenticationAPI;
        this.loginService = loginService;
        this.sessionHelper = sessionHelper;
    }

    /**
     * Display landing page
     * @param request
     * @return
     */
    @GetMapping(value = "/")
    public ModelAndView showLandingPage(HttpServletRequest request) {


        return new ModelAndView("landing");
    }

    /**
     * Render the login page
     * @param request
     * @return
     */
    @GetMapping(value = "/login")
    public String login(HttpServletRequest request) {

        SecUserModel user = sessionHelper.userSession(request);
        if (user != null) {
            return "redirect:/dashboard";
        }

        return "login";
    }

    /**
     * Authenticate user
     * @param request
     * @return
     */
    @PostMapping(value = {"authenticateUser"})
    @ResponseBody
    protected Map<String, Object> submitServiceRequest(HttpServletRequest request) {

        Map<String, Object> finalResponse = new HashMap<>();

        SecUserModel user = null;

        try {

            finalResponse = loginService.loginMethod(request);

            if(finalResponse.get(ResponseConstants.STATUS).equals(ResponseConstants.STATUS_SUCCESS)){
                user = sessionHelper.validateUser(request);
            }

            //Create user session
            request.getSession().setAttribute("user", user);
            finalResponse.put("user", user);

        } catch (Exception e) {
            logger.error(e.getMessage(), e.getCause());

            finalResponse.put(ResponseConstants.STATUS, ResponseConstants.STATUS_ERROR);
            finalResponse.put(ResponseConstants.MESSAGE, "Error!! Failed to authenticate user " + e.getMessage());
            return finalResponse;
        }

        return finalResponse;
    }


    /**
     * Logout controller
     * @param request
     * @return
     */
    @GetMapping(value = {"logout"})
    public String logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return "redirect:/login";
    }



    //End of class
}
