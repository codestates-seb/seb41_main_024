package com.main024.ngether.chat.chatService;

import com.main024.ngether.chat.chatEntity.ChatRoomMembers;
import com.main024.ngether.chat.chatRepository.ChatRoomMembersRepository;
import com.main024.ngether.member.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomMembersRepository chatRoomMembersRepository;
    public String getRoomId(String destination) {
        int lastIndex = destination.lastIndexOf('/');
        if (lastIndex != -1)
            return destination.substring(lastIndex + 1);
        else
            return "";
    }
    public void setSessionId(Long roomId, Member member, String sessionId){
        ChatRoomMembers chatRoomMembers = chatRoomMembersRepository.findByMemberMemberIdAndChatRoomRoomId(member.getMemberId(),roomId);
        chatRoomMembers.setSessionId(sessionId);
        chatRoomMembers.setUnreadMessageCount(0);
        chatRoomMembersRepository.save(chatRoomMembers);
    }
}
