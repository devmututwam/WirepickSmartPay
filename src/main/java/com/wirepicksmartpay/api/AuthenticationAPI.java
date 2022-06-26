package com.wirepicksmartpay.api;


import com.wirepicksmartpay.dto.LoginRequestDto;
import lombok.extern.log4j.Log4j;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * This class manages the authentication of USERs
 * via the Wirepick Main Auth API
 * @Author MututwaM
 */
@Component
@Log4j
public class AuthenticationAPI {

    private final Environment env;

    public AuthenticationAPI(Environment env) {
        this.env = env;
    }


    /**
     * API Method to authenticate user
     * @param loginRequestDto
     * @return
     */
    public List<String> authenticateUser(LoginRequestDto loginRequestDto) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set( "Content-Type", "application/json" );
        ResponseEntity<Set<String>> response = null;

        String url = this.env.getProperty( "wirepickMainAuthUser" );
        try {
            response = restTemplate.exchange( url, HttpMethod.POST, new HttpEntity<>( loginRequestDto, headers ), new ParameterizedTypeReference<Set<String>>() {
            } );
        }
        catch (Exception e) {
            log.error( ExceptionUtils.getStackTrace( e ) );
        }

        if (response == null) {
            return new ArrayList<>();
        }

        Set<String> returnedValues;
        returnedValues = response.getBody();

        //########## API END #########################################
        List<String> responseList;
        if (returnedValues == null) {
            return new ArrayList<>();
        }
        else {
            responseList = new ArrayList<>( returnedValues );
        }
        return responseList;
    }


    //End of class
}
