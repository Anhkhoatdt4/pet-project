package com.petprojectbe.petproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Collectors;

@SpringBootApplication
public class PetProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(PetProjectApplication.class, args);
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(Collections.singletonList("*"));
        configuration.setAllowedHeaders(Arrays.asList(
                "Origin",
                "Content-Type",
                "Accept",
                "responseType",
                "Authorization",
                "x-authorization",
                "content-range",
                "range"
        ));
        configuration.setAllowedMethods(Arrays.asList(
                "GET",
                "POST",
                "PUT",
                "OPTIONS",
                "DELETE",
                "PATCH"
        ));

        // Make sure 'Content-Range' is in the exposed headers list
        configuration.setExposedHeaders(Arrays.asList(
                "X-Total-Count",
                "content-range",
                "Content-Type",
                "Accept",
                "X-Requested-With",
                "remember-me"
        ));

        source.registerCorsConfiguration("/**", configuration);
        return new CorsFilter(source);
    }
}
