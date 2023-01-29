package com.main024.ngether.chat.chatRepository;

import com.main024.ngether.chat.chatEntity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByChatRoomId(Long chatRoomId);
    List<ChatMessage> findByNickName(String nickName);
}