package com.main024.ngether.location;

import com.main024.ngether.board.Board;
import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.chat.chatRepository.ChatRoomRepository;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.member.MemberService;
import com.main024.ngether.response.Pagination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LocationService {
    private final LocationRepository locationRepository;
    private final BoardRepository boardRepository;

    private final DistanceRepository distanceRepository;
    private final MemberService memberService;
    private final ChatRoomRepository chatRoomRepository;

    public LocationService(LocationRepository locationRepository,
                           BoardRepository boardRepository,
                           DistanceRepository distanceRepository,
                           MemberService memberService,
                           ChatRoomRepository chatRoomRepository) {
        this.locationRepository = locationRepository;
        this.boardRepository = boardRepository;
        this.distanceRepository = distanceRepository;
        this.memberService = memberService;
        this.chatRoomRepository = chatRoomRepository;
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
        Optional.ofNullable(location.getLocationName())
                .ifPresent(locationName -> findLocation.setLocationName(locationName));


        return locationRepository.save(findLocation);
    }

    public Location findLocation(long locationId) {
        return findVerifiedLocation(locationId);
    }


    public List<Location> findLocations() {
        return locationRepository.findAll();
    }


    public void deleteLocation(long locationId) {
        Location findLocation = findVerifiedLocation(locationId);

        locationRepository.delete(findLocation);
    }


    public Distance createDistance(Location location, Board board) {
        String category = board.getCategory();
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
            if (category.equals("product")) {
                if (result < 0.5) {
                    distance.setDistanceType(Distance.DistanceType.DISTANCE_500);
                } else if (result < 1) {
                    distance.setDistanceType(Distance.DistanceType.DISTANCE_1000);
                } else if (result < 1.5) {
                    distance.setDistanceType(Distance.DistanceType.DISTANCE_1500);
                } else
                    distance.setDistanceType(Distance.DistanceType.DISTANCE_EXCESS_RANGE);
            }
            if (category.equals("delivery")) {
                if (result < 0.2) {
                    distance.setDistanceType(Distance.DistanceType.DISTANCE_200);
                } else if (result < 0.4) {
                    distance.setDistanceType(Distance.DistanceType.DISTANCE_400);
                } else if (result < 0.6) {
                    distance.setDistanceType(Distance.DistanceType.DISTANCE_600);
                } else
                    distance.setDistanceType(Distance.DistanceType.DISTANCE_EXCESS_RANGE);
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

    public Page<Board> createCurDistance(LocationDto.DistanceCal distanceCal, double type, String category, int page,int size,String sortBy) {
        List<Board> boardList = boardRepository.findByCategory(category).get();
        for(int i = 0; i <boardList.size(); i++){
            if(boardList.get(i).getDeadLine().compareTo(LocalDate.now()) == 0){
                boardList.get(i).setBoardStatus(Board.BoardStatus.BOARD_TERM_EXPIRE);
                boardRepository.save(boardList.get(i));
                if(chatRoomRepository.findById(boardList.get(i).getBoardId()).get() != null) {
                    chatRoomRepository.delete(chatRoomRepository.findById(boardList.get(i).getBoardId()).get());
                }
            }
        }
        String address1 = distanceCal.getAddress();
        double lat1 = Double.parseDouble(distanceCal.getLatitude());
        double lon1 = Double.parseDouble(distanceCal.getLongitude());
        List<Board> resultBoardList = new ArrayList<>();
        HashMap<Double, Board> map = new HashMap<>();
        for (int i = 0; i < boardList.size(); i++) {
            String address2 = boardList.get(i).getAddress();
            String[] ArraysStr1 = address1.split(" ");
            String[] ArraysStr2 = address2.split(" ");

            if (ArraysStr1[0].equals(ArraysStr2[0]) && ArraysStr1[1].equals(ArraysStr2[1])) {
                double lat2 = Double.parseDouble(boardList.get(i).getLatitude());
                double lon2 = Double.parseDouble(boardList.get(i).getLongitude());
                double result = distance(lat1, lon1, lat2, lon2, "kilometer");
                if (result < type) {
                    resultBoardList.add(boardList.get(i));
                    map.put(result, boardList.get(i));
                }
            }
        }

        if(sortBy.equals("time")){
            resultBoardList = resultBoardList.stream().sorted(Comparator.comparing(Board::getBoardId).reversed()).collect(Collectors.toList());
            Page<Board> boardPage = new Pagination<Board>().MadePagination(resultBoardList, page, size);
            return boardPage;
        }
        else if(sortBy.equals("distance")){
            Map<Double, Board> sortedMap = new TreeMap<>(map);
            List<Board> mapBoardList = new ArrayList<>(sortedMap.values());
            Page<Board> boardPage = new Pagination<Board>().MadePagination(mapBoardList, page, size);
            return boardPage;
        }
        else
            throw new BusinessLogicException(ExceptionCode.SORTBY_NOT_FOUND);
    }

    public List<Board> getDistances(double range, String category, long locationId){
        List<Distance> distanceList = new ArrayList<>();

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
        for(int i = 0; i <boardList.size(); i++){
            if(boardList.get(i).getDeadLine().compareTo(LocalDate.now()) == 0){
                boardList.get(i).setBoardStatus(Board.BoardStatus.BOARD_TERM_EXPIRE);
                boardRepository.save(boardList.get(i));
                if(chatRoomRepository.findById(boardList.get(i).getBoardId()).get() != null) {
                    chatRoomRepository.delete(chatRoomRepository.findById(boardList.get(i).getBoardId()).get());
                }
            }
        }
        return boardList;
    }

    public Location findVerifiedLocation(long locationId) {
        Optional<Location> optionalLocation =
                locationRepository.findById(locationId);
        Location findLocation =
                optionalLocation.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.LOCATION_NOT_FOUND));
        return findLocation;
    }

    public List<Location> getMemberLocations(){
        return locationRepository.findByMemberMemberId(memberService.getLoginMember().getMemberId()).get();
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
