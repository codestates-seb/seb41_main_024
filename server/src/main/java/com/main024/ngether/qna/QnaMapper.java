package com.main024.ngether.qna;

import com.main024.ngether.member.MemberService;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QnaMapper {
    default Qna QnaPostToQna(MemberService memberService, QnaDto.Post qnaPostDto) {
        Qna qna = new Qna();
        qna.setTitle(qnaPostDto.getTitle());
        qna.setContent(qnaPostDto.getContent());
        qna.setCreateDate(LocalDateTime.now());
        qna.setMember(memberService.getLoginMember());
        return qna;
    }

    default Qna QnaPatchToQna(QnaDto.Patch qnaPatchDto) {
        Qna qna = new Qna();
        qna.setQnaId(qnaPatchDto.getQnaId());
        qna.setTitle(qnaPatchDto.getTitle());
        qna.setContent(qnaPatchDto.getContent());
        return qna;
    }

    default QnaDto.Response QnaToQnaResponseDto(Qna qna) {
        QnaDto.Response response = new QnaDto.Response();
        response.setQnaId(qna.getQnaId());
        response.setMemberId(qna.getMember().getMemberId());
        response.setNickName(qna.getMember().getNickName());
        response.setTitle(qna.getTitle());
        response.setContent(qna.getContent());
        response.setCreateDate(qna.getCreateDate());
        return response;
    }
}
