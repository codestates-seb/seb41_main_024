package com.main024.ngether.location;

import com.main024.ngether.board.Board;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface LocationMapper {
    //Location locationPostDtoToLocation(LocationDto.Post locationPostDto);
    Location locationPatchDtoToLocation(LocationDto.Patch locationPatchDto);
    /*
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.nickName", target = "nickName")
    LocationDto.Response locationToLocationResponseDto(Location location);

     */
    List<LocationDto.Response> locationsToLocationResponseDtos(List<Location> locations);


    default Location locationPostDtoToLocation(MemberService memberService,LocationDto.Post locationPostDto) {
        Location location = new Location();
        location.setLongitude(locationPostDto.getLongitude());
        location.setLatitude(locationPostDto.getLatitude());
        location.setAddress(locationPostDto.getAddress());
        location.setLocationName(locationPostDto.getLocationName());

        location.setMember(memberService.getLoginMember());

        /*
        Member member = new Member();
        member.setMemberId(locationPostDto.getMemberId());

        location.setMember(member);

         */

        return location;
    }

    default LocationDto.Response locationToLocationResponseDto(Location location) {
        Member member = location.getMember();
        return LocationDto.Response.builder()
                .locationId(location.getLocationId())
                .memberId(location.getMember().getMemberId())
                .nickName(location.getMember().getNickName())
                .latitude(location.getLatitude())
                .longitude(location.getLongitude())
                .address(location.getAddress())
                .locationName(location.getLocationName())
                .build();
    }

    /*
    default Location locationPostDtoToDistance(LocationDto.DistanceCal distanceCal){
        Location location = new Location();
        location.setLocationId(distanceCal.getLocationId());
        Board board = new Board();
        board.setBoardId(distanceCal.getBoardId());
        location.setBoard(board);

        return location;
    }

     */

    default LocationDto.DistanceResponse locationToLocationDistance(Distance distance){
        return LocationDto.DistanceResponse.builder()
                .result(distance.getResult())
                .build();
    }
}
