package com.main024.ngether.qna.qnaMapper;

import com.main024.ngether.member.MemberService;
import com.main024.ngether.qna.qnaDto.AnswerDto;
import com.main024.ngether.qna.qnaDto.QnaDto;
import com.main024.ngether.qna.qnaEntity.Qna;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QnaMapper {

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
        //answer list
        return response;
    }
}
