package com.main024.ngether.chat.chatController;

import com.main024.ngether.auth.jwt.JwtTokenizer;
import com.main024.ngether.chat.chatEntity.ChatMessage;
import com.main024.ngether.chat.chatEntity.ChatRoom;
import com.main024.ngether.chat.chatEntity.ChatRoomMembers;
import com.main024.ngether.chat.chatRepository.ChatMessageRepository;
import com.main024.ngether.chat.chatRepository.ChatRoomMembersRepository;
import com.main024.ngether.chat.chatRepository.ChatRoomRepository;
import com.main024.ngether.chat.chatService.ChatService;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class MessageController {



    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final SimpMessageSendingOperations sendingOperations;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatService chatService;
    private final ChatRoomMembersRepository chatRoomMembersRepository;

    @CrossOrigin
    @MessageMapping("/chat/{room-id}")//메세지를 발행하는 경로
    public void talk(@DestinationVariable(value = "room-id") Long roomId, ChatMessage message,@Header("Authorization") String Authorization) {
        Member member = memberRepository.findByEmail(jwtTokenizer.getEmailFromAccessToken(Authorization.substring("Bearer ".length()))).get();
        List<ChatRoomMembers> chatRoomMembers = chatRoomMembersRepository.findByChatRoomRoomId(roomId);
        String nameList = "";
        message.setNickName(member.getNickName());
        message.setCreateDate(LocalDateTime.now());
        message.setChatRoomId(roomId);
        message.setCreateDate(LocalDateTime.now());
        message.setUnreadCount(chatService.setUnreadMessageCount(roomId));
        for(int i = 0; i < chatRoomMembers.size(); i++){
            if(chatRoomMembers.get(i).getSessionId() != null){
                nameList = nameList + member.getNickName();
                if(i < chatRoomMembers.size() - 1){
                   nameList = nameList + ",";
                }
            }
        }
        message.setReadMember(nameList);
        ChatMessage savedMessage = chatMessageRepository.save(message);
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        chatRoom.setLastMessage(savedMessage.getMessage());
        chatRoom.setLastMessageCreated(savedMessage.getCreateDate());
        chatRoomRepository.save(chatRoom);





        //메시지 전송
        sendingOperations.convertAndSend("/receive/chat/" + message.getChatRoomId(), message);
    }

}
