package com.petprojectbe.petproject.utility;

import java.util.Random;

public class VerificationCodeGenerator {
    private static final int CODE_LENGTH = 6;
    public static String generateCode(){
        StringBuilder code = new StringBuilder(CODE_LENGTH);
        Random random = new Random();
        for (int i = 0 ; i < CODE_LENGTH ; i++){
            int digit = random.nextInt(10);
            code.append(digit);
        }
        return code.toString();
    }
}
