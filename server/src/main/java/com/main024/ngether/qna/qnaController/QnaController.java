package com.main024.ngether.qna.qnaController;

import com.main024.ngether.board.response.MultiResponseDto;
import com.main024.ngether.member.MemberService;
import com.main024.ngether.qna.qnaRepository.AnswerRepository;
import com.main024.ngether.qna.qnaRepository.QnaRepository;
import com.main024.ngether.qna.qnaService.QnaService;
import com.main024.ngether.qna.qnaDto.QnaDto;
import com.main024.ngether.qna.qnaEntity.Qna;
import com.main024.ngether.qna.qnaMapper.QnaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("api/qna")
@RequiredArgsConstructor
public class QnaController {
    private final QnaService qnaService;
    private final QnaMapper mapper;
    private final MemberService memberService;
    private final QnaRepository qnaRepository;
    private final AnswerRepository answerRepository;

    //문의글 작성
    @PostMapping
    public ResponseEntity postQna(@Valid @RequestBody QnaDto.Post qnaDto) {
        return ResponseEntity.ok(mapper.QnaToQnaResponseDto(qnaService.createQna(qnaDto), answerRepository));
    }

    //문의글 수정
    @PatchMapping("patch/{qna-id}")
    public ResponseEntity patchQna(@PathVariable("qna-id") @Positive long qnaId,
                                     @Valid @RequestBody QnaDto.Patch qnaDto) {

        qnaDto.setQnaId(qnaId);
        Qna qna = qnaService.updateQna(mapper.QnaPatchToQna(qnaDto));

        return ResponseEntity.ok(mapper.QnaToQnaResponseDto(qna, answerRepository));
    }

    //문의글 삭제
    @DeleteMapping("delete/{qna-id}")
    public ResponseEntity deleteQna(@PathVariable("qna-id") long qnaId) {
        qnaService.deleteQna(qnaId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //문의글 조회
    @GetMapping("/{qna-id}")
    public ResponseEntity getQna(@PathVariable("qna-id") long qnaId) {
        Qna qna = qnaService.findQna(qnaId);

        return new ResponseEntity<>(mapper.QnaToQnaResponseDto(qna, answerRepository), HttpStatus.OK);
    }
    @GetMapping("/search/{qna-status}")
    public ResponseEntity getQna(@PathVariable("qna-status") String qnaStatus,
                                 @RequestParam(value = "page") int page,
                                 @RequestParam(value = "size") int size) {

        if(qnaStatus.equals("NO_ANSWERED")) {
            Page<Qna> pageQna = qnaRepository.findAllByQnaStatus(Qna.QnaStatus.NO_ANSWER, PageRequest.of(page - 1, size));
            List<Qna> qnaList = pageQna.getContent();
            return new ResponseEntity<>(
                    new MultiResponseDto<>(qnaList, pageQna), HttpStatus.OK);
        }
        else {
            Page<Qna> pageQna = qnaRepository.findAllByQnaStatus(Qna.QnaStatus.ANSWERED, PageRequest.of(page - 1, size));
            List<Qna> qnaList = pageQna.getContent();
            return new ResponseEntity<>(
                    new MultiResponseDto<>(qnaList, pageQna), HttpStatus.OK);
        }

    }

    //내가 작성한 문의글 목록
    @GetMapping
    public ResponseEntity myQnaList(@RequestParam(value = "page") int page,
                                  @RequestParam(value = "size") int size){
        Page<Qna> pageQnas = qnaRepository.findByMemberMemberId(memberService.getLoginMember().getMemberId(), PageRequest.of(page-1, size));
        List<Qna> qnaList = pageQnas.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.QnasToQnaResponseDtos(qnaList, answerRepository), pageQnas), HttpStatus.OK);
    }

    //모든 문의글 목록
    @GetMapping("/questions")
    public ResponseEntity qnaList(@RequestParam(value = "page") int page,
                                  @RequestParam(value = "size") int size) {
        Page<Qna> pageQnas = qnaService.findQnas(page - 1, size);
        List<Qna> qnaList = pageQnas.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.QnasToQnaResponseDtos(qnaList, answerRepository), pageQnas), HttpStatus.OK);
    }
}
