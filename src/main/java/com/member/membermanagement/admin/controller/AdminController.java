package com.member.membermanagement.admin.controller;

import com.member.membermanagement.admin.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/ajax/getUserList")
    public ResponseEntity<Map<String, Object>> getUserList(@RequestBody Map<String, Object> map, HttpServletRequest request){
        Map<String, Object> resultMap = adminService.getUserList(map);
        return ResponseEntity.ok(resultMap);
    }
    
    @PostMapping("/ajax/updateUserInfo")
    public ResponseEntity<Map<String, Object>> updateUserInfo(@RequestBody Map<String, Object> map, HttpServletRequest request){
        Map<String, Object> resultMap = adminService.updateUserInfo(map);
        return ResponseEntity.ok(resultMap);
    }

}
