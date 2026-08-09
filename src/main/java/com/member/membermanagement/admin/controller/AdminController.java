package com.member.membermanagement.admin.controller;

import com.member.membermanagement.admin.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/ajax/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, Object> map, HttpServletRequest request){
        Map<String, Object> resultMap = adminService.adminLogin(map, request);
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("/login/status")
    @ResponseBody
    public Map<String, Object> loginStatus(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        Boolean isLogin = request.getSession().getAttribute("isLogin") != null ? (Boolean) request.getSession().getAttribute("isLogin") : false;
        if(isLogin != null && isLogin){
            resultMap.put("adminLoginInfo", request.getSession().getAttribute("adminLoginInfo"));
        }
        resultMap.put("isLogin", isLogin);
        return resultMap;
    }

    @PostMapping("/ajax/getAdminList")
    public ResponseEntity<Map<String, Object>> getAdminList(@RequestBody Map<String, Object> map, HttpServletRequest request){
        Map<String, Object> resultMap = adminService.getAdminList(map);
        return ResponseEntity.ok(resultMap);
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
