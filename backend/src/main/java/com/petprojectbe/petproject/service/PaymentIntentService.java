package com.petprojectbe.petproject.service;

import com.petprojectbe.petproject.entity.Order;
import com.petprojectbe.petproject.entity.User;
import com.stripe.exception.AuthenticationException;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class PaymentIntentService {
    private final StripeService stripeService;

    public PaymentIntentService(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    public Map<String, String> createPaymentIntent (Order order) throws StripeException {
        stripeService.initializeStripe();
        User user = order.getUser();
        Map<String, String> metaData = new HashMap<>();
        metaData.put("orderId",order.getId().toString());
        System.out.println("DEBUG-paymentIntentService - test");
        PaymentIntentCreateParams paymentIntentCreateParams= PaymentIntentCreateParams.builder()
                .setAmount((long) (order.getTotalAmount() * 100)) // $10.00 → 1000 cents
                .setCurrency("usd")//INR currency
                .putAllMetadata(metaData)
                .setDescription("Test Payment Project -1")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
                )
                .build();
        System.out.println("DEBUG-paymentIntentService - Amount: " + (order.getTotalAmount() * 100));
        try {
            PaymentIntent paymentIntent = PaymentIntent.create(paymentIntentCreateParams);
            System.out.println("DEBUG-paymentIntentService - Metadata: " + metaData);
            Map<String, String> map = new HashMap<>();
            map.put("client_secret", paymentIntent.getClientSecret());
            return map;
        } catch (AuthenticationException e){
            System.out.println("Exception " + e);
        }
       return null;
    }

}
