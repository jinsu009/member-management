package com.member.membermanagement.user.service;

import com.member.membermanagement.user.mapper.UserMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserService {

    Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    // 회원 로그인
    public Map<String, Object> userLogin(Map<String, Object> map, HttpServletRequest request) {

        System.out.println("userLogin ::: "+map);
        // 로그인 로직 구현
        Map<String, Object> resultMap = new HashMap<>();
        String userId = map.get("userId") != null ? map.get("userId").toString() : null;
        String userPw = map.get("userPw") != null ? map.get("userPw").toString() : null;

        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("type", "checkId");
        paramMap.put("userId", userId);
        Map<String, Object> userInfo = userMapper.selectUserInfo(paramMap);
        if(userInfo == null){
            resultMap.put("resultCd", "F");
            resultMap.put("resultMsg", "존재하지 않는 아이디입니다.");
            return resultMap;
        }

        // userPw 일치 확인
        String encPw = passwordEncoder.encode(userPw);
        if (!passwordEncoder.matches(userPw, encPw)) {
            resultMap.put("resultCd", "F");
            resultMap.put("resultMsg", "비밀번호가 일치하지 않습니다.");
            return resultMap;
        }

        // 로그인 성공시 회원 정보 request에 세션으로 저장
        request.getSession().setAttribute("userLoginInfo", userInfo);
        request.getSession().setAttribute("isLogin", true);

        logger.info("로그인 성공: userId={}, name={}", userInfo.get("userId"), userInfo.get("name"));
        resultMap.put("resultCd", "S");
        resultMap.put("resultMsg", "로그인 성공");

        return resultMap;
    }

    /**
     * 회원 가입
     * @param map
     * @return
     */
    public Map<String, Object> joinUser(Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();

        String userId = map.get("userId") != null ? map.get("userId").toString() : null;
        String userPw = map.get("userPw") != null ? map.get("userPw").toString() : null;
        String name = map.get("name") != null ? map.get("name").toString() : null;
        String email = map.get("email") != null ? map.get("email").toString() : null;

        if (userId == null || userId.trim().isEmpty()) {
            throw new IllegalArgumentException("로그인 아이디는 필수입니다.");
        }
        if (userPw == null || userPw.trim().isEmpty()) {
            throw new IllegalArgumentException("비밀번호는 필수입니다.");
        }else{
            // 비밀번호 검증
            validatePassword(userPw);
            String encPw = passwordEncoder.encode(userPw);
            map.put("userPw", encPw);
        }
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("회원명은 필수입니다.");
        }
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("이메일은 필수입니다.");
        }

        int result = userMapper.insertUserInfo(map);
        if(result > 0){
            resultMap.put("resultCd", "S");
        }else{
            resultMap.put("resultCd", "F");
        }

        return resultMap;
    }

    /**
     * 비밀번호 검증 (4글자 이상, 특수문자 1개 이상 포함)
     * @param password 검증할 비밀번호
     * @throws IllegalArgumentException 비밀번호가 조건을 만족하지 않을 때
     */
    private void validatePassword(String password) {
        if (password == null || password.length() < 4) {
            throw new IllegalArgumentException("비밀번호는 최소 4글자 이상이어야 합니다.");
        }

        if (!isContainsSpecialCharacter(password)) {
            throw new IllegalArgumentException("비밀번호는 특수문자(!@#$%^&*)를 최소 1개 이상 포함해야 합니다.");
        }
    }

    /**
     * 특수문자 포함 여부 확인
     * @param password 확인할 비밀번호
     * @return 특수문자 포함 여부
     */
    private boolean isContainsSpecialCharacter(String password) {
        // 특수문자 패턴: !@#$%^&*
        Pattern pattern = Pattern.compile("[!@#$%^&*]");
        return pattern.matcher(password).find();
    }

    public Map<String, Object> selectUserInfo(Map<String, Object> map){
        return userMapper.selectUserInfo(map);
    }

    public Map<String, Object> updateUserInfo(Map<String, Object> map){
        Map<String, Object> resultMap = new HashMap<>();
        int result = userMapper.updateUserInfo(map);
        if(result > 0){
            resultMap.put("resultCd", "S");
        }else{
            resultMap.put("resultCd", "F");
        }
        return resultMap;
    }
}

