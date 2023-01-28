package com.main024.ngether.qna.qnaService;

import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberService;
import com.main024.ngether.qna.qnaDto.QnaDto;
import com.main024.ngether.qna.qnaEntity.Qna;
import com.main024.ngether.qna.qnaRepository.QnaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QnaService {
    private final QnaRepository qnaRepository;
    private final MemberService memberService;

    public Qna createQna(QnaDto.Post qnaPost) {
        Qna qna = new Qna();
        Member member = memberService.getLoginMember(); //로그인 한 상태가 아닐 시 에러 메시지 출력
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        }
        qna.setTitle(qnaPost.getTitle());
        qna.setContent(qnaPost.getContent());
        qna.setMember(member);
        qna.setQnaStatus(Qna.QnaStatus.NO_ANSWER);

        member.addQna(qna);
        return qnaRepository.save(qna);
    }

    public Qna updateQna(Qna qna) {
        if (memberService.getLoginMember() == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        } else if (Objects.equals(findVerifyQna(qna.getQnaId()).getMember().getMemberId(), memberService.getLoginMember().getMemberId())) {
            Qna findQna = findVerifyQna(qna.getQnaId());
            findQna.setModifiedAt(LocalDateTime.now());
            Optional.ofNullable(qna.getTitle())
                    .ifPresent(findQna::setTitle);
            Optional.ofNullable(qna.getContent())
                    .ifPresent(findQna::setContent);

            return qnaRepository.save(findQna);
        } else throw new BusinessLogicException(ExceptionCode.PERMISSION_DENIED);
    }

    public void deleteQna(Long qnaId) {
        if (memberService.getLoginMember() == null)
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        Qna qna = findVerifyQna(qnaId);
        if (Objects.equals(qna.getMember().getMemberId(), memberService.getLoginMember().getMemberId()))
            qnaRepository.delete(qna);
        else throw new BusinessLogicException(ExceptionCode.PERMISSION_DENIED);
    }

    public Qna findQna(long qnaId) {
        return findVerifyQna(qnaId);
    }

    public List<Qna> findQnas(){
        Member member = memberService.getLoginMember();
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        } else if (member.getRoles().get(0).equals("ADMIN")) {
            return qnaRepository.findAll();
        }
        else throw new BusinessLogicException(ExceptionCode.PERMISSION_DENIED);
    }

    //Qna가 null이면 에러 발생
    private Qna findVerifyQna(long qnaId) {
        Optional<Qna> optionalQna = qnaRepository.findById(qnaId);
        return optionalQna.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QNA_NOT_FOUND));
    }
}
