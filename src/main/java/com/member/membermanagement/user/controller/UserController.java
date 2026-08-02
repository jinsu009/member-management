package com.member.membermanagement.user.controller;

import com.member.membermanagement.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    public UserService userService;

    @PostMapping("/ajax/join")
    public ResponseEntity<Map<String, Object>> joinUser(@RequestBody Map<String, Object> map, HttpServletRequest request){
        Map<String, Object> resultMap = userService.joinUser(map);
        return ResponseEntity.ok(resultMap);
    }


}
