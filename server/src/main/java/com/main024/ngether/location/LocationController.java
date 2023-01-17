package com.main024.ngether.location;

import com.main024.ngether.board.Board;
import com.main024.ngether.member.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
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

    @PostMapping("/location")
    public ResponseEntity postLocation(@Valid @RequestBody LocationDto.Post locationPostDto) {
        Location location = locationService.createLocation(locationMapper.locationPostDtoToLocation(memberService, locationPostDto));

        return new ResponseEntity<>(locationMapper.locationToLocationResponseDto(location), HttpStatus.CREATED);
    }

    @PostMapping("/distance")
    public ResponseEntity postDistance(@Valid @RequestBody LocationDto.DistanceCal distanceCal,
                                       @RequestParam(value = "type") long type) {
        List<Board> boardList = locationService.createCurDistance(distanceCal, type);

        return new ResponseEntity<>(boardList, HttpStatus.OK);
    }


    @PatchMapping("/location/{location-id}")
    public ResponseEntity patchLocation(@PathVariable("location-id") @Positive long locationId,
                                        @Valid @RequestBody LocationDto.Patch locationPatchDto) {
        locationPatchDto.setLocationId(locationId);
        Location location = locationService.updateLocation(locationMapper.locationPatchDtoToLocation(locationPatchDto));

        return new ResponseEntity<>(locationMapper.locationToLocationResponseDto(location), HttpStatus.OK);
    }


    @GetMapping("/location/{location-id}")
    public ResponseEntity getLocation(@PathVariable("location-id") @Positive long locationId) {
        Location location = locationService.findLocation(locationId);

        return new ResponseEntity<>(locationMapper.locationToLocationResponseDto(location), HttpStatus.OK);
    }


    @GetMapping("/locations")
    public ResponseEntity getLocations() {
        List<Location> locations = locationService.findLocations();

        List<LocationDto.Response> response =
                locations.stream()
                        .map(location -> locationMapper.locationToLocationResponseDto(location))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/distances/{location-id}")
    public ResponseEntity getDistances(@RequestParam(value = "type") double type,
                                       @RequestParam(value = "category") String category,
                                       @PathVariable("location-id") @Positive long locationId) {
        List<Distance> distanceList = new ArrayList<>();
        if (type == 0.2)
            distanceList = distanceRepository.findByDistanceTypeAndLocationLocationIdAndBoardCategory(Distance.DistanceType.DISTANCE_200, locationId, category).get();
        else if (type == 0.4)
            distanceList = distanceRepository.findByDistanceTypeAndLocationLocationIdAndBoardCategory(Distance.DistanceType.DISTANCE_400, locationId, category).get();
        else if (type == 0.6)
            distanceList = distanceRepository.findByDistanceTypeAndLocationLocationIdAndBoardCategory(Distance.DistanceType.DISTANCE_600, locationId, category).get();
        else if (type == 0.5)
            distanceList = distanceRepository.findByDistanceTypeAndLocationLocationIdAndBoardCategory(Distance.DistanceType.DISTANCE_500, locationId, category).get();
        else if (type == 1)
            distanceList = distanceRepository.findByDistanceTypeAndLocationLocationIdAndBoardCategory(Distance.DistanceType.DISTANCE_1000, locationId, category).get();
        else if (type == 1.5)
            distanceList = distanceRepository.findByDistanceTypeAndLocationLocationIdAndBoardCategory(Distance.DistanceType.DISTANCE_1500, locationId, category).get();
        else
            distanceList = distanceRepository.findByDistanceTypeAndLocationLocationIdAndBoardCategory(Distance.DistanceType.DISTANCE_EXCESS_RANGE, locationId, category).get();

        List<Board> boardList = new ArrayList<>();
        for (int i = 0; i < distanceList.size(); i++) {
            boardList.add(distanceList.get(i).getBoard());
        }

        return new ResponseEntity<>(boardList, HttpStatus.OK);
    }

    @DeleteMapping("/location/{location-id}")
    public ResponseEntity deleteLocation(@PathVariable("location-id") @Positive long locationId) {
        locationService.deleteLocation(locationId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
