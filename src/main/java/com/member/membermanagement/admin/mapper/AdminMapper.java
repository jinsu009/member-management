package com.member.membermanagement.admin.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface AdminMapper {
    List<Map<String, Object>> selectUserInfoList(Map<String, Object> params);
    int selectUserInfoListCnt(Map<String, Object> params);
    int updateUserInfo(Map<String, Object> params);
}
