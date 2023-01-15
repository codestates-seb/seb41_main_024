package com.main024.ngether.location;

import com.main024.ngether.member.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/locations")
@Validated
public class LocationController {
    private final LocationService locationService;
    private final LocationMapper locationMapper;
    private final MemberService memberService;


    public LocationController(LocationService locationService,
                              LocationMapper locationMapper,
                              MemberService memberService){
        this.locationService = locationService;
        this.locationMapper = locationMapper;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity postLocation(@Valid @RequestBody LocationDto.Post locationPostDto) {
        Location location = locationService.createLocation(locationMapper.locationPostDtoToLocation(memberService, locationPostDto));

        return new ResponseEntity<>(locationMapper.locationToLocationResponseDto(location), HttpStatus.CREATED);
    }

    @PostMapping("/{location-id}")
    public ResponseEntity postDistance(@PathVariable("location-id") @Positive long locationId,
                                        @Valid @RequestBody LocationDto.DistanceCal distanceCal) {
        distanceCal.setLocationId(locationId);
        Distance distance = locationService.createDistance(locationId, distanceCal.getBoardId());

        return new ResponseEntity<>(locationMapper.locationToLocationDistance(distance), HttpStatus.OK);
    }


    @PatchMapping("/{location-id}")
    public ResponseEntity patchLocation(@PathVariable("location-id") @Positive long locationId,
                                        @Valid @RequestBody LocationDto.Patch locationPatchDto) {
        locationPatchDto.setLocationId(locationId);
        Location location = locationService.updateLocation(locationMapper.locationPatchDtoToLocation(locationPatchDto));

        return new ResponseEntity<>(locationMapper.locationToLocationResponseDto(location), HttpStatus.OK);
    }


    @GetMapping("/{location-id}")
    public ResponseEntity getLocation(@PathVariable("location-id") @Positive long locationId) {
        Location location = locationService.findLocation(locationId);

        return new ResponseEntity<>(locationMapper.locationToLocationResponseDto(location), HttpStatus.OK);
    }



    @GetMapping
    public ResponseEntity getLocations() {
        List<Location> locations = locationService.findLocations();

        List<LocationDto.Response> response =
                locations.stream()
                        .map(location -> locationMapper.locationToLocationResponseDto(location))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    @DeleteMapping("/{location-id}")
    public ResponseEntity deleteLocation(@PathVariable("location-id") @Positive long locationId) {
        locationService.deleteLocation(locationId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
