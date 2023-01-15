package com.main024.ngether.location;

import com.main024.ngether.board.Board;
import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.board.BoardService;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {
    private final LocationRepository locationRepository;
    private final BoardRepository boardRepository;
    private final BoardService boardService;

    public LocationService(LocationRepository locationRepository,
                           BoardRepository boardRepository,
                           BoardService boardService){
        this.locationRepository = locationRepository;
        this.boardRepository = boardRepository;
        this.boardService = boardService;
    }

    public Location createLocation(Location location) {

        return locationRepository.save(location);
    }

    public Location updateLocation(Location location) {
        Location findLocation = findVerifiedLocation(location.getLocationId());

        Optional.ofNullable(location.getAddress())
                .ifPresent(address -> findLocation.setAddress(address));
        Optional.ofNullable(location.getLatitude())
                .ifPresent(latitude -> findLocation.setLatitude(latitude));
        Optional.ofNullable(location.getLongitude())
                .ifPresent(longitude -> findLocation.setLongitude(longitude));


        return locationRepository.save(findLocation);
    }

    public Location findLocation(long locationId) {
        return findVerifiedLocation(locationId);
    }


    public List<Location> findLocations() {
        return (List<Location>) locationRepository.findAll();
    }


    public void deleteLocation(long locationId) {
        Location findLocation = findVerifiedLocation(locationId);

        locationRepository.delete(findLocation);
    }

    public Distance createDistance(Long locationId, Long boardId){
        Location location = findVerifiedLocation(locationId);
        Board board = boardService.findVerifiedBoardByQuery(boardId);
        double lat1 = Double.parseDouble(location.getLatitude());
        double lon1 = Double.parseDouble(location.getLongitude());
        double lat2 = Double.parseDouble(board.getLatitude());
        double lon2 = Double.parseDouble(board.getLongitude());

        String result = String.valueOf(distance(lat1, lon1, lat2, lon2, "meter"));
        Distance distance = new Distance();
        distance.setResult(result);
        return distance;
    }

    public Location findVerifiedLocation(long locationId) {
        Optional<Location> optionalLocation =
                locationRepository.findById(locationId);
        Location findLocation =
                optionalLocation.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.LOCATION_NOT_FOUND));
        return findLocation;
    }

    private static double distance(double lat1, double lon1, double lat2, double lon2, String unit) {

        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;

        if (unit == "kilometer") {
            dist = dist * 1.609344;
        } else if(unit == "meter"){
            dist = dist * 1609.344;
        }

        return (dist);
    }


    // This function converts decimal degrees to radians
    private static double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }

    // This function converts radians to decimal degrees
    private static double rad2deg(double rad) {
        return (rad * 180 / Math.PI);
    }

}
