package com.main024.ngether.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

public class ChatDto {
    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private String nickName;
        private String messages;
        private LocalDateTime time;
    }
}
