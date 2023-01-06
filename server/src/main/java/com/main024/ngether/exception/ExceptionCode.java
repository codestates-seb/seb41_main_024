package com.main024.ngether.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(400, "Member not found"),
    MEMBER_EXISTS(401, "Member exists"),
    NOT_LOGIN(402,"login, please"),
    BOARD_NOT_FOUND(403,"login, please"),
    PERMISSION_DENIED(403,"login, please");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message){
        this.status = code;
        this.message = message;
    }
}