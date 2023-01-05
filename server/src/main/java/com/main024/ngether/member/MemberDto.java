package com.main024.ngether.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Post{

        @NotBlank(message = "패스워드를 입력해주세요.")
        private String pw;
        @NotBlank(message = "별명을 입력해주세요.")
        private String nickName;
        @NotBlank(message = "전화번호를 입력해주세요.")
        private String phoneNumber;
        @Email
        private String email;
    }
    @Getter
    @AllArgsConstructor
    public static class Patch{

        private Long memberId;

        private String pw;

        private String nickName;

        @Email
        private String email;


        public void setMember_id(long memberId) {
            this.memberId = memberId;
        }
    }

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private Long memberId;
        private String nickName;
        private String email;
        private String phoneNumber;


    }
}