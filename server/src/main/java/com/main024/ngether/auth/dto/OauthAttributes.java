package com.main024.ngether.auth.dto;

import com.main024.ngether.member.Member;
import lombok.Builder;
import lombok.Getter;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;

@Getter
public class OauthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;


    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Builder
    public OauthAttributes(Map<String, Object> attributes, String nameAttributeKey, String name, String email) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
    }
    //registrationID를 통해 OAuth2 써드파티 구분
    public static OauthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        return ofGoogle(userNameAttributeName, attributes);
    }
    //google 사용자 정보
    private static OauthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OauthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }
    //Member 엔티티 생성
    public Member toEntity() {
        return Member.builder()
                .email(email)
                .nickName(name)
                .pw(getPasswordEncoder().encode("oauth2Member!"))
                .build();
    }
}
