package com.petprojectbe.petproject.configuration.auth.controller;

import com.petprojectbe.petproject.configuration.auth.config.JwtTokenHandler;
import com.petprojectbe.petproject.dto.request.LoginRequest;
import com.petprojectbe.petproject.dto.request.RegistrationRequest;
import com.petprojectbe.petproject.dto.request.UserToken;
import com.petprojectbe.petproject.dto.request.VerifyRequest;
import com.petprojectbe.petproject.dto.response.RegistrationResponse;
import com.petprojectbe.petproject.entity.User;
import com.petprojectbe.petproject.service.RegistrationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@CrossOrigin
public class AuthController {
    AuthenticationManager authenticationManager;
    RegistrationService registrationService;
    UserDetailsService userDetailsService;
    JwtTokenHandler jwtTokenHandler;

    @PostMapping("/login")
    public ResponseEntity<UserToken>login(@RequestBody LoginRequest loginRequest) {
        try {
            // unauthenticated(...) là một factory method để tạo một token chưa được xác thực, với isAuthenticated() == false.
            Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.getUserName(),loginRequest.getPassword());
            Authentication authenticationResponse = this.authenticationManager.authenticate(authentication);
            // Dòng này đưa authentication vào trong AuthenticationManager để thực hiện xác thực.
            System.out.println("debug0 "+authenticationResponse.isAuthenticated());
            if (authenticationResponse.isAuthenticated()) {
                User user = (User) authenticationResponse.getPrincipal();
                //  kiểm tra xem user có được "enabled" không
                if (!user.isEnabled()) {
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
                System.out.println("debug1 "+user.isEnabled());
                String token = jwtTokenHandler.generateToken(user.getEmail());
                UserToken userToken = UserToken.builder().token(token).build();
                return new ResponseEntity<>(userToken, HttpStatus.OK);
            }
        }
        catch (BadCredentialsException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse>register(@RequestBody RegistrationRequest registrationRequest) {
        RegistrationResponse registrationResponse = registrationService.createUser(registrationRequest);
        return new ResponseEntity<>(registrationResponse , registrationResponse.getCode() == 200 ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(@RequestBody VerifyRequest verifyRequest){
        String userName = verifyRequest.getUserName();
        String code = verifyRequest.getCode();

        User user = (User) userDetailsService.loadUserByUsername(userName);
        if (user != null && user.getVerificationCode().equals(code)){
            registrationService.verifyUser(userName);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}

//Thứ tự	Bộ lọc	                                        Mô tả
//1	        SecurityContextPersistenceFilter	        Khôi phục SecurityContext nếu có
//2	        CorsFilter	                                 Xử lý CORS
//3	        ✅ JwtAuthenticationFilter (do bạn thêm)	Giải mã JWT, set Authentication vào SecurityContextHolder
//4	        UsernamePasswordAuthenticationFilter	    Xử lý login với form-based hoặc HTTP Basic
//5	        ExceptionTranslationFilter	                        Xử lý lỗi bảo mật
//6	        FilterSecurityInterceptor	                        Kiểm tra quyền truy cập (authorization