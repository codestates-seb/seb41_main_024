package com.main024.ngether.board;

import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.likes.Like;
import com.main024.ngether.likes.LikeRepository;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberRepository;
import com.main024.ngether.member.MemberService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BoardService {
    private final BoardRepository boardRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final LikeRepository likeRepository;


    public BoardService(BoardRepository boardRepository, MemberService memberService, LikeRepository likeRepository, MemberRepository memberRepository) {
        this.boardRepository = boardRepository;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
        this.likeRepository = likeRepository;
    }

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
            member.addBoard(returnBoard);
            return boardRepository.save(board);
        }



    public Board findBoard(Long board_Id) {
        Board board = findVerifiedBoardByQuery(board_Id);
        return board;
    }

    public List<Board> findBoardsByCategory(String category){

        return boardRepository.findByCategory(category).get();

    }


    public Board updateBoard(Board board) {

        Board findBoard = findVerifiedBoard(board.getBoardId());
        findBoard.setModifiedAt(LocalDateTime.now());
        Optional.ofNullable(board.getTitle())
                .ifPresent(findBoard::setTitle);
        Optional.ofNullable(board.getContent())
                .ifPresent(findBoard::setContent);
        Optional.ofNullable(board.getPrice())
                .ifPresent(findBoard::setPrice);


        return boardRepository.save(findBoard);

    }

    public void deleteBoard(Long boardId) {
        Board board = findVerifiedBoard(boardId);

        boardRepository.delete(board);
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

    public List<Board> findBoardsByLike(){
        Member member = memberService.getLoginMember(); //로그인 한 상태가 아닐 시 에러 메시지 출력
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        }
        List<Board> boards = new ArrayList<>();
        for(int i = 0; i < likeRepository.findLikeByMemberMemberId(member.getMemberId()).get().size(); i++){
            boards.add(likeRepository.findLikeByMemberMemberId(member.getMemberId()).get().get(i).getBoard());
        }

        return boards;

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