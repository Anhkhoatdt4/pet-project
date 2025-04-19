package com.petprojectbe.petproject.service;

import com.petprojectbe.petproject.entity.User;
import com.petprojectbe.petproject.repository.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDetailRepository userDetailRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDetailRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username : " + username);
        }
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalStateException("User has empty password");
        }
        return user;
    }
}
