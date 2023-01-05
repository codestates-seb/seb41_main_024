package com.main024.ngether.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query(value = "SELECT c FROM Board c WHERE c.boardId = :boardId")
    Optional<Board> findByBoardId(Long questionId);

    Optional<List<Board>> findByTitleContaining(String keyword);
    Optional<List<Board>> findByContentContaining(String keyword);
    Optional<List<Board>> findByMemberMemberId(@Param(value = "memberId") Long memberId);

    Optional<List<Board>> findByCategory(String category);




}