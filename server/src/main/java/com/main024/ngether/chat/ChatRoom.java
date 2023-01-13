package com.main024.ngether.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main024.ngether.board.Board;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;
    private String roomName;//채팅방 이름 =  게시판 이름
    private Long memberId;//채팅방 개설자 아이디
    private int memberCount;//채팅방에 있는 인원 수
    private int maxNum;//최대 수용 인원수

    @JsonIgnore
    @OneToMany(mappedBy = "chatRoom",cascade = CascadeType.ALL)
    private List<ChatRoomMembers> chatRoomMembers = new ArrayList<>();


}