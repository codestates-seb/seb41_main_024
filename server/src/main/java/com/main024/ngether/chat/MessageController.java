package com.main024.ngether.chat;

import com.main024.ngether.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations sendingOperations;
    private final ChatMessageRepository chatMessageRepository;

    @MessageMapping("/chat/message/enter")
    public void enter(ChatMessage message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            message.setMessage(message.getNickName()+"님이 입장하였습니다.");
        }
        sendingOperations.convertAndSend("/receive/chat/room/"+message.getChatRoomId(),message);
    }
    @MessageMapping("/chat/message/leave")
    public void leave(ChatMessage message) {
        if (ChatMessage.MessageType.LEAVE.equals(message.getType())) {
            message.setMessage(message.getNickName()+"님이 퇴장하였습니다.");
        }
        sendingOperations.convertAndSend("/receive/chat/room/"+message.getChatRoomId(),message);
    }
    @MessageMapping("/chat/message/{room-id}")//메세지가 목적지로 전송되면 talk 메서드 호출
    @SendTo("/receive/chat/message/{room-id}")//결과를 리턴시키는 목적지
    public ChatMessage talk(@DestinationVariable(value = "room-id") Long roomId, ChatMessage message) {
            message.setCreate_date(LocalDateTime.now());
            message.setNickName(message.getNickName());
            message.setChatRoomId(roomId);
            return chatMessageRepository.save(message);
    }
}