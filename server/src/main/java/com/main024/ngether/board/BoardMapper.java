package com.main024.ngether.board;

import com.main024.ngether.likes.Like;
import com.main024.ngether.member.MemberService;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BoardMapper {

    default BoardDto.Response boardToBoardResponse(Board board) {
        BoardDto.Response response = new BoardDto.Response();

        response.setBoardId(board.getBoardId());
        response.setMemberId(board.getMember().getMemberId());
        response.setNickname((board.getMember().getNickName()));
        response.setTitle(board.getTitle());
        response.setCreate_date(board.getCreate_date());
        response.setContent(board.getContent());
        response.setLikeCount(board.getLikeCount());
        response.setCategory(board.getCategory());
        response.setPrice(board.getPrice());
        response.setMaxNum(board.getMaxNum());
        response.setCurNum(board.getCurNum());
        response.setAddress(board.getAddress());
        response.setLatitude(board.getLatitude());
        response.setLongitude(board.getLongitude());
        response.setDeadLine(board.getDeadLine());
        response.setProductsLink(board.getProductsLink());
        response.setBoardStatus(board.getBoardStatus());

        return response;
    }

    default BoardDto.LikeResponse boardLikeToBoardResponse(Like like) {
        BoardDto.LikeResponse response = new BoardDto.LikeResponse();

        response.setLikeId(like.getLikeId());
        response.setBoardId(like.getBoard().getBoardId());
        response.setMemberId(like.getMember().getMemberId());
        response.setStatus(like.isStatus());

        return response;
    }

    default Board boardPatchToBoard(BoardDto.Patch requestBody) {
        Board board = new Board();

        board.setTitle(requestBody.getTitle());
        board.setBoardId(requestBody.getBoardId());
        board.setContent(requestBody.getContent());
        board.setPrice(requestBody.getPrice());
        board.setMaxNum(requestBody.getMaxNum());
        board.setAddress(requestBody.getAddress());
        board.setLatitude(requestBody.getLatitude());
        board.setLongitude(requestBody.getLongitude());
        board.setDeadLine(requestBody.getDeadLine());
        board.setProductsLink(requestBody.getProductsLink());

        return board;
    }

    default Board boardPostToBoard(MemberService memberService, BoardDto.Post boardPostDto) {
        if (boardPostDto == null) {
            return null;
        }
        Board board = new Board();
        board.setCategory(boardPostDto.getCategory());
        board.setTitle(boardPostDto.getTitle());
        board.setContent(boardPostDto.getContent());
        board.setPrice(boardPostDto.getPrice());
        board.setLikeCount(0);
        board.setMaxNum(boardPostDto.getMaxNum());
        board.setMember(memberService.getLoginMember());
        board.setCreate_date(LocalDateTime.now());
        board.setAddress(boardPostDto.getAddress());
        board.setLatitude(boardPostDto.getLatitude());
        board.setLongitude(boardPostDto.getLongitude());
        board.setDeadLine(boardPostDto.getDeadLine());
        board.setProductsLink(boardPostDto.getProductsLink());

        return board;
    }

    List<BoardDto.Response> boardsToBoardResponses(List<Board> boards);

    List<BoardDto.Response> boardsToBoardByCategoryResponses(List<Board> boards);

    default Like boardLikeToBoard(BoardService boardService, MemberService memberService,
                                  long boardId) {

        Like like = new Like();
        Board board = new Board();

        board.setBoardId(boardId);

        like.setBoard(boardService.findBoard(board.getBoardId()));
        like.setMember(memberService.getLoginMember());

        return like;
    }
}