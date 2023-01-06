package com.main024.ngether.board;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class BoardDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "제목을 반드시 입력해주세요.")
        private String title;
        @NotBlank(message = "내용을 입력해주세요.")
        private String content;
        private String category;
        private long price;
    }

    @Getter
    public static class Patch {
        private Long boardId;
        private String title;
        @NotBlank
        private String content;
        private long price;


        public void setBoardId(Long boardId) {
            this.boardId = boardId;
        }
    }

    @NoArgsConstructor
    @Setter
    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long boardId;
        private Long memberId;
        private String Nickname;
        private String title;
        private String content;
        private LocalDateTime create_date;
        private String category;
        private int likeCount;
        private long price;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Like {
        private long boardId;
    }

    @NoArgsConstructor
    @Setter
    @Getter
    @AllArgsConstructor
    public static class LikeResponse {
        private Long likeId;
        private Long boardId;
        private Long memberId;
        private boolean status;

    }
}