package com.member.membermanagement.user.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface UserMapper {

    int insertUserInfo(Map<String, Object> map);

}
