package com.main024.ngether.chat.chatEntity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class ChatRoom {

    @Id
    private Long roomId;
    private String roomName;//채팅방 이름 =  게시판 이름
    private Long memberId;//채팅방 개설자 아이디
    private int memberCount;//채팅방에 있는 인원 수
    private int maxNum;//최대 수용 인원수
    private boolean declareStatus;
    private LocalDateTime lastMessageCreated;
    private String lastMessage;
    private String address;
    private boolean recruitment;

    @JsonIgnore
    @OneToMany(mappedBy = "chatRoom",cascade = CascadeType.ALL)
    private List<ChatRoomMembers> chatRoomMembers = new ArrayList<>();


}