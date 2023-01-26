package com.main024.ngether.member;

import com.main024.ngether.auth.dto.LoginResponseDto;
import com.main024.ngether.location.Location;
import com.main024.ngether.location.LocationRepository;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);
    Member memberPatchToMember(MemberDto.Patch requestBody);
    MemberDto.Response memberToMemberResponse(Member member);
    default LoginResponseDto googleMemberToGoogleMemberResponse(Member member, LocationRepository locationRepository){
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
        return dto;
    }
    List<MemberDto.Response> membersToMemberResponses(List<Member> members);
}