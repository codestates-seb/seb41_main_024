package com.main024.ngether.chat.chatController;

import com.main024.ngether.chat.chatEntity.ChatMessage;
import com.main024.ngether.chat.chatRepository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations sendingOperations;
    private final ChatMessageRepository chatMessageRepository;

    @MessageMapping("/chat/{room-id}/ENTER")
    public void enter(@DestinationVariable(value = "room-id") Long roomId, ChatMessage message) {
        message.setMessage(message.getNickName()+"님이 입장하였습니다.");
        //메시지 db에 저장
        message.setCreate_date(LocalDateTime.now());
        message.setNickName(message.getNickName());
        message.setChatRoomId(roomId);
        sendingOperations.convertAndSend("/receive/chat/"+roomId,message);
        chatMessageRepository.save(message);
    }
    @MessageMapping("/chat/{room-id}/LEAVE")
    public void leave(@DestinationVariable(value = "room-id") Long roomId, ChatMessage message) {
        message.setMessage(message.getNickName()+"님이 퇴장하였습니다.");
        //메시지 db에 저장
        message.setCreate_date(LocalDateTime.now());
        message.setNickName(message.getNickName());
        message.setChatRoomId(roomId);
        sendingOperations.convertAndSend("/receive/chat/"+roomId,message);
        chatMessageRepository.save(message);
    }
    @MessageMapping("/chat/{room-id}")//메세지를 발행하는 경로
    public void talk(@DestinationVariable(value = "room-id") Long roomId, ChatMessage message) {

            //메시지 db에 저장
            message.setCreate_date(LocalDateTime.now());
            message.setNickName(message.getNickName());
            message.setChatRoomId(roomId);
            //메시지 전송
            sendingOperations.convertAndSend("/receive/chat/" + roomId,message);
            chatMessageRepository.save(message);
    }
}