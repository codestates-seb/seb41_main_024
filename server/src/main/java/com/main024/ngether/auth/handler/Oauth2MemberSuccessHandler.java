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

        //OAuth2 ????????? ????????? ??????
        var oauth2User = (OAuth2User)authentication.getPrincipal();
        String email = String.valueOf(oauth2User.getAttributes().get("email"));
        List<String> authorities = customAuthorityUtils.createRoles(email);

        //DB?????? email??? ?????? ????????? ?????? ??????
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if(!optionalMember.get().getRoles().get(0).equals("BAN")) {


            Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
            //????????? ?????? ????????? ?????? ??????
            String accessToken = delegateAccessToken(findMember);
            String refreshToken = delegateRefreshToken(findMember);

            RefreshToken savedRefreshToken = new RefreshToken();
            savedRefreshToken.setRefreshToken(refreshToken);
            refreshTokenRepository.save(savedRefreshToken);

            response.setHeader("Authorization", "Bearer " + accessToken);
            response.setHeader("RefreshToken", refreshToken);

            String initialStatus = "";
            if (findMember.getPhoneNumber() == null)
                initialStatus = "true";
            else
                initialStatus = "false";


            //?????? ???????????? ????????? ?????? ????????? ??????
            URI memberUri = memberCreateURI(accessToken, refreshToken, initialStatus);

            //users/info ??? ????????? initial ????????? ????????? ?????? ???????????????
            getRedirectStrategy().sendRedirect(request, response, memberUri.toString());
        }
        else if(optionalMember.get().getRoles().get(0).equals("BAN")){
            ErrorResponder.sendErrorResponse(response, HttpStatus.FORBIDDEN);
        }

    }


    public String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        //Payload??? username, roles ??????
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        //?????? ?????? ???????????? accessToken Expiration ??????
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        //secret-key ??????
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        //AccessToken ??????
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    public String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        //refreshToken ??????
        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI memberCreateURI(String accessToken, String refreshToken, String initialStatus) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken); //????????? accessToken ??????
        queryParams.add("refresh_token", refreshToken); //????????? refreshToken ??????
        queryParams.add("initial", initialStatus); // ????????? initial ??????



        return UriComponentsBuilder
                .newInstance()
                .scheme("https")
                //.path("/login/oauth2/code/google")
                .host("ngether.xyz")
                //.host("localhost")
                //.port(3443)
                .path("/google")
                .queryParams(queryParams) //?????? ??????????????? access token, refresh token, initial ??????.
                .build()
                .toUri();
    }
}
