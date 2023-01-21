package com.main024.ngether.qna.qnaService;

import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberService;
import com.main024.ngether.qna.qnaEntity.Answer;
import com.main024.ngether.qna.qnaRepository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final MemberService memberService;
    private final QnaService qnaService;

    public Answer createAnswer(Answer answer) {
        Answer newAnswer = new Answer();
        Member member = memberService.getLoginMember();
        if (member == null) {  //로그인 한 상태가 아닐 시 에러 메시지 출력
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        }
        if (memberService.getLoginMember().getRoles().get(0).equals("USER")) {  //관리자가 아닐 시 에러 메세지 출력
            throw new BusinessLogicException(ExceptionCode.ROLE_NOT_ADMIN);
        }

        newAnswer.setTitle(answer.getTitle());
        newAnswer.setContent(answer.getContent());
        newAnswer.setCreateDate(answer.getCreateDate());
        newAnswer.setQna(qnaService.findQna(answer.getQna().getQnaId()));
        member.addAnswer(newAnswer);

        Answer saveAnswer = answerRepository.save(newAnswer);

        return saveAnswer;
    }

    public Answer updateAnswer(Answer answer) {
        Member member = memberService.getLoginMember();
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        }
        else if (member.getRoles().get(0).equals("ADMIN")) {
            Answer findAnswer = findVerifyAnswer(answer.getAnswerId());
            Optional.ofNullable(answer.getTitle())
                    .ifPresent(findAnswer::setTitle);
            Optional.ofNullable(answer.getContent())
                    .ifPresent(findAnswer::setContent);

            return answerRepository.save(findAnswer);
        }
        else throw new BusinessLogicException(ExceptionCode.PERMISSION_DENIED);
    }

    public void deleteAnswer(Long answerId) {
        if (memberService.getLoginMember() == null)
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        Answer answer = findVerifyAnswer(answerId);
        if (memberService.getLoginMember().getRoles().get(0).equals("ADMIN"))
            answerRepository.delete(answer);
        else throw new BusinessLogicException(ExceptionCode.PERMISSION_DENIED);
    }

    public Answer findAnswer(long answerId) { return findVerifyAnswer(answerId); }

    private Answer findVerifyAnswer(long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findAnswer;
    }
}
