package com.petprojectbe.petproject.configuration.auth.controller;

import com.petprojectbe.petproject.configuration.auth.config.JwtTokenHandler;
import com.petprojectbe.petproject.configuration.auth.service.OAuth2Service;
import com.petprojectbe.petproject.entity.User;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
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
        OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
//        System.out.println("debug0-oauth2controller "+oAuth2AuthenticationToken);
        String registrationId = oAuth2AuthenticationToken.getAuthorizedClientRegistrationId();
        String userName = ""; 
        if ("google".equals(registrationId)) {
            userName = oAuth2User.getAttribute("email");
        } else if ("facebook".equals(registrationId)) {
            String facebookId = oAuth2User.getAttribute("id");
            String email = "fb_user" + facebookId + "@facebook.local";
            userName = email;
        }
//        System.out.println("OAuth2User attributes: " + oAuth2User.getAttributes());
//        System.out.println("debug0-oauth2controller "+userName);
        User user = oAuth2Service.getUser(userName);
        System.out.println("debug0-oauth2controller "+user);
        if (user == null && "google".equals(registrationId)) {
            user = oAuth2Service.createUserOnOAuth2Login(oAuth2User, registrationId);
        }
        else if (user == null && "facebook".equals(registrationId)) {
            user = oAuth2Service.createUserOnAuth2LoginWithFacebook(oAuth2User, registrationId);
        }
//        System.out.println("debug0-oauth2controller "+user.getEmail());
        String token = jwtTokenHandler.generateToken(user.getUsername());
        // System.out.println("debug1-oauth2controller "+token);
        response.sendRedirect("http://localhost:5173/oauth2/callback?token=" + token);
    }
}
