package com.main024.ngether.location;

import com.main024.ngether.board.Board;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.member.MemberService;
import com.main024.ngether.response.MultiResponseDto;
import com.main024.ngether.response.Pagination;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
@Validated
public class LocationController {
    private final LocationService locationService;
    private final LocationMapper locationMapper;
    private final MemberService memberService;
    private final DistanceRepository distanceRepository;
    private final LocationRepository locationRepository;


    public LocationController(LocationService locationService,
                              LocationMapper locationMapper,
                              MemberService memberService,
                              DistanceRepository distanceRepository,
                              LocationRepository locationRepository) {
        this.locationService = locationService;
        this.locationMapper = locationMapper;
        this.memberService = memberService;
        this.distanceRepository = distanceRepository;
        this.locationRepository = locationRepository;
    }

    //사용자별 지정 위치 등록
    @PostMapping("/location")
    public ResponseEntity postLocation(@Valid @RequestBody LocationDto.Post locationPostDto) {
        Location location = locationService.createLocation(locationMapper.locationPostDtoToLocation(memberService, locationPostDto));

        return new ResponseEntity<>(locationMapper.locationToLocationResponseDto(location), HttpStatus.CREATED);
    }

    //사용자 실시간 위치 등록 후 type 범위 안에 있는 boardlist 조회
    @PostMapping("/distance")
    public ResponseEntity postDistance(@Valid @RequestBody LocationDto.DistanceCal distanceCal,
                                       @RequestParam(value = "range") double range,
                                       @RequestParam(value = "category") String category,
                                       @RequestParam(value = "sortBy") String sortBy,
                                       @RequestParam(value = "page") int page,
                                       @RequestParam(value = "size") int size) {
        Page<Board> pageBoards = locationService.createCurDistance(distanceCal, range, category, page, size, sortBy);

        return new ResponseEntity<>(
                new MultiResponseDto<>(pageBoards.getContent(), pageBoards), HttpStatus.OK);
    }

    //사용자별 지정 위치 수정
    @PatchMapping("/location/{location-id}")
    public ResponseEntity patchLocation(@PathVariable("location-id") @Positive long locationId,
                                        @Valid @RequestBody LocationDto.Patch locationPatchDto) {
        locationPatchDto.setLocationId(locationId);
        Location location = locationService.updateLocation(locationMapper.locationPatchDtoToLocation(locationPatchDto));

        return new ResponseEntity<>(locationMapper.locationToLocationResponseDto(location), HttpStatus.OK);
    }


    //지정 위치 조회
    @GetMapping("/location/{location-id}")
    public ResponseEntity getLocation(@PathVariable("location-id") @Positive long locationId) {
        Location location = locationService.findLocation(locationId);

        return new ResponseEntity<>(locationMapper.locationToLocationResponseDto(location), HttpStatus.OK);
    }

    //사용자별 지정 위치 조회
    @GetMapping("/myLocations")
    public ResponseEntity getMemberLocations(@RequestParam(value = "page") int page,
                                             @RequestParam(value = "size") int size) {
        List<Location> locationList = locationService.getMemberLocations();
        Page<Location> locationPage = new Pagination<Location>().MadePagination(locationList, page, size);

        return new ResponseEntity<>(
                new MultiResponseDto<>(locationPage.getContent(), locationPage), HttpStatus.OK);

    }

    //모든 지정 위치 조회
    @GetMapping("/locations")
    public ResponseEntity getLocations() {
        List<Location> locations = locationService.findLocations();
        List<LocationDto.Response> response = locationMapper.locationsToLocationResponseDtos(locations);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //type, category, locationId별 해당되는 boardlist 조회
    @GetMapping("/distances/{location-id}")
    public ResponseEntity getDistances(@RequestParam(value = "range") double range,
                                       @RequestParam(value = "category") String category,
                                       @PathVariable("location-id") @Positive long locationId,
                                       @RequestParam(value = "sortBy") String sortBy,
                                       @RequestParam(value = "page") int page,
                                       @RequestParam(value = "size") int size) {

        List<Board> boardList = locationService.getDistances(range, category, locationId);

        if (sortBy.equals("time")) {
            boardList = boardList.stream().sorted(Comparator.comparing(Board::getBoardId).reversed()).collect(Collectors.toList());
            Page<Board> boardPage = new Pagination<Board>().MadePagination(boardList, page, size);

            return new ResponseEntity<>(
                    new MultiResponseDto<>(boardPage.getContent(), boardPage), HttpStatus.OK);
        } else if (sortBy.equals("distance")) {
            Page<Board> boardPage = new Pagination<Board>().MadePagination(boardList, page, size);

            return new ResponseEntity<>(
                    new MultiResponseDto<>(boardPage.getContent(), boardPage), HttpStatus.OK);
        } else
            throw new BusinessLogicException(ExceptionCode.SORTBY_NOT_FOUND);

    }

    //사용자별 지정 위치 삭제
    @DeleteMapping("/location/{location-id}")
    public ResponseEntity deleteLocation(@PathVariable("location-id") @Positive long locationId) {
        locationService.deleteLocation(locationId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
