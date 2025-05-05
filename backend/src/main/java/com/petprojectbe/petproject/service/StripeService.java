package com.petprojectbe.petproject.service;

import com.stripe.Stripe;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class StripeService {

    @Value("${stripe.secret}")
    private String stripeSecretKey;

    public void initializeStripe() {
        Stripe.apiKey = stripeSecretKey;  // Cấu hình API key của Stripe
        System.out.println("stripeSecretKey : " + stripeSecretKey);
    }
}
