package com.main024.ngether.qna.qnaService;

import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberService;
import com.main024.ngether.qna.qnaEntity.Qna;
import com.main024.ngether.qna.qnaRepository.QnaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QnaService {
    private final QnaRepository qnaRepository;
    private final MemberService memberService;

    public Qna createQna(Qna qna) {
        Qna newQna = new Qna();
        Member member = memberService.getLoginMember(); //로그인 한 상태가 아닐 시 에러 메시지 출력
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        }
        newQna.setTitle(qna.getTitle());
        newQna.setContent(qna.getContent());
        newQna.setCreateDate(qna.getCreateDate());
        member.addQna(newQna);
        Qna saveQna = qnaRepository.save(newQna);

        return saveQna;
    }

    public Qna updateQna(Qna qna) {
        if (memberService.getLoginMember() == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        }
        else if (Objects.equals(findVerifyQna(qna.getQnaId()).getMember().getMemberId(), memberService.getLoginMember().getMemberId())) {
            Qna findQna = findVerifyQna(qna.getQnaId());
            findQna.setModifiedAt(LocalDateTime.now());
            Optional.ofNullable(qna.getTitle())
                    .ifPresent(findQna::setTitle);
            Optional.ofNullable(qna.getContent())
                    .ifPresent(findQna::setContent);

            return qnaRepository.save(findQna);
        }
        else throw new BusinessLogicException(ExceptionCode.PERMISSION_DENIED);
    }

    public void deleteQna(Long qnaId) {
        if (memberService.getLoginMember() == null)
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        Qna qna = findVerifyQna(qnaId);
        if (qna.getMember().getMemberId() == memberService.getLoginMember().getMemberId())
            qnaRepository.delete(qna);
        else throw new BusinessLogicException(ExceptionCode.PERMISSION_DENIED);
    }

    public Qna findQna(long qnaId) {
        return findVerifyQna(qnaId);
    }

    //Qna가 null이면 에러 발생
    private Qna findVerifyQna(long qnaId) {
        Optional<Qna> optionalQna = qnaRepository.findById(qnaId);
        Qna findQna = optionalQna.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findQna;
    }
}
