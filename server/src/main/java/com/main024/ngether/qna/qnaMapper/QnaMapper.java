package com.main024.ngether.qna.qnaMapper;

import com.main024.ngether.qna.qnaDto.AnswerDto;
import com.main024.ngether.qna.qnaDto.QnaDto;
import com.main024.ngether.qna.qnaEntity.Answer;
import com.main024.ngether.qna.qnaEntity.Qna;
import com.main024.ngether.qna.qnaRepository.AnswerRepository;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
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

    default QnaDto.Response QnaToQnaResponseDto(Qna qna, AnswerRepository answerRepository) {
        QnaDto.Response response = new QnaDto.Response();
        response.setQnaId(qna.getQnaId());
        response.setMemberId(qna.getMember().getMemberId());
        response.setNickName(qna.getMember().getNickName());
        response.setTitle(qna.getTitle());
        response.setContent(qna.getContent());
        response.setCreateDate(qna.getCreateDate());
        response.setQnaStatus(qna.getQnaStatus());
        List<Answer> answerList = answerRepository.findByQnaQnaId(qna.getQnaId());
        List<AnswerDto.Response> answerResponse =
                answerList.stream()
                        .map(answer ->
                                new AnswerDto.Response(answer.getAnswerId(),
                                        answer.getMember().getMemberId(),
                                        answer.getQna().getQnaId(),
                                        answer.getMember().getNickName(),
                                        answer.getTitle(),
                                        answer.getContent(),
                                        answer.getCreateDate())).collect(Collectors.toList());
        response.setAnswers(answerResponse);
        return response;
    }

    default List<QnaDto.Response> QnasToQnaResponseDtos(List<Qna> qnas, AnswerRepository answerRepository) {
        if (qnas == null) {
            return null;
        }

        List<QnaDto.Response> list = new ArrayList<>();
        for ( Qna qna : qnas ) {
            list.add( QnaToQnaResponseDto( qna, answerRepository ) );
        }
        return list;
    }
}
