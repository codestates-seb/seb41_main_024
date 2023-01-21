package com.main024.ngether.qna.qnaRepository;

import com.main024.ngether.qna.qnaEntity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer,Long> {

    List<Answer> findByQnaQnaId(Long quaId);
}
