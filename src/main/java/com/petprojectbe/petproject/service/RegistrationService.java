package com.petprojectbe.petproject.service;

import com.petprojectbe.petproject.dto.request.RegistrationRequest;
import com.petprojectbe.petproject.dto.response.RegistrationResponse;
import com.petprojectbe.petproject.entity.User;
import com.petprojectbe.petproject.repository.UserDetailRepository;
import com.petprojectbe.petproject.utility.VerificationCodeGenerator;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerErrorException;

import java.util.Date;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RegistrationService {

     UserDetailRepository userDetailRepository;
     AuthorityService authorityService;
     PasswordEncoder passwordEncoder;
     EmailService emailService;
    public RegistrationResponse createUser(RegistrationRequest registrationRequest) {
        User userExisting = userDetailRepository.findByEmail(registrationRequest.getEmail());
        if (userExisting != null) {
            return RegistrationResponse.builder()
                    .code(400)
                    .message("This email is already registered. Please use a different email address.")
                    .build();
        }

        try {
            String code = VerificationCodeGenerator.generateCode();
            User user = User.builder().firstName(registrationRequest.getFirstName())
                    .lastName(registrationRequest.getLastName())
                    .password(passwordEncoder.encode(registrationRequest.getPassword()))
                    .phoneNumber(registrationRequest.getPhoneNumber())
                    .enabled(false)
                    .provider("mannual")
                    .verificationCode(code)
                    .email(registrationRequest.getEmail())
                    .createOn(new Date())
                    .authorities(authorityService.getUserAuthorities()).build();
            userDetailRepository.save(user);
            emailService.sendMail(user);

            return RegistrationResponse.builder()
                    .code(200)
                    .message("User created!")
                    .build();
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ServerErrorException(e.getMessage(),e.getCause());
        }
    }

    public void verifyUser(String userName){
        User user = userDetailRepository.findByEmail(userName);
        user.setEnabled(true);
        userDetailRepository.save(user);
    }
}
