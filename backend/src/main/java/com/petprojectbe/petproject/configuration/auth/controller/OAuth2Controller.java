package com.petprojectbe.petproject.configuration.auth.controller;

import com.petprojectbe.petproject.configuration.auth.config.JwtTokenHandler;
import com.petprojectbe.petproject.configuration.auth.service.OAuth2Service;
import com.petprojectbe.petproject.entity.User;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/oauth2")
public class OAuth2Controller {
    @Autowired
    private OAuth2Service oAuth2Service;

    @Autowired
    private JwtTokenHandler jwtTokenHandler;

    @GetMapping("/success")
    public void callbackOauth2(@AuthenticationPrincipal OAuth2User oAuth2User, HttpServletResponse response) throws IOException {
        String userName = oAuth2User.getAttribute("email");
        User user = oAuth2Service.getUser(userName);
        if (user == null) {
            user = oAuth2Service.createUserOnOAuth2Login(oAuth2User, "google");
        }
        System.out.println("debug0 "+user.getEmail());
        String token = jwtTokenHandler.generateToken(user.getUsername());
        System.out.println("debug1 tao token roi "+token);
        response.sendRedirect("http://localhost:5173/oauth2/callback?token=" + token);
    }
}
