package com.main024.ngether.auth.RefreshToken;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @GetMapping("/reissue")
    public ResponseEntity<Map<String, String>> reIssueAccessToken(HttpServletRequest request, HttpServletResponse response) {
        String authorizationHeader = request.getHeader("Refresh");
        Map<String, String> tokens = authService.refresh(authorizationHeader);
        String accessToken = tokens.get("Authorization");
        String refreshToken = tokens.get("Refresh");
        response.setHeader("Authorization", tokens.get("Authorization"));
        if(tokens.get("Refresh") != null)
            response.setHeader("Refresh", tokens.get("Refresh"));
        return ResponseEntity.ok(null);
    }
}
