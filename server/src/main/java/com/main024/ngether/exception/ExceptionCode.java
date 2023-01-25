package com.main024.ngether.exception;

import lombok.Getter;

public enum ExceptionCode {
     MEMBER_NOT_FOUND(400, "Member not found"),
    MEMBER_EXISTS(401, "Member exists"),
    NOT_LOGIN(402,"login, please"),
    BOARD_NOT_FOUND(403,"not found board"),
    PERMISSION_DENIED(404,"check, please"),
    FULL_MEMBER(405,"Recruitment complete"),

    NOT_ALLOW(406,"MAX NUM must bigger than 2"),
    LOCATION_NOT_FOUND(407, "Location not found"),

    DECLARE_STATUS_TRUE(408,"Declare Status"),

    CHATROOM_ID_NOT_MATCH_BOARD_ID(409,"chatRoomId don't match boardId"),
    SORTBY_NOT_FOUND(410, "SortBy not found"),
    BOARD_NOT_DELETE(411, "Board not delete"),
    ROLE_NOT_ADMIN(412, "Role not admin"),
    REPORT_NOT_FOUND(413, " Report not found"),
    RANGE_NOT_FOUND(414, "Range not found"),
    BAN(415, "Bye"),
    QNA_NOT_FOUND(416,"Qna not found"),
    NICKNAME_EXIST(417,"NickName is exists"),
    PHONE_NUMBER_EXIST(418,"phoneNumber is exists"),
    EMAIL_EXIST(419,"email is exists");




    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message){
        this.status = code;
        this.message = message;
    }
}
