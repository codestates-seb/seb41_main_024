package com.main024.ngether.chat.chatEntity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ChatDto {
    @Setter
    @Getter
    public static class lastMessageCreated{
        LocalDateTime lastMessageCreated;
        Long roomId;
    }
}
