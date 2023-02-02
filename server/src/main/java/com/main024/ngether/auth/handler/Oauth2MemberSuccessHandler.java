package com.main024.ngether.auth.handler;

import com.google.gson.Gson;
import com.main024.ngether.auth.RefreshToken.RefreshToken;
import com.main024.ngether.auth.RefreshToken.RefreshTokenRepository;
import com.main024.ngether.auth.dto.LoginResponseDto;
import com.main024.ngether.auth.jwt.JwtTokenizer;
import com.main024.ngether.auth.utils.CustomAuthorityUtils;
import com.main024.ngether.auth.utils.ErrorResponder;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.location.Location;
import com.main024.ngether.location.LocationRepository;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;
@Slf4j
@Component
public class Oauth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public Oauth2MemberSuccessHandler(JwtTokenizer jwtTokenizer,
                                      CustomAuthorityUtils customAuthorityUtils,
                                      MemberRepository memberRepository,
                                      RefreshTokenRepository refreshTokenRepository){
        this.jwtTokenizer = jwtTokenizer;
        this.customAuthorityUtils = customAuthorityUtils;
        this.memberRepository = memberRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        //OAuth2 로그인 사용자 정보
        var oauth2User = (OAuth2User)authentication.getPrincipal();
        String email = String.valueOf(oauth2User.getAttributes().get("email"));
        List<String> authorities = customAuthorityUtils.createRoles(email);

        //DB에서 email를 통해 사용자 정보 확인
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if(optionalMember.get().getRoles().get(0).equals("BAN")){
            throw new BusinessLogicException(ExceptionCode.BAN);
        }
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        //사용자 생성 정보로 토큰 생성
        String accessToken = delegateAccessToken(findMember);
        String refreshToken = delegateRefreshToken(findMember);

        RefreshToken savedRefreshToken = new RefreshToken();
        savedRefreshToken.setRefreshToken(refreshToken);
        refreshTokenRepository.save(savedRefreshToken);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("RefreshToken", refreshToken);

        String initialStatus = "";
        if(findMember.getPhoneNumber() == null)
            initialStatus = "true";
        else
            initialStatus = "false";


        //최초 로그인일 경우와 아닌 경우를 구분
        URI memberUri = memberCreateURI(accessToken, refreshToken, initialStatus);

        //users/info 에 토큰과 initial 여부를 쿼리로 담아 리다이렉트
        getRedirectStrategy().sendRedirect(request, response, memberUri.toString());

    }


    public String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        //Payload에 username, roles 구성
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        //토큰 유지 시간으로 accessToken Expiration 설정
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        //secret-key 설정
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        //AccessToken 생성
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    public String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        //refreshToken 생성
        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI memberCreateURI(String accessToken, String refreshToken, String initialStatus) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken); //쿼리에 accessToken 전송
        queryParams.add("refresh_token", refreshToken); //쿼리에 refreshToken 전송
        queryParams.add("initial", initialStatus); // 쿼리에 initial 전송



        return UriComponentsBuilder
                .newInstance()
                .scheme("https")
                //.path("/login/oauth2/code/google")
                .host("ngether.xyz")
                //.host("localhost")
                //.port(3443)
                .path("/google")
                .queryParams(queryParams) //쿼리 파라미터로 access token, refresh token, initial 전송.
                .build()
                .toUri();
    }
}
