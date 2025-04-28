package com.petprojectbe.petproject.service;

import com.petprojectbe.petproject.entity.User;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public String sendMail(User user){
        System.out.println(user.getEmail());
        System.out.println("SENDER : " + sender);
        String subject = "Verify your email";
        String senderName = "Shop HEAVEN-CLOTHING";

        String mailContent = "<html><body>";
        mailContent += "<h2 style='color: #4CAF50;'>Hello " + user.getUsername() + ",</h2>";
        mailContent += "<p style='font-size: 16px;'>Your verification code is:</p>";
        mailContent += "<h3 style='color: #FF6347; font-size: 24px;'>" + user.getVerificationCode() + "</h3>";
        mailContent += "<p style='font-size: 16px;'>Please enter this code to verify your email.</p>";
        mailContent += "<br><br>";
        mailContent += "<footer style='font-size: 14px; color: #888;'>Best regards, <br>" + senderName + "</footer>";
        mailContent += "</body></html>";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true); // true enables multipart
            helper.setSubject(subject);
            helper.setFrom(sender);
            helper.setTo(user.getEmail());
            helper.setText(mailContent, true); // true means this is an HTML message
            mailSender.send(message);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return "Email sent successfully";
    }
}
