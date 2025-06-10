package com.petprojectbe.petproject.configuration.auth;


import com.petprojectbe.petproject.configuration.auth.config.JwtAuthenticationFilter;
import com.petprojectbe.petproject.configuration.auth.config.JwtTokenHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenHandler jwtTokenHandler;

    private static final String[] PUBLIC_ENDPOINTS = {
            "/product", "/category", "/address", "/order"
    };

    private static final String[] publicApis= {
            "/auth/**"
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize) -> authorize
                .requestMatchers("/v3/api-docs/**", "/swagger-ui.html", "/swagger-ui/**").permitAll()
                .requestMatchers(HttpMethod.GET,PUBLIC_ENDPOINTS).permitAll()
                        .requestMatchers("/oauth2/success").permitAll()
                .anyRequest().authenticated())
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/oauth2/authorization/google")
                        .defaultSuccessUrl("/oauth2/success")
                        .failureUrl("/oauth2/failure")
                )
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenHandler, userDetailsService), UsernamePasswordAuthenticationFilter.class);
// addFilterBefor có nhiệm vuc thêm JwtAuthenticationFilter vào trước UsernamePasswordAuthenticationFilter trong chuỗi bộ lọc của Spring Security.
        // http.csrf(AbstractHttpConfigurer::disable) để tắt CSRF (Cross-Site Request Forgery) protection.
        // CSRF protection là một biện pháp bảo mật để ngăn chặn các cuộc tấn công từ xa bằng cách yêu cầu xác thực cho mỗi yêu cầu.
        // trước khi Spring Securit xác thực username,password (xử lý bởi UsernamePasswordAuthenticationFilter), JwtAuthenticationFilter kiểm tra xem yêu cầu có chứa token JWT hợp lệ không.
        // Nếu có, nó sẽ xác thực người dùng dựa trên token JWT thay vì yêu cầu người dùng phải nhập username và password.
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return webSecurity -> {
            webSecurity.ignoring().requestMatchers(publicApis);
        };
    }

    // DaoAuthenticationProvider: Xác thực user dựa vào UserDetailsService và PasswordEncoder.
    //userDetailsService: Được inject từ bên ngoài – phải có 1 class @Service implements UserDetailsService.
    //passwordEncoder(): Trả về encoder mặc định, hỗ trợ bcrypt, noop, v.v.
    //authenticationManager.authenticate(...) sẽ ủy quyền cho DaoAuthenticationProvider.authenticate(...).
    @Bean
    AuthenticationManager authenticationManager(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        // d
        return new ProviderManager(authProvider);
    }

    @Bean
     public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
