package com.main024.ngether.chat.chatRepository;

import com.main024.ngether.chat.chatEntity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    ChatRoom findByRoomId(Long roomId);
}