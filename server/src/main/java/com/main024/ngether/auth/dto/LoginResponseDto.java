package com.main024.ngether.auth.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LoginResponseDto {
    private long memberId;
    private String nickName;
    private List<Long> locationId;
    private String role;
}