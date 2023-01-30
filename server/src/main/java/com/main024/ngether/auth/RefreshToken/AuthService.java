package com.main024.ngether.auth.RefreshToken;

import com.main024.ngether.auth.handler.Oauth2MemberSuccessHandler;
import com.main024.ngether.auth.jwt.JwtTokenizer;
import com.main024.ngether.board.Board;
import com.main024.ngether.chat.chatEntity.ChatRoom;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.location.Location;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberRepository;
import com.nimbusds.jose.Algorithm;
import com.nimbusds.jwt.JWT;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.json.BasicJsonParser;
import org.springframework.boot.json.JsonParser;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;
    private final Oauth2MemberSuccessHandler oauth2MemberSuccessHandler;

    public Map<String, String> refresh(String refreshToken) {

        // === Refresh Token 유효성 검사 === //
        if(!jwtTokenizer.validateToken(refreshToken)){
            throw new BusinessLogicException(ExceptionCode.NOT_VALIDATE);
        }
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String payloadJWT = refreshToken.split("\\.")[1];
        String info = new String(decoder.decode(payloadJWT));
        JsonParser jsonParser = new BasicJsonParser();
        Map<String, Object> jsonArray = jsonParser.parseMap(info);


        // === Access Token 재발급 === //
        long now = System.currentTimeMillis();
        String email = (String)jsonArray.get("sub");
        RefreshToken findRefreshToken = refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_FOUND));
        Member member = memberRepository.findByEmail(email).get();
        String accessToken = oauth2MemberSuccessHandler.delegateAccessToken(member);
        Map<String, String> accessTokenResponseMap = new HashMap<>();

        // === 현재시간과 Refresh Token 만료날짜를 통해 남은 만료기간 계산 === //
        // === Refresh Token 만료시간 계산해 1개월 미만일 시 refresh token도 발급 === //
        long refreshExpireTime = (long) jsonArray.get("exp") * 1000;
        long diffDays = (refreshExpireTime - now) / 1000 / (24 * 60);
        if (diffDays < 1) {
            String newRefreshToken = oauth2MemberSuccessHandler.delegateRefreshToken(member);
            accessTokenResponseMap.put("Refresh", newRefreshToken);
            findRefreshToken.setRefreshToken(newRefreshToken);
            refreshTokenRepository.save(findRefreshToken);
        }
        accessTokenResponseMap.put("Authorization", "Bearer " + accessToken);
        return accessTokenResponseMap;
    }
}
