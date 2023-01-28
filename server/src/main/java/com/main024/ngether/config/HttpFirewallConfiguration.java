package com.main024.ngether.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.HttpStatusRequestRejectedHandler;
import org.springframework.security.web.firewall.RequestRejectedHandler;
import org.springframework.security.web.firewall.StrictHttpFirewall;

@Configuration
public class HttpFirewallConfiguration {


    @Bean
    public HttpFirewall configureFirewall() {
        StrictHttpFirewall strictHttpFirewall = new StrictHttpFirewall();
        strictHttpFirewall.setAllowedHttpMethods(Arrays.asList("*"));
        strictHttpFirewall.setAllowBackSlash(true);
        strictHttpFirewall.setAllowSemicolon(true);
        return strictHttpFirewall;
    }

    /*
     Use this bean if you are using Spring Security 5.4 and above
     */
    @Bean
    public RequestRejectedHandler requestRejectedHandler() {
        return new HttpStatusRequestRejectedHandler(); // Default status code is 400. Can be customized
    }

}
