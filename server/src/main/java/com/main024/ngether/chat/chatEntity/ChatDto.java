package com.main024.ngether.chat.chatEntity;

import lombok.Getter;
import lombok.Setter;

public class ChatDto {
    @Setter
    @Getter
    public static class lastMessage{
        String message;
        Long roomId;
    }
}
