package com.main024.ngether.qna.qnaController;

import com.main024.ngether.member.MemberService;
import com.main024.ngether.qna.qnaDto.AnswerDto;
import com.main024.ngether.qna.qnaEntity.Answer;
import com.main024.ngether.qna.qnaMapper.AnswerMapper;
import com.main024.ngether.qna.qnaService.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("api/answer")
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper mapper;
    private final MemberService memberService;

    //답변 작성
    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerDto.Post AnswerDto) {
        Answer Answer = answerService.createAnswer(mapper.AnswerPostToAnswer(memberService, AnswerDto));

        return ResponseEntity.ok(mapper.AnswerToAnswerResponseDto(Answer));
    }

    //답변 수정
    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive long answerId,
                                   @Valid @RequestBody AnswerDto.Patch AnswerDto) {

        AnswerDto.setAnswerId(answerId);
        Answer Answer = answerService.updateAnswer(mapper.AnswerPatchToAnswer(AnswerDto));

        return ResponseEntity.ok(mapper.AnswerToAnswerResponseDto(Answer));
    }

    //답변 삭제
    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") long answerId) {
        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //답변 조회
    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") long answerId) {
        Answer Answer = answerService.findAnswer(answerId);

        return new ResponseEntity<>(mapper.AnswerToAnswerResponseDto(Answer), HttpStatus.OK);
    }
}
