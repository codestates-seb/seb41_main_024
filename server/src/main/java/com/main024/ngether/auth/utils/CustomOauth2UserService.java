package com.main024.ngether.auth.utils;

import com.main024.ngether.auth.dto.OauthAttributes;
import com.main024.ngether.auth.dto.SessionMemberDto;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CustomOauth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User>{
    private final MemberRepository memberRepository;
    private final HttpSession httpSession;


    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(request);
        //현재 사용 OAuth2를 구분.
        String registrationId = request.getClientRegistration().getRegistrationId();
        //OAuth2 로그인 진행 시 키가 되는 필드값
        String usernameAttributeName = request.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
        //OAuth2UserService를 통해 가져온 OAuth2User의 attribute를 담을 클래스
        OauthAttributes attributes = OauthAttributes.of(registrationId, usernameAttributeName, oAuth2User.getAttributes());
        //DB에서 이메일을 통해 사용자 탐색
        Optional<Member> repository = memberRepository.findByEmail(attributes.getEmail());
        Member member;
        if(repository.isEmpty()){
            //사용자가 존재하지 않으면 회원가입 처리
            member = saveMember(attributes);
        }
        else {
            //존재하면 업데이트
            member = saveOrUpdate(attributes);
        }
        //세션에 사용자 정보를 저장하기 위한 dto클래스
        httpSession.setAttribute("user", new SessionMemberDto(member));

        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")), attributes.getAttributes(), attributes.getNameAttributeKey());
    }
    private Member saveOrUpdate(OauthAttributes attributes){
        Member member = memberRepository.findByEmail(attributes.getEmail())
                .map(entity -> entity.update(attributes.getEmail(), attributes.getName()))
                .orElse(attributes.toEntity());
        return memberRepository.save(member);
    }

    private Member saveMember(OauthAttributes attributes){
        Member member = Member.builder()
                .email(attributes.getEmail())
                .nickName(attributes.getName())
                .pw(getPasswordEncoder().encode("oauth2member!!"))
                .build();
        return memberRepository.save(member);
    }
}
