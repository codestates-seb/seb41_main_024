package com.main024.ngether.chat.chatService;

import com.main024.ngether.chat.chatEntity.ChatMessage;
import com.main024.ngether.chat.chatEntity.ChatRoom;
import com.main024.ngether.chat.chatRepository.ChatMessageRepository;
import com.main024.ngether.chat.chatRepository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
@Service
@Slf4j
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    public String getRoomId(String destination) {
        int lastIndex = destination.lastIndexOf('/');
        if (lastIndex != -1)
            return destination.substring(lastIndex + 1);
        else
            return null;
    }
    public void setSessionId(String sessionId,ChatRoom chatRoom){
        chatRoom.setSessionId(sessionId);
        chatRoomRepository.save(chatRoom);
    }
}
