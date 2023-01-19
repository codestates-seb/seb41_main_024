package com.main024.ngether.location;

import com.main024.ngether.board.Board;
import com.main024.ngether.board.response.MultiResponseDto;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.member.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
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


    public LocationController(LocationService locationService,
                              LocationMapper locationMapper,
                              MemberService memberService,
                              DistanceRepository distanceRepository) {
        this.locationService = locationService;
        this.locationMapper = locationMapper;
        this.memberService = memberService;
        this.distanceRepository = distanceRepository;
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
                                       @RequestParam(value = "sortBy") String sortBy) {
        int page = 1;
        Page<Board> pageBoards = locationService.createCurDistance(distanceCal, range, category, page - 1, sortBy);

        List<Board> boardList = pageBoards.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardList, pageBoards), HttpStatus.OK);
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


    //모든 지정 위치 조회
    @GetMapping("/locations")
    public ResponseEntity getLocations() {
        List<Location> locations = locationService.findLocations();

        List<LocationDto.Response> response =
                locations.stream()
                        .map(location -> locationMapper.locationToLocationResponseDto(location))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //type, category, locationId별 해당되는 boardlist 조회
    @GetMapping("/distances/{location-id}")
    public ResponseEntity getDistances(@RequestParam(value = "range") double range,
                                       @RequestParam(value = "category") String category,
                                       @PathVariable("location-id") @Positive long locationId,
                                       @RequestParam(value = "sortBy") String sortBy) {
        List<Distance> distanceList;
        if (range == 0.2)
            distanceList = distanceRepository.findByDistanceTypeAndLocationLocationIdAndBoardCategory
                    (Distance.DistanceType.DISTANCE_200, locationId, category, Sort.by("result")).get();
        else if (range == 0.4)
            distanceList = distanceRepository.findByDistanceTypeAndLocationLocationIdAndBoardCategory
                    (Distance.DistanceType.DISTANCE_400, locationId, category, Sort.by("result")).get();
        else if (range == 0.6)
            distanceList = distanceRepository.findByDistanceTypeAndLocationLocationIdAndBoardCategory
                    (Distance.DistanceType.DISTANCE_600, locationId, category, Sort.by("result")).get();
        else if (range == 0.5)
            distanceList = distanceRepository.findByDistanceTypeAndLocationLocationIdAndBoardCategory
                    (Distance.DistanceType.DISTANCE_500, locationId, category, Sort.by("result")).get();
        else if (range == 1)
            distanceList = distanceRepository.findByDistanceTypeAndLocationLocationIdAndBoardCategory
                    (Distance.DistanceType.DISTANCE_1000, locationId, category, Sort.by("result")).get();
        else if (range == 1.5)
            distanceList = distanceRepository.findByDistanceTypeAndLocationLocationIdAndBoardCategory
                    (Distance.DistanceType.DISTANCE_1500, locationId, category, Sort.by("result")).get();
        else
            distanceList = distanceRepository.findByDistanceTypeAndLocationLocationIdAndBoardCategory
                    (Distance.DistanceType.DISTANCE_EXCESS_RANGE, locationId, category, Sort.by("result")).get();

        List<Board> boardList = new ArrayList<>();
        for (int i = 0; i < distanceList.size(); i++) {
            boardList.add(distanceList.get(i).getBoard());
        }

        int page = 1;
        if (sortBy.equals("time")) {
            boardList = boardList.stream().sorted(Comparator.comparing(Board::getBoardId).reversed()).collect(Collectors.toList());
            PageRequest pageRequest = PageRequest.of(page - 1, 10);
            int start = (int) pageRequest.getOffset();
            int end = Math.min((start + pageRequest.getPageSize()), boardList.size());
            Page<Board> boardPage = new PageImpl<>(boardList.subList(start, end), pageRequest, boardList.size());
            List<Board> boardList1 = boardPage.getContent();

            return new ResponseEntity<>(
                    new MultiResponseDto<>(boardList1, boardPage), HttpStatus.OK);
        }

        else if(sortBy.equals("distance")){
            PageRequest pageRequest = PageRequest.of(page-1, 10);
            int start = (int) pageRequest.getOffset();
            int end = Math.min((start + pageRequest.getPageSize()), boardList.size());
            Page<Board> boardPage = new PageImpl<>(boardList.subList(start, end), pageRequest, boardList.size());
            List<Board> boardList1 = boardPage.getContent();

            return new ResponseEntity<>(
                    new MultiResponseDto<>(boardList1, boardPage), HttpStatus.OK);
        }
        else
            throw new BusinessLogicException(ExceptionCode.SORTBY_NOT_FOUND);

    }

    //사용자별 지정 위치 삭제
    @DeleteMapping("/location/{location-id}")
    public ResponseEntity deleteLocation(@PathVariable("location-id") @Positive long locationId) {
        locationService.deleteLocation(locationId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
