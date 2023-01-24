package com.main024.ngether.auth.handler;


import com.google.gson.Gson;
import com.main024.ngether.auth.dto.LoginResponseDto;
import com.main024.ngether.location.Location;
import com.main024.ngether.location.LocationRepository;
import com.main024.ngether.member.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final LocationRepository locationRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        log.info("# Authenticated successfully!");
        sendErrorResponse(response,authentication);
    }

    private void sendErrorResponse(HttpServletResponse response, Authentication authentication) throws IOException {
        Gson gson = new Gson();
        Member member = (Member) authentication.getPrincipal();
        LoginResponseDto dto = new LoginResponseDto();
        dto.setMemberId(member.getMemberId());
        dto.setNickName(member.getNickName());
        List<Location> locationList = locationRepository.findByMemberMemberId(member.getMemberId()).get();
        List<Long> locationId = new ArrayList<>();
        for(int i = 0; i < locationList.size(); i++){
            locationId.add(locationList.get(i).getLocationId());
        }
        dto.setLocationId(locationId);
        dto.setRole(member.getRoles().get(0));

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(gson.toJson(dto, LoginResponseDto.class));
    }
}