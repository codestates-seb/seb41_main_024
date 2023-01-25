package com.main024.ngether.chat.chatEntity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ChatDto {
    @Setter
    @Getter
    public static class newMessages{
        int messagesCount;
        Long roomId;
    }
}
