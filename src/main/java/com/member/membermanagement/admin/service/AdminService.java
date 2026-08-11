package com.member.membermanagement.admin.service;

import com.member.membermanagement.admin.mapper.AdminMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {

    Logger logger = LoggerFactory.getLogger(AdminService.class);

    private final AdminMapper adminMapper;
    private final PasswordEncoder passwordEncoder;

    // 회원 로그인
    public Map<String, Object> adminLogin(Map<String, Object> map, HttpServletRequest request) {

        System.out.println("adminLogin ::: "+map);
        // 로그인 로직 구현
        Map<String, Object> resultMap = new HashMap<>();
        String userId = map.get("userId") != null ? map.get("userId").toString() : null;
        String userPw = map.get("userPw") != null ? map.get("userPw").toString() : null;

        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("type", "checkId");
        paramMap.put("id", userId);
        Map<String, Object> adminInfo = adminMapper.selectAdminInfo(paramMap);
        if(adminInfo == null){
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

        // 로그인 성공시 관리자 정보 request에 세션으로 저장
        request.getSession().setAttribute("adminLoginInfo", adminInfo);
        request.getSession().setAttribute("isLogin", true);

        logger.info("로그인 성공: userId={}, name={}", adminInfo.get("userId"), adminInfo.get("name"));
        resultMap.put("resultCd", "S");
        resultMap.put("resultMsg", "로그인 성공");

        return resultMap;
    }

    public Map<String, Object> getAdminList(Map<String, Object> map){
        Map<String, Object> resultMap = new HashMap<>();

        int pageNo = Integer.parseInt(map.getOrDefault("pageNo", 1).toString());
        int pageSize = Integer.parseInt(map.getOrDefault("pageSize", 10).toString());

        int offset = (pageNo - 1) * pageSize;
        map.put("offset", offset);
        map.put("pageSize", pageSize);

        List<Map<String, Object>> adminInfoList = adminMapper.selectAdminInfoList(map);
        int total = adminMapper.selectAdminInfoListCnt(map);

        resultMap.put("adminInfoList", adminInfoList);
        resultMap.put("total", total);

        return resultMap;
    }

    public Map<String, Object> getUserList(Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();

        int pageNo = Integer.parseInt(map.getOrDefault("pageNo", 1).toString());
        int pageSize = Integer.parseInt(map.getOrDefault("pageSize", 10).toString());

        int offset = (pageNo - 1) * pageSize;
        map.put("offset", offset);
        map.put("pageSize", pageSize);

        List<Map<String, Object>> userInfoList = adminMapper.selectUserInfoList(map);
        int total = adminMapper.selectUserInfoListCnt(map);

        resultMap.put("userInfoList", userInfoList);
        resultMap.put("total", total);

        return resultMap;
    }

    public Map<String, Object> updateUserInfo(Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
		
		String userSeq = map.get("seq") != null ? map.get("seq").toString() : null;
		if(userSeq == null){
			logger.error(" updateUserInfo Error : userSeq is null");
			resultMap.put("resultCd","E");
			resultMap.put("resultMsg", "요청값 누락");
			return resultMap;
		}
		
		if(map.get("status") == null){
			logger.error(" updateUserInfo Error : status is null");
			resultMap.put("resultCd","E");
			resultMap.put("resultMsg", "요청값 누락");
			return resultMap;
		}
		
        int result = adminMapper.updateUserInfo(map);
        if(result > 0){
            resultMap.put("resultCd", "S");
			resultMap.put("resultMsg", "사용자 정보 수정 성공");
        }else{
            resultMap.put("resultCd", "F");
			resultMap.put("resultMsg", "사용자 정보 수정 실패");
        }
        return resultMap;
    }

}
