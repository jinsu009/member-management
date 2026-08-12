package com.member.membermanagement.user.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface UserMapper {

    int insertUserInfo(Map<String, Object> map);

    Map<String, Object> getUserInfo(Map<String, Object> map);

    int updateUserInfo(Map<String, Object> map);
	
	int resignUser(Map<String, Object> map);
}
