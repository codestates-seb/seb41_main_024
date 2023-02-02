package com.main024.ngether.chat.chatRepository;

import com.main024.ngether.chat.chatEntity.ChatRoomMembers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomMembersRepository extends JpaRepository<ChatRoomMembers, Long> {
    List<ChatRoomMembers> findByChatRoomRoomId(Long roomId);
    List<ChatRoomMembers> findByMemberMemberId(Long memberId);
    Optional<ChatRoomMembers> findByMemberMemberIdAndChatRoomRoomId(Long memberId, Long chatRoomId);
    ChatRoomMembers findBySessionId(String sessionId);
}