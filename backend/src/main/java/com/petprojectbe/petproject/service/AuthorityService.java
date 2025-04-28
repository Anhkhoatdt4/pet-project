package com.petprojectbe.petproject.service;

import com.petprojectbe.petproject.entity.Authority;
import com.petprojectbe.petproject.repository.AuthorityRepository;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Builder
public class AuthorityService {
    @Autowired
    private AuthorityRepository authorityRepository;

    public List<Authority> getUserAuthorities() {
        List<Authority> userAuthorities = new ArrayList<>();
        Authority authority = authorityRepository.findByRoleCode("ROLE_USER");
        userAuthorities.add(authority);
        return userAuthorities;
    }

    public Authority createAuthority(String authorityCode , String description) {
        Authority authority = Authority.builder()
                        .roleCode(authorityCode)
                        .roleDescription(description)
                        .build();
        return authorityRepository.save(authority);
    }
}
