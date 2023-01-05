package com.main024.ngether.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto {
    private long memberId;
    private String nickName;
}