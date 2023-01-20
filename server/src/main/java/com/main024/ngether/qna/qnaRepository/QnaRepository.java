package com.main024.ngether.qna.qnaRepository;

import com.main024.ngether.qna.qnaEntity.Qna;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface QnaRepository extends JpaRepository<Qna,Long> {
    Optional<Qna> findById(Long qnaId);
    Page<Qna> findByMemberMemberId(@Param(value = "memberId") Long memberId, PageRequest pageRequest);
}
