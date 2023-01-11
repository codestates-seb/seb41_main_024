package com.main024.ngether.chat;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomMembersRepository extends JpaRepository<ChatRoomMembers, Long> {
    List<ChatRoomMembers> findByChatRoomRoomId(Long roomId);
}