package com.main024.ngether.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Post{

        @NotBlank(message = "패스워드를 입력해주세요.")
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-z])(?=.*\\W)(?=\\S+$).{8,}", message = "비밀번호는 8자 이상, 영문 소문자, 숫자, 특수문자를 적어도 1개 포함시켜주세요")
        private String pw;
        @NotBlank(message = "별명을 입력해주세요.")
        private String nickName;
        @NotBlank(message = "전화번호를 입력해주세요.")
        @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.")
        private String phoneNumber;
        @Email
        private String email;
    }
    @Getter
    public static class Patch{


        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-z])(?=.*\\W)(?=\\S+$).{8,}", message = "비밀번호는 8자 이상, 영문 소문자, 숫자, 특수문자를 적어도 1개 포함시켜주세요")
        private String pw;

        private String nickName;

        @Email
        private String email;

        private String phoneNumber;

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