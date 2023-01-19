package com.main024.ngether.chat.chatEntity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ChatMessage {
    public enum MessageType {
        ENTER, TALK, LEAVE
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatMessageId;
    @Enumerated(value = EnumType.STRING)
    private MessageType type;
    //채팅방 ID
    private Long chatRoomId;
    //보내는 사람
    private String nickName;
    //메세지 내용
    @Column(nullable = false)
    private String message;
    //메세지 작성 날짜
    private LocalDateTime createDate = LocalDateTime.now();
    @Builder
    public ChatMessage(MessageType type, Long chatRoomId, String nickName, String message) {
        this.type = type;
        this.chatRoomId = chatRoomId;
        this.nickName = nickName;
        this.message = message;
    }
}