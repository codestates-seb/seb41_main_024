package com.main024.ngether.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;
public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query(value = "SELECT c FROM Board c WHERE c.boardId = :boardId")
    Optional<Board> findByBoardId(Long boardId);

    Page<Board> findByTitleContaining(String keyword, PageRequest pageRequest);
    Page<Board> findByContentContaining(String keyword, PageRequest pageRequest);
    Page<Board> findByMemberMemberId(@Param(value = "memberId") Long memberId, PageRequest pageRequest);
    Optional<List<Board>> findByCategory(String category);

    Page<Board> findByAddressContaining(String address, PageRequest pageRequest);

    Optional<List<Board>> findByBoardStatusAndMemberMemberId(Board.BoardStatus boardStatus, Long memberId);




}