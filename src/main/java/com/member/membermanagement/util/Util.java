package com.member.membermanagement.util;

public class Util {

    public boolean validationEmail(String value){
        String emailRegex = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";

        if (!value.matches(emailRegex)) {
            return false;
        }
        return true;
    }
}
