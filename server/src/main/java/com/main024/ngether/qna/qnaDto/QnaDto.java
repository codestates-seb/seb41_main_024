package com.main024.ngether.qna.qnaDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class QnaDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "제목을 반드시 입력해주세요.")
        private String title;
        @NotBlank(message = "내용을 입력해주세요.")
        private String content;
    }

    @Getter
    public static class Patch {
        private long qnaId;
        private String title;
        private String content;

        public void setQnaId(Long qnaId) { this.qnaId = qnaId; }
    }

    @NoArgsConstructor
    @Setter
    @Getter
    @AllArgsConstructor
    public static class Response {
        private long qnaId;
        private long memberId;
        private String nickName;
        private String title;
        private String content;
        private LocalDateTime createDate;
        private List<AnswerDto.Response> answers = new ArrayList<>();
    }
}
