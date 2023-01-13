package com.main024.ngether.chat.chatEntity;

import com.main024.ngether.member.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ChatRoomMembers {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomMembersId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "CHATROOM_ID")
    private ChatRoom chatRoom;

    @ManyToOne(optional = false)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
