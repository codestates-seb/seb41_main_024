package com.main024.ngether.oauth2;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloHomeController {
    @GetMapping("/hello-oauth2")
    public String home() {
        return "hello-oauth2";
    }
}
