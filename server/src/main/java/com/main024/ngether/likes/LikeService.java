package com.main024.ngether.likes;

import com.main024.ngether.board.Board;
import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.board.BoardService;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class LikeService {
    BoardService boardService;
    BoardRepository boardRepository;
    MemberService memberService;
    LikeRepository likeRepository;

    //찜 버튼을 누를시 like가 생성되면서 연관 매핑 테이블에 저장
    public Like createLike(Like like) {
        Board board = boardService.findVerifiedBoard(like.getBoard().getBoardId());
        Member member = memberService.getLoginMember(); // 로그인 한 상태가 아닐 시 에러 메시지 출력
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        } else {
            Optional<Like> optionalLike = likeRepository.findLikeByBoardAndMember(board, member);
            if (optionalLike.isPresent()) { //매핑 테이블에 데이터가 존재한다면
                if (optionalLike.get().isStatus()) {//이미 눌러진 상태면 상태를 해제하고 좋아요 카운터 - 1;
                    optionalLike.get().setStatus(false);
                    board.setLikeCount(board.getLikeCount() - 1);
                } else {
                    optionalLike.get().setStatus(true);//눌러진 상태가 아니라면 눌러지고 좋아요 카운터 + 1;
                    board.setLikeCount(board.getLikeCount() + 1);
                }
                boardRepository.save(board);
                return likeRepository.save(optionalLike.get());
            } else {//존재안한다면 새롭게 생성
                like.setBoard(board);
                like.setMember(member);
                like.setStatus(true);
                board.setLikeCount(board.getLikeCount() + 1);
                boardRepository.save(board);

                board.addLike(like);
                member.addLike(like);

                return likeRepository.save(like);
            }
        }
    }
}