package com.main024.ngether.likes;

import com.main024.ngether.board.Board;
import com.main024.ngether.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    @Query(value = "SELECT l FROM Like l WHERE l.board = :board and l.member = :member")
    Optional<Like> findLikeByBoardAndMember(Board board, Member member);

    Optional<List<Like>> findLikeByMemberMemberId(Long memberId);
}