package com.main024.ngether.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(400, "Member not found"),
    MEMBER_EXISTS(401, "Member exists"),
    NOT_LOGIN(402,"login, please"),
    BOARD_NOT_FOUND(403,"login, please"),
    PERMISSION_DENIED(404,"check, please"),
    FULL_MEMBER(405,"Recruitment complete"),

    NOT_ALLOW(406,"MAX NUM must bigger than 2"),
    LOCATION_NOT_FOUND(407, "Location not found"),
    DECLARE_STATUS_TRUE(408,"Declare Status"),

    CHATROOM_ID_NOT_MATCH_BOARD_ID(409,"chatRoomId don't match boardId"),
    SORTBY_NOT_FOUND(404, "SortBy not found"),
    BOARD_NOT_DELETE(404, "Board not delete"),
    ROLE_NOT_ADMIN(404, "Role not admin");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message){
        this.status = code;
        this.message = message;
    }
}