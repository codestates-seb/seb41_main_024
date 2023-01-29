package com.main024.ngether.chat.chatEntity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class ChatDto {
    @Setter
    @Getter
    public static class newMessages{
        int messagesCount;
        Long roomId;
    }
    @Setter
    @Getter
    public static class myChatting{
        private Long roomId;
        @Column(length = 200)
        private String roomName;//채팅방 이름 =  게시판 이름
        private Long memberId;//채팅방 개설자 아이디
        private int memberCount;//채팅방에 있는 인원 수
        private int maxNum;//최대 수용 인원수
        private boolean declareStatus;
        private LocalDateTime lastMessageCreated;
        private String lastMessage;
        private String address;
        private boolean recruitment;
        @Column(length = 2000)
        private String imageLink;
        private int unreadCount;
    }
}
