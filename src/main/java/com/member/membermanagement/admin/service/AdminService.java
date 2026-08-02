package com.member.membermanagement.admin.service;

import com.member.membermanagement.admin.mapper.AdminMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminMapper adminMapper;

    public Map<String, Object> getUserList(Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        List<Map<String, Object>> userInfoList = adminMapper.selectUserInfoList(map);
        int total = adminMapper.selectUserInfoListCnt(map);
        resultMap.put("userInfoList", userInfoList);
        resultMap.put("total", total);
        return resultMap;
    }

    public Map<String, Object> updateUserInfo(Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        int result = adminMapper.updateUserInfo(map);
        if(result > 0){
            resultMap.put("resultCd", "S");
        }else{
            resultMap.put("resultCd", "F");
        }
        return resultMap;
    }

}
