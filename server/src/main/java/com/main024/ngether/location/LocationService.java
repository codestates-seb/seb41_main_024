package com.main024.ngether.location;

import com.main024.ngether.board.Board;
import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.board.BoardService;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.member.MemberService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LocationService {
    private final LocationRepository locationRepository;
    private final BoardRepository boardRepository;

    private final DistanceRepository distanceRepository;
    private final MemberService memberService;

    public LocationService(LocationRepository locationRepository,
                           BoardRepository boardRepository,
                           DistanceRepository distanceRepository,
                           MemberService memberService) {
        this.locationRepository = locationRepository;
        this.boardRepository = boardRepository;
        this.distanceRepository = distanceRepository;
        this.memberService = memberService;
    }

    public Location createLocation(Location location) {
        location.setMember(memberService.getLoginMember());
        List<Board> boardList = boardRepository.findAll();
        Location location1 = locationRepository.save(location);
        for (int i = 0; i < boardList.size(); i++) {
            createDistance(location, boardList.get(i));
        }

        return location1;
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

    public Distance createDistance(Location location, Board board) {
        String address1 = location.getAddress();
        String address2 = board.getAddress();

        String[] ArraysStr1 = address1.split(" ");
        String[] ArraysStr2 = address2.split(" ");

        if (ArraysStr1[0].equals(ArraysStr2[0]) && ArraysStr1[1].equals(ArraysStr2[1])) {
            double lat1 = Double.parseDouble(location.getLatitude());
            double lon1 = Double.parseDouble(location.getLongitude());
            double lat2 = Double.parseDouble(board.getLatitude());
            double lon2 = Double.parseDouble(board.getLongitude());

            double result = distance(lat1, lon1, lat2, lon2, "kilometer");
            Distance distance = new Distance();
            if (result < 1) {
                distance.setDistanceType(Distance.DistanceType.DISTANCE_ONE);
            } else if (result < 2) {
                distance.setDistanceType(Distance.DistanceType.DISTANCE_TWO);
            } else if (result < 3) {
                distance.setDistanceType(Distance.DistanceType.DISTANCE_THREE);
            }
            String result_str = String.valueOf(result);
            distance.setResult(result_str);
            distance.setLocation(location);
            distance.setBoard(board);
            distanceRepository.save(distance);

            return distance;
        }

        return null;
    }

    public List<Board> createDistance2(LocationDto.DistanceCal distanceCal, double type) {
        List<Board> boardList = boardRepository.findAll();
        String address1 = distanceCal.getAddress();
        double lat1 = Double.parseDouble(distanceCal.getLatitude());
        double lon1 = Double.parseDouble(distanceCal.getLongitude());
        List<Board> boardList1 = new ArrayList<>();
        for (int i = 0; i < boardList.size(); i++) {
            String address2 = boardList.get(i).getAddress();
            String[] ArraysStr1 = address1.split(" ");
            String[] ArraysStr2 = address2.split(" ");

            if (ArraysStr1[0].equals(ArraysStr2[0]) && ArraysStr1[1].equals(ArraysStr2[1])){
                double lat2 = Double.parseDouble(boardList.get(i).getLatitude());
                double lon2 = Double.parseDouble(boardList.get(i).getLongitude());
                double result = distance(lat1, lon1, lat2, lon2, "kilometer");
                if (result < type) {

                    boardList1.add(boardList.get(i));
                }

            }

        }
        return boardList1;
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
        } else if (unit == "meter") {
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
