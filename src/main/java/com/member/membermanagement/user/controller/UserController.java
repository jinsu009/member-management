package com.member.membermanagement.user.controller;

import com.member.membermanagement.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/user")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/ajax/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, Object> map, HttpServletRequest request){
        Map<String, Object> resultMap = userService.userLogin(map, request);
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("/login/status")
    @ResponseBody
    public Map<String, Object> loginStatus(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        Boolean isLogin = request.getSession().getAttribute("isLogin") != null ? (Boolean) request.getSession().getAttribute("isLogin") : false;
        if(isLogin != null && isLogin){
            resultMap.put("userLoginInfo", request.getSession().getAttribute("userLoginInfo"));
        }
        resultMap.put("isLogin", isLogin);
        return resultMap;
    }

    @PostMapping("/ajax/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();

        request.getSession().removeAttribute("userLoginInfo");
        request.getSession().removeAttribute("isLogin");

        resultMap.put("isLogin", false);
        return ResponseEntity.ok(resultMap);
    }

    @PostMapping("/ajax/join")
    public ResponseEntity<Map<String, Object>> joinUser(@RequestBody Map<String, Object> map, HttpServletRequest request){
        Map<String, Object> resultMap = userService.joinUser(map);
        return ResponseEntity.ok(resultMap);
    }

    @PostMapping("/ajax/getUserInfo")
    public ResponseEntity<Map<String, Object>> getUserInfo(@RequestBody Map<String, Object> map, HttpServletRequest request){
        Map<String, Object> resultMap = userService.getUserInfo(map);
        return ResponseEntity.ok(resultMap);
    }

    @PostMapping("/ajax/updateUserInfo")
    public ResponseEntity<Map<String, Object>> updateUserInfo(@RequestBody Map<String, Object> map, HttpServletRequest request){
        Map<String, Object> resultMap = userService.updateUserInfo(map);
        return ResponseEntity.ok(resultMap);
    }
	
	@PostMapping("/ajax/userCheckId")
	public ResponseEntity<Map<String, Object>> checkUserId(@RequestBody Map<String, Object> map, HttpServletRequest request){
        Map<String, Object> resultMap = userService.userCheckId(map);
        return ResponseEntity.ok(resultMap);
    }

}
