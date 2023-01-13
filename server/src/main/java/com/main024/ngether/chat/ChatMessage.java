package com.main024.ngether.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main024.ngether.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    private MessageType type;
    //채팅방 ID
    private Long chatRoomId;
    //보내는 사람
    private String nickName;
    //메세지 내용
    @Column(nullable = false)
    private String message;
    //메세지 작성 날짜
    private LocalDateTime create_date = LocalDateTime.now();
}