package com.wirepicksmartpay.helper.sessionHelper;


import com.wirepicksmartpay.model.security.SecUserModel;
import com.wirepicksmartpay.repository.security.SecUserRepository;
import com.wirepicksmartpay.service.security.PassBasedEnc;
import com.wirepicksmartpay.service.security.TrippleDes;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

@Service
public class SessionHelper {

    private Logger logger = Logger.getLogger(SessionHelper.class);
    private final SecUserRepository secUserRepository;
    private final PassBasedEnc passBasedEnc;
    private final TrippleDes trippleDes;

    public SessionHelper(SecUserRepository secUserRepository, PassBasedEnc passBasedEnc, TrippleDes trippleDes) {
        this.secUserRepository = secUserRepository;
        this.passBasedEnc = passBasedEnc;
        this.trippleDes = trippleDes;
    }

    /**
     * Create Session
     * @param request
     * @return
     */
    @Transactional(rollbackOn = Exception.class)
    public SecUserModel validateUser(HttpServletRequest request) {

        try {

            String username = request.getParameter("username");
            String password = request.getParameter("password");

            SecUserModel user = secUserRepository.findByUsername(username);

            //Validate the password
            String descriptedPsd = trippleDes.decrypt(user.getPassword());

            /* verify the encrypted password and originally encrypted password in the DB */
            if(!descriptedPsd.equalsIgnoreCase(password)){
                System.out.println("Incorrect password entered!!");
                return null;
            }
            else System.out.println("Password");

            return user;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    /**
     * Get Session
     * @param request
     * @return
     */
    public SecUserModel userSession(HttpServletRequest request){
        return (SecUserModel) request.getSession().getAttribute("user");
    }

    //End of class
}
