package com.main024.ngether.qna.qnaMapper;

import com.main024.ngether.member.MemberService;
import com.main024.ngether.qna.qnaDto.AnswerDto;
import com.main024.ngether.qna.qnaEntity.Answer;
import com.main024.ngether.qna.qnaEntity.Qna;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {

    default Answer AnswerPatchToAnswer(AnswerDto.Patch answerPatchDto) {
        Answer answer = new Answer();
        answer.setAnswerId(answerPatchDto.getAnswerId());
        answer.setContent(answerPatchDto.getContent());
        return answer;
    }

    default AnswerDto.Response AnswerToAnswerResponseDto(Answer answer) {
        AnswerDto.Response response = new AnswerDto.Response();
        response.setAnswerId(answer.getAnswerId());
        response.setQnaId(answer.getQna().getQnaId());
        response.setMemberId(answer.getMember().getMemberId());
        response.setNickName(answer.getMember().getNickName());
        response.setTitle(answer.getTitle());
        response.setContent(answer.getContent());
        response.setCreateDate(answer.getCreateDate());
        return response;
    }
}
