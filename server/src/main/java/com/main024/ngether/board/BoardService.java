package com.main024.ngether.board;

import com.main024.ngether.chat.chatEntity.ChatRoom;
import com.main024.ngether.chat.chatRepository.ChatRoomRepository;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.likes.LikeRepository;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberRepository;
import com.main024.ngether.member.MemberService;
import lombok.RequiredArgsConstructor;
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
        returnBoard.setCreate_date(board.getCreate_date());
        returnBoard.setTitle(board.getTitle());
        if(board.getMaxNum() >= 2) {
            returnBoard.setMaxNum(board.getMaxNum());
        }
        else throw new BusinessLogicException(ExceptionCode.NOT_ALLOW);
        returnBoard.setCurNum(1);
        returnBoard.setAddress(board.getAddress());
        returnBoard.setLongitude(board.getLongitude());
        returnBoard.setLatitude(board.getLatitude());
        returnBoard.setDeadLine(board.getDeadLine());
        returnBoard.setProductsLink(board.getProductsLink());
        member.addBoard(returnBoard);
        return boardRepository.save(returnBoard);
    }


    public Board findBoard(Long board_Id) {
        Board board = findVerifiedBoardByQuery(board_Id);
        return board;
    }

    public List<Board> findBoardsByCategory(String category) {
        List<Board> boardList = boardRepository.findByCategory(category).get();
        for(int i = 0; i <boardList.size(); i++){
            if(boardList.get(i).getDeadLine().equals(LocalDate.now())){
                boardList.get(i).setBoardStatus(Board.BoardStatus.BOARD_TERM_EXPIRE);
                boardRepository.save(boardList.get(i));
            }
        }
        return boardList;

    }


    public Board updateBoard(Board board) {
        if (memberService.getLoginMember() == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        } else if (Objects.equals(findVerifiedBoard(board.getBoardId()).getMember().getMemberId(), memberService.getLoginMember().getMemberId())) {

            Board findBoard = findVerifiedBoard(board.getBoardId());
            findBoard.setModifiedAt(LocalDateTime.now());
            Optional.ofNullable(board.getTitle())
                    .ifPresent(findBoard::setTitle);
            Optional.ofNullable(board.getProductsLink())
                    .ifPresent(findBoard::setProductsLink);
            Optional.ofNullable(board.getAddress())
                    .ifPresent(findBoard::setAddress);
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
                ChatRoom chatRoom = chatRoomRepository.findByRoomId(findBoard.getBoardId());
                chatRoom.setMaxNum(findBoard.getMaxNum());
                chatRoomRepository.save(chatRoom);
            }
            else throw new BusinessLogicException(ExceptionCode.NOT_ALLOW);

            return boardRepository.save(findBoard);
        } else throw new BusinessLogicException(ExceptionCode.PERMISSION_DENIED);


    }

    public void deleteBoard(Long boardId) {
        if (memberService.getLoginMember() == null)
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        Board board = findVerifiedBoard(boardId);
        if (board.getMember().getMemberId() == memberService.getLoginMember().getMemberId())
            boardRepository.delete(board);
        else throw new BusinessLogicException(ExceptionCode.PERMISSION_DENIED);
    }


    public Board findVerifiedBoard(long boardId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        Board findBoard =
                optionalBoard.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));

        return findBoard;
    }


    private Board findVerifiedBoardByQuery(Long boardId) {
        Optional<Board> optionalBoard = boardRepository.findByBoardId(boardId);
        Board findBoard =
                optionalBoard.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));

        return findBoard;

    }

    public List<Board> findBoards() {
        return boardRepository.findAll();
    }


    //타입으로 나눠서 질문 검색 기능 구현 1 : 제목, 2 : 내용, 3 : 작성자 이름
    public List<Board> searchBoard(String type, String keyword) {
        switch (type) {
            case "1": {
                Optional<List<Board>> optionalBoards = boardRepository.findByTitleContaining(keyword);
                return optionalBoards.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
            }
            case "2": {
                Optional<List<Board>> optionalBoards = boardRepository.findByContentContaining(keyword);
                return optionalBoards.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
            }
            case "3": {
                Optional<List<Board>> optionalBoards = boardRepository.findByMemberMemberId(memberService.findByNiceName(keyword).getMemberId());
                return optionalBoards.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
            }
        }

        return null;
    }

}