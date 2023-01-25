package com.main024.ngether.board;

import com.main024.ngether.chat.chatEntity.ChatRoom;
import com.main024.ngether.chat.chatRepository.ChatRoomRepository;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.likes.LikeRepository;
import com.main024.ngether.location.Location;
import com.main024.ngether.location.LocationRepository;
import com.main024.ngether.location.LocationService;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberRepository;
import com.main024.ngether.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final LikeRepository likeRepository;
    private final ChatRoomRepository chatRoomRepository;

    private final LocationRepository locationRepository;
    private final LocationService locationService;


    public Board createBoard(Board board) {
        Board returnBoard = new Board();
        Member member = memberService.getLoginMember(); //로그인 한 상태가 아닐 시 에러 메시지 출력
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        }
        returnBoard.setLikeCount(0);
        returnBoard.setCategory(board.getCategory());
        returnBoard.setPrice(board.getPrice());
        returnBoard.setMember(member);
        returnBoard.setContent(board.getContent());
        returnBoard.setCreateDate(board.getCreateDate());
        returnBoard.setTitle(board.getTitle());
        if(board.getMaxNum() >= 2) {
            returnBoard.setMaxNum(board.getMaxNum());
        }
        else throw new BusinessLogicException(ExceptionCode.NOT_ALLOW);
        returnBoard.setAddress(board.getAddress());
        returnBoard.setLongitude(board.getLongitude());
        returnBoard.setLatitude(board.getLatitude());
        returnBoard.setDeadLine(board.getDeadLine());
        returnBoard.setProductsLink(board.getProductsLink());
        returnBoard.setBoardStatus(Board.BoardStatus.BOARD_NOT_COMPLETE);
        returnBoard.setCurNum(0);
        member.addBoard(returnBoard);
        Board board1 = boardRepository.save(returnBoard);

        List<Location> locationList = locationRepository.findAll();
        for(int i=0; i< locationList.size(); i++){
            locationService.createDistance(locationList.get(i), board1);
        }
        return board1;
    }


    public Board findBoard(Long board_Id) {
        Board board = findVerifiedBoardByQuery(board_Id);
        return board;
    }

    public List<Board> findBoardsByCategory(String category) {
        List<Board> boardList = boardRepository.findByCategory(category).get();
        for(int i = 0; i <boardList.size(); i++){
            if(boardList.get(i).getDeadLine().compareTo(LocalDate.now()) == 0){
                boardList.get(i).setBoardStatus(Board.BoardStatus.BOARD_TERM_EXPIRE);
                boardRepository.save(boardList.get(i));
                chatRoomRepository.delete(chatRoomRepository.findById(boardList.get(i).getBoardId()).get());
            }
        }
        return boardList;

    }


    public Board updateBoard(Board board) {
        if (memberService.getLoginMember() == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        } else if (Objects.equals(findVerifiedBoard(board.getBoardId()).getMember().getMemberId(), memberService.getLoginMember().getMemberId())) {

            Board findBoard = findVerifiedBoard(board.getBoardId());
            ChatRoom chatRoom = chatRoomRepository.findByRoomId(board.getBoardId());
            findBoard.setModifiedAt(LocalDateTime.now());
            Optional.ofNullable(board.getTitle())
                    .ifPresent(findBoard::setTitle);
            Optional.ofNullable(board.getTitle())
                    .ifPresent(chatRoom::setRoomName);
            Optional.ofNullable(board.getProductsLink())
                    .ifPresent(findBoard::setProductsLink);
            Optional.ofNullable(board.getAddress())
                    .ifPresent(findBoard::setAddress);
            Optional.ofNullable(board.getAddress())
                    .ifPresent(chatRoom::setAddress);
            Optional.ofNullable(board.getLatitude())
                    .ifPresent(findBoard::setLatitude);
            Optional.ofNullable(board.getLongitude())
                    .ifPresent(findBoard::setLongitude);
            Optional.ofNullable(board.getDeadLine())
                    .ifPresent(findBoard::setDeadLine);
            Optional.ofNullable(board.getContent())
                    .ifPresent(findBoard::setContent);
            Optional.ofNullable(board.getPrice())
                    .ifPresent(findBoard::setPrice);
            if(board.getMaxNum() >= 2) {
                Optional.ofNullable(board.getMaxNum())
                        .ifPresent(findBoard::setMaxNum);
                chatRoom.setMaxNum(findBoard.getMaxNum());
            }
            else throw new BusinessLogicException(ExceptionCode.NOT_ALLOW);
            chatRoomRepository.save(chatRoom);
            return boardRepository.save(findBoard);
        } else throw new BusinessLogicException(ExceptionCode.PERMISSION_DENIED);


    }

    public void deleteBoard(Long boardId) {
        Board board = findVerifiedBoard(boardId);
        Member member = memberService.getLoginMember();
        if (member == null){
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);}
        else if(board.getBoardStatus().equals(Board.BoardStatus.BOARD_NOT_DELETE)){
            throw new BusinessLogicException(ExceptionCode.BOARD_NOT_DELETE);
        }
        else if(Objects.equals(board.getMember().getMemberId(), memberService.getLoginMember().getMemberId())){
            boardRepository.delete(board);
        }
        else throw new BusinessLogicException(ExceptionCode.PERMISSION_DENIED);
    }


    public Board findVerifiedBoard(long boardId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        Board findBoard =
                optionalBoard.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));

        return findBoard;
    }


    public Board findVerifiedBoardByQuery(Long boardId) {
        Optional<Board> optionalBoard = boardRepository.findByBoardId(boardId);
        Board findBoard =
                optionalBoard.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));

        return findBoard;

    }

    public Page<Board> findBoards(int page, int size) {
        return boardRepository.findAll(PageRequest.of(page, size,
                Sort.by("createDate").descending()));
    }

    public Page<Board> findCompleteMySharing(int page, int size){
        return boardRepository.findByBoardStatusAndMemberMemberId
                (Board.BoardStatus.BOARD_COMPLETE, memberService.getLoginMember().getMemberId(), PageRequest.of(page-1, size,
                        Sort.by("createDate").descending()));

    }

    //타입으로 나눠서 질문 검색 기능 구현 1 : 제목, 2 : 내용, 3 : 작성자 이름
    public Page<Board> searchBoard(String type, String keyword, int page, int size) {
        switch (type) {
            case "1": {
                Page<Board> boardList = boardRepository.findByTitleContaining
                        (keyword, PageRequest.of(page, size,
                                Sort.by("boardId").descending()));
                if(boardList.isEmpty())
                    throw new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND);
                return boardList;
            }
            case "2": {
                Page<Board> boardList = boardRepository.findByContentContaining
                        (keyword, PageRequest.of(page, size,
                                Sort.by("boardId").descending()));
                if(boardList.isEmpty())
                    throw new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND);
                return boardList;
            }
            case "3": {
                Page<Board> boardList = boardRepository.findByMemberMemberId
                        (memberService.findByNiceName(keyword).getMemberId(), PageRequest.of(page, size,
                                Sort.by("boardId").descending()));
                if(boardList.isEmpty())
                    throw new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND);
                return boardList;
            }
            case "4": {
                Page<Board> boardList = boardRepository.findByAddressContaining
                        (keyword, PageRequest.of(page, 10,
                                Sort.by("boardId").descending()));
                if(boardList.isEmpty())
                    throw new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND);
                return boardList;
            }
        }

        return null;
    }

}