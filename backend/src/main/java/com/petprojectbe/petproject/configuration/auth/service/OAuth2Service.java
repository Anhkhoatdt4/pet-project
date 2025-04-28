package com.petprojectbe.petproject.configuration.auth.service;

import com.petprojectbe.petproject.entity.User;
import com.petprojectbe.petproject.repository.UserDetailRepository;
import com.petprojectbe.petproject.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class OAuth2Service {

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private UserDetailRepository userDetailRepository;

    public User getUser(String username){
        return userDetailRepository.findByEmail(username);
    }
    // sub , name , given_name , family_name: ho cua ng dung , email , picture: anh dai dien
    public User createUserOnOAuth2Login(OAuth2User oAuth2User, String provider){
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");
        String email = oAuth2User.getAttribute("email");
        String phoneNumber = oAuth2User.getAttribute("phone_number");
        User user = User.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .provider(provider)
                .createOn(new Date())
                .phoneNumber(phoneNumber)
                .enabled(true)
                .authorities(authorityService.getUserAuthorities())
                .build();
        return userDetailRepository.save(user);
    }
}
