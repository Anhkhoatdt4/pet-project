package com.petprojectbe.petproject.configuration.auth.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter  extends OncePerRequestFilter {
    private final JwtTokenHandler jwtTokenHandler;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtTokenHandler jwtTokenHandler, UserDetailsService userDetailsService) {
        this.jwtTokenHandler = jwtTokenHandler;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            String authToken = jwtTokenHandler.getToken(request);
            System.out.println("=== [DEBUG] Token từ request: " + authToken);

            if (authToken != null) {
                String username = jwtTokenHandler.getUserNameFromToken(authToken);
                if (username != null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    System.out.println("=== [DEBUG] UserDetails: " + userDetails);

                    if (jwtTokenHandler.validateToken(authToken, userDetails)) {
                        System.out.println("=== [DEBUG] Token hợp lệ");

                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());

                        authentication.setDetails(userDetails);

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    } else {
                        System.out.println("=== [DEBUG] Token KHÔNG hợp lệ");
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("=== [ERROR] Exception trong filter: " + e.getMessage());
            e.printStackTrace();
        }
        finally {
            filterChain.doFilter(request, response);
        }
    }
}
